'use babel'
/** @jsx etch.dom */

import { CompositeDisposable } from 'atom'
import etch from 'etch'
import UiComponent from '../ui/component'
import Editor from '../ui/editor'
import ConsoleMessagesView from './console-messages-view'
import Promise from 'promise'
export class ConsoleView extends UiComponent {
  constructor (props,children) {
    super(props,children)
    this._services = props.services;
    this._services.fetchService("Console").then(this.consoleReady)
    this._services.fetchService("Actions").then(this.actionsReady)
    this.subscriptions.add(atom.commands.add(this.element, 'core:confirm', () => { this.confirmCommand() }))
  }


  render () {
    const {services,context,state} = this.props;
    let classes = "block actions"
    let keys = Object.keys(state.externalButtons);
    keys.sort();
    const buttons = keys.map((buttonId,index) => {
      let button = state.externalButtons[buttonId]
      return <button key={buttonId} className={button.buttonClasses.join(" ")} attributes={{title:button.buttonText}} onclick={this.handleExternalClickFactory(button.buttonHandler)}><span className="btn-text">{button.buttonText}</span></button>
    });
    if (buttons.length > 1) {
      classes += ' hasChildren'
    }
    return <div className="atom-debug-ui-console-view atom-debug-ui-console">
            <div className='atom-debug-ui-console-view-container'>
              <div className={classes}>
                <span className="panel-title">Console</span>
                <button className="btn octicon icon-circle-slash inline-block-tight" data-action='clear' onclick={this.handleClearClick}>
                  <span className="btn-text">Clear Console</span>
                </button>
                {buttons}
              </div>
              <section className='console-panel section'>
                <div className='atom-debug-ui-console-contents atom-debug-ui-contents native-key-bindings'>
                  <ConsoleMessagesView services={services} context={context} />
                </div>
                <div className='editor-container'>
                  <Editor ref='editor' mini={true}/>
                </div>
              </section>
            </div>
          </div>
  }

  consoleReady() {
    this.subscriptions.add(this._services.getConsoleService().onNextCommand((event) => {
      if (event.context == this.props.context) {
        this.setExpression(event.expression)
      }
    }))
    this.subscriptions.add(this._services.getConsoleService().onPreviousCommand((event) => {
      if (event.context == this.props.context) {
        this.setExpression(event.expression)
      }
    }))
  }


  handleClearClick () {
    if (this._services.hasService("Console")) {
      this._services.getConsoleService().clearMessages(this.props.context)
    }
  }


  init () {
    if (!this.props.state) {
      this.props.state = {
        currentCommand: 0,
        stack : [],
        externalButtons : {
        }
      }
    }
    super.init()
  }

  confirmCommand() {
    let expression = this.refs.editor.getText()
    let debugContext = null;
    if (this._services.hasService("Console")) {
      this._services.getConsoleService().executeExpression(this.props.context, expression)
    }
    this.refs.editor.setText('')
  }

  handleSubmit (event) {
    if (event.text != "\n") {
      return;
    }
    confirmCommand()
    event.cancel()
  }

  setExpression (expression) {
    this.refs.editor.setText(expression)
  }


  handleExternalClickFactory(handler) {
    const context = this.props.context;
    const result = function(event) {
      handler({context:context,event:event});
    }
    return result
  }

  addExternalButton(buttonData) {
    const state = Object.assign({}, this.props.state)
    state.externalButtons[buttonData.buttonId] = buttonData;
    this.update({state:state});
  }
  removeExternalButton(buttonData) {
    const state = Object.assign({}, this.props.state)
    delete state.externalButtons[buttonData.buttonId]
    this.update({state:state});
  }

  actionsReady() {
    this.subscriptions.add(this._services.getActionsService().onButtonRegistered((event) => {
        if (event.context == this.props.context && event.panel == "console") {
        this.addExternalButton(event.data);
      }
    }))
    this.subscriptions.add(this._services.getActionsService().onButtonRemoved((event) => {
        if (event.context == this.props.context && event.panel == "console") {
        this.removeExternalButton(event.data);
      }
    }))
    this.subscriptions.add(this._services.getActionsService().onButtonUpdated((event) => {
        if (event.context == this.props.context && event.panel == "console") {
        this.removeExternalButton(event.old);
        this.addExternalButton(event.data);
      }
    }))
  }

}
ConsoleView.bindFns = ["handleSubmit","handleClearClick","setExpression","consoleReady","handleExternalClickFactory","actionsReady","removeExternalButton","addExternalButton"];

export class PanelManager {
  constructor (context) {
    this.services = context.services;
    this.viewService = context.viewService;
    this.context = context.context;
    this.onDestroyed = context.onDestroyed;
    this.destroyed = false
    this.uri = this.viewService.getViewURI('console-view')
    this.title = this.viewService.getViewTitle('console-view')
    this.subscriptions = new CompositeDisposable();
  }
  destroy() {
    if (this.destroyed) {
      return;
    }
    this.destroyed = true
    this.services.getDebugViewService().unregisterView(this.getURI())
    if (this.services.hasService("Console")) {
      this.services.getConsoleService().unregisterContext(this.getContext())
    }
    const pane = atom.workspace.paneForItem(this.atomPanel)
    if (pane) {
      pane.destroyItem(this.atomPanel,true);
    }

    this.subscriptions.dispose();
    this.subscriptions = null;
    this.component = null;
    this.atomPanel = null;
    if (this.onDestroyed != undefined && this.onDestroyed != null) {
      this.onDestroyed();
    }
  }
  dispose() {
    this.destroy()
  }

  isDestroyed() {
    return this.destroyed
  }

  getContext() {
    return this.context
  }

  getURI () {
    return this.uri
  }

  getTitle () {
    if (this.services.hasService("Decorator")) {
      return this.services.getDecoratorService().decorate("debuggerTitle", this.context, this.title)
    }
    return this.title;
  }

  getDefaultLocation () {
    return 'bottom'
  }

  getAllowedLocations () {
    return ['bottom']
  }
  createPanel(visible) {
    if (!this.component) {
      this.component = new ConsoleView({context:this.context,services:this.services,viewService:this.viewService});
      this.subscriptions.add(this.component);
    }
    if (!this.atomPanel) {
      this.atomPanel = {
        element: this.component.element,
        getURI: this.getURI.bind(this),
        getTitle: this.getTitle.bind(this),
        getDefaultLocation: this.getDefaultLocation,
        getAllowedLocations: this.getAllowedLocations,
        destroy: () => {
          this.destroy();
        }
      };
    }
    if (atom.workspace.paneContainerForItem(this.atomPanel)) {
      return new Promise( (fulfill,reject) => {
        fulfill()
      })
    }
    return atom.workspace.open(this.atomPanel, {activatePane:this.visible});
  }

  activate() {
    return this.createPanel(true)
  }

  focus() {
    var panel = atom.workspace.paneContainerForItem(this.atomPanel);
    panel.activate();
  }


  getPane () {
    const pane = atom.workspace.paneForItem(this.atomPanel)
    return pane;
  }

  getPanel (visible) {
    var panel = atom.workspace.paneContainerForItem(this.atomPanel);
    if (!panel) {
      this.createPanel(this.visible);
      return null;
    }
    return panel;
  }

  setVisible (visible) {
    this.visible = visible;
    if (visible) {
      var panel = this.getPanel(true);
      if (panel) {
        panel.show();
      }
    } else {
      var panel = this.getPanel(false)
      if (panel) {
        panel.hide()
      }
    }
  }

  isVisible () {
    const paneContainer = atom.workspace.paneContainerForItem(this.atomPanel)
    if (!paneContainer) {
      this.createPanel(true)
      return
    }
    return paneContainer.isVisible();
  }
  togglePanel (visible) {
    const paneContainer = atom.workspace.paneContainerForItem(this.atomPanel)
    if (!paneContainer) {
      this.createPanel(true)
      return
    }
    if (visible === undefined) {
      visible = !paneContainer.isVisible()
    }
    if (visible) {
      paneContainer.show()
    } else {
      paneContainer.hide()
    }
  }
}
