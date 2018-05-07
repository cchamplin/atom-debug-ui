'use babel'
/** @jsx etch.dom */

import { CompositeDisposable } from 'atom'
import etch from 'etch'
import UiComponent from '../ui/component'

import Collapsable from '../ui/collapsable'

import ActionBar from '../actions/actionbar'
import ContextView from '../context/debug-ui-context-view'
import StackView from '../stack/debug-ui-stack-view'
import WatchView  from '../watches/debug-ui-watch-view'
import WatchpointView  from '../watchpoints/debug-ui-watchpoint-view'
import BreakpointView from '../breakpoint/debug-ui-breakpoint-view'
import Promise from 'promise'

export class UnifiedView extends UiComponent {
  constructor (props, children) {
    super(props,children);
    this._services = props.services;
    this._services.fetchService("Status").then(this.statusReady)
  }
  render() {
    const {services,viewService,context,state} = this.props;
    let stackView = []
    let contextView = []
    let watchesView = []
    let watchpointView = []
    let breaksView = []
    if (viewService.isPanelEnabled('stack')) {
      stackView = <Collapsable className="atom-debug-ui-tab" expanded={state.tabs.stackView.expanded} closed={state.tabs.stackView.closed} name='stackView' title='Stack Trace' onClose={this.handleCloseChange} onChange={this.handleCollapseChange}>
          <StackView context={context} services={services} />
        </Collapsable>
    }
    if (viewService.isPanelEnabled('context')) {
      contextView = <Collapsable className="atom-debug-ui-tab" expanded={state.tabs.contextView.expanded} closed={state.tabs.contextView.closed} name='contextView' title='Context' onClose={this.handleCloseChange} onChange={this.handleCollapseChange}>
        <ContextView context={context} services={services} />
      </Collapsable>
    }
    if (viewService.isPanelEnabled('watches')) {
      watchesView = <Collapsable className="atom-debug-ui-tab" expanded={state.tabs.watchesView.expanded} closed={state.tabs.watchesView.closed} name='watchesView' title='Watches' onClose={this.handleCloseChange} onChange={this.handleCollapseChange}>
        <WatchView context={context} services={services} />
      </Collapsable>
    }
    if (viewService.isPanelEnabled('watchpoints')) {
      watchpointView = <Collapsable className="atom-debug-ui-tab" expanded={state.tabs.watchpointView.expanded} closed={state.tabs.watchpointView.closed} name='watchpointView' title='Watchpoints' onClose={this.handleCloseChange} onChange={this.handleCollapseChange}>
        <WatchpointView context={context} services={services} />
      </Collapsable>
    }
    if (viewService.isPanelEnabled('breakpoints')) {
      let attached = [];
      if (services.hasService("Breakpoints")) {
        attached = services.getBreakpointsService().getOption("attachedViews");
      }
      breaksView = <Collapsable className="atom-debug-ui-tab" expanded={state.tabs.breakpointView.expanded} closed={state.tabs.breakpointView.closed} name='breakpointView' title='Breakpoints' onClose={this.handleCloseChange} onChange={this.handleCollapseChange}>
        <BreakpointView context={context} attached={attached} showWatchpoints={viewService.getOption("combineBreakpointsWatchpoints")} services={services} />
      </Collapsable>
    }
    return <div className='atom-debug-ui' tabindex="-1">
        <div className='atom-debug-ui-unified-view'>
          <ActionBar services={services} context={context} mini={false} className="main" onRestorePanels={this.handleRestorePanels} />
          <div className='tabs-wrapper' outlet='tabsWrapper'>
            <span className="status">{state.status}</span>
            <div className='tabs-view'>
              {stackView}
              {contextView}
              {watchesView}
              {watchpointView}
              {breaksView}
            </div>
          </div>
          <ActionBar services={services} context={context} className="sidebar" mini={false} />
        </div>
      </div>
  }

  statusReady() {
    this._services.getStatusService().onStatusChanged((event) => {
      if (event.context == this.props.context) {
        this.updateStatus()
      }
    })
    this.updateStatus()
  }

  handleCollapseChange (name) {
    const state = Object.assign({}, this.props.state)
    state.tabs[name].expanded = !state.tabs[name].expanded
    this.update({state:state})
  }
  handleCloseChange (name) {
    const state = Object.assign({}, this.props.state)
    state.tabs[name].closed = true;
    this.update({state:state})
  }

  handleRestorePanels() {
    const state = Object.assign({}, this.props.state)
    for (var tab in state.tabs) {
      state.tabs[tab].closed = false;
    }
    this.update({state:state})
  }

  serialize () {
    return {
      deserializer: constructor.name,
      uri: getURI()
    }
  }

  updateStatus() {
    if (this._services.hasService("Status")) {
      const state = Object.assign({}, this.props.state)
      const status = this._services.getStatusService().getStatus(this.props.context)
      if (status == null) return;
      state.status =status
      this.update({state:state})
    }
  }




  init () {
    if (!this.props.state) {
      this.props.state = {
        tabs : {
          stackView : {
            expanded : true,
            closed: false
          },
          breakpointView : {
            expanded : true,
            closed: false
          },
          contextView : {
            expanded : true,
            closed: false
          },
          watchpointView : {
            expanded : true,
            closed: false
          },
          watchesView : {
            expanded : true,
            closed: false
          }
        },
        status : ""
      };
    }
    super.init()
  }

  destroy (removeNode = false) {
    super.destroy(removeNode)
    if (this._services.hasService('Actions')) {
      this._services.getActionsService().emitAction('atom-debug-ui.actions.stop',{context:this.props.context})
    }
  }
  isEqual (other) {
      return (other instanceof UnifiedView);
  }
}
UnifiedView.bindFns = [
  'handleCollapseChange', 'handleCloseChange',"handleRestorePanels","statusReady","updateStatus"]


export class PanelManager {
  constructor (context) {
    this.services = context.services;
    this.viewService = context.viewService;
    this.context = context.context;
    this.onDestroyed = context.onDestroyed;
    this.destroyed = false
    this.uri = this.viewService.getViewURI('debug-view')
    this.title = this.viewService.getViewTitle('debug-view')
    this.subscriptions = new CompositeDisposable();
  }
  destroy() {
    if (this.destroyed) {
      return;
    }
    this.destroyed = true
    this.services.getDebugViewService().unregisterView(this.getURI())
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
    return ['bottom','right']
  }

  activate() {
    return this.createPanel(true)
  }

  createPanel(visible) {
    if (!this.component) {
      this.component = new UnifiedView({context:this.context,services:this.services,viewService:this.viewService});
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

  focus() {
    var panel = atom.workspace.paneContainerForItem(this.atomPanel);
    panel.activate();
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
