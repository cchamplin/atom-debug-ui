'use babel'
/** @jsx etch.dom */

import etch from 'etch'

import UiComponent from '../ui/component'

export default class ActionBar extends UiComponent {
  constructor (props,children) {
    super(props,children)
    this._services = props.services;
    this._services.fetchService("Debugger").then(this.debuggerReady)
    this._services.fetchService("Actions").then(this.actionsReady)
  }
  render() {
    const {context,state,mini, className} = this.props;

    let classes = 'block action-bar ' + className
    if (mini) {
      classes += ' mini';
    }
    const buttons = Object.keys(state.externalButtons).map((buttonId,index) => {
      let button = state.externalButtons[buttonId]
      return <button key={buttonId} className={button.buttonClasses.join(" ")} attributes={{title:button.buttonText}} onclick={this.handleExternalClickFactory(button.buttonHandler)}><span className="btn-text">{button.buttonText}</span></button>
    });
    if (buttons.length > 1) {
      classes += ' hasChildren'
    }
    return <div className={classes}>
      <div className='atom-debug-ui-view-buttons'>
        {buttons}
      </div>
      <div className='atom-debug-ui-action-buttons'>
        <button className={(!state.visibleButtons.attach ? 'btn-hidden ' : '') + "btn btn-action octicon icon-playback-play inline-block-tight"} disabled={!state.buttons.attach} onclick={this.handleAttach}>
          <span className="btn-text">Attach</span>
        </button>
        <button className={(!state.visibleButtons.run ? 'btn-hidden ' : '') +"btn btn-action octicon icon-playback-play inline-block-tight"} disabled={!state.buttons.run} onclick={this.handleRun}>
          <span className="btn-text">Launch</span>
        </button>
        <button className={(!state.visibleButtons.continue ? 'btn-hidden ' : '') +"btn btn-action octicon icon-playback-play inline-block-tight"} disabled={!state.buttons.continue} onclick={this.handleContinueDebugging}>
          <span className="btn-text">Continue</span>
        </button>
        <button className={(!state.visibleButtons.stepover ? 'btn-hidden ' : '') +"btn btn-action octicon icon-steps inline-block-tight"} disabled={!state.buttons.stepover} onclick={this.handleStepOver}>
          <span className="btn-text"> Step Over</span>
        </button>
        <button className={(!state.visibleButtons.stepin ? 'btn-hidden ' : '') +"btn btn-action octicon icon-sign-in inline-block-tight"} disabled={!state.buttons.stepin} onclick={this.handleStepIn}>
          <span className="btn-text">Step In</span>
        </button>
        <button className={(!state.visibleButtons.stepout ? 'btn-hidden ' : '') +"btn btn-action octicon icon-sign-out inline-block-tight"} disabled={!state.buttons.stepout} onClick={this.handleStepOut}>
          <span className="btn-text"> Step Out</span>
        </button>
        <button className={(!state.visibleButtons.stop ? 'btn-hidden ' : '') +"btn btn-action octicon icon-primitive-square inline-block-tight"} disabled={!state.buttons.stop}  onClick={this.handleStopDebugging}>
          <span className="btn-text">Stop</span>
        </button>
        <button className={(!state.visibleButtons.detach ? 'btn-hidden ' : '') +"btn btn-action octicon icon-zap inline-block-tight"} disabled={!state.buttons.detach}  onClick={this.handleDetach}>
          <span className="btn-text">Detach</span>
        </button>
      </div>
    </div>
  }

  init () {
    if (!this.props.state) {
      this.props.state = {
        buttons : {
          continue : false,
          stepin : false,
          stepover : false,
          stepout : false,
          stop: true,
          run: false,
          attach: false,
          detach: true
        },
        visibleButtons : {
          continue : true,
          stepin : true,
          stepover : true,
          stepout : true,
          stop: true,
          run: true,
          attach: true,
          detach: true
        },
        externalButtons : {
          "_restorePanels" : {
            buttonId: "_restorPanels",
            buttonClasses: ["btn","btn-no-deactive","restore-btn","mdi","mdi-window-restore","inline-block-tight"],
            buttonText: "Restore Panels",
            buttonPanel: "debug",
            buttonHandler: this.handleRestorePanels
          }
        }
      }
    }
    super.init()
  }

  enableButtons() {
    const state = Object.assign({}, this.props.state)
    for (var button in state.buttons) {
      state.buttons[button] = true;
    }
    this.update({state:state});
  }

  disableButtons() {
    const state = Object.assign({}, this.props.state)
    for (var button in state.buttons) {
      if (button != "stop" && button != "detach")
      state.buttons[button] = false;
    }
    this.update({state:state});
  }

  handleRestorePanels () {
    if (this.props.onRestorePanels) {
      this.props.onRestorePanels()
    }
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
    const state = Object.assign({}, this.props.state)
    const visibleButtons = this._services.getActionsService().getVisibleActionButtons();
    const enabledButtons = this._services.getActionsService().getEnabledActionButtons()
    for (let button in visibleButtons) {
      if (visibleButtons[button]) {
        state.visibleButtons[button.replace('-','')] = true;
      } else {
        state.visibleButtons[button.replace('-','')] = false;
      }
    }
    for (let button in enabledButtons) {
      if (enableButtons[button]) {
        state.buttons[button.replace('-','')] = true;
      } else {
        state.buttons[button.replace('-','')] = false;
      }
    }
    this.update({state:state});
    this.subscriptions.add(this._services.getActionsService().onButtonRegistered((event) => {
        if (event.context == this.props.context && event.panel == "debug") {
        this.addExternalButton(event.data);
      }
    }))
    this.subscriptions.add(this._services.getActionsService().onButtonRemoved((event) => {
        if (event.context == this.props.context && event.panel == "debug") {
        this.removeExternalButton(event.data);
      }
    }))
    this.subscriptions.add(this._services.getActionsService().onButtonUpdated((event) => {
        if (event.context == this.props.context && event.panel == "debug") {
        this.removeExternalButton(event.old);
        this.addExternalButton(event.data);
      }
    }))
    this.subscriptions.add(this._services.getActionsService().onActionUpdated((event) => {
      const state = Object.assign({}, this.props.state)
      switch (event.type) {
        case "hide":
          state.visibleButtons[event.name.replace('-','')] = false;
          break;
        case "show":
          state.visibleButtons[event.name.replace('-','')] = true;
          break;
        case "enable":
          state.buttons[event.name.replace('-','')] = true;
          break;
        case "disable":
          state.buttons[event.name.replace('-','')] = false;
          break;
      }
      this.update({state:state});
    }))
  }


  debuggerReady() {
    this.subscriptions.add(this._services.getDebuggerService().onBreak((event) => {
      if (event.context == this.props.context) {
        this.enableButtons();
      }
    }))
    this.subscriptions.add(this._services.getDebuggerService().onRunning((event) => {
      if (event.context == this.props.context) {
        this.disableButtons();
      }
    }))
    this.subscriptions.add(this._services.getDebuggerService().onSessionEnd((event) => {
      if (event.context == this.props.context) {
        this.disableButtons();
      }
    }))
  }

  handleAttach () {
    if (this._services.hasService('Actions')) {
      this._services.getActionsService().emitAction('atom-debug-ui.actions.attach',{context:this.props.context})
    }
  }

  handleDetach () {
    if (this._services.hasService('Actions')) {
      this._services.getActionsService().emitAction('atom-debug-ui.actions.detach',{context:this.props.context})
    }
  }

  handleRun () {
    if (this._services.hasService('Actions')) {
      this._services.getActionsService().emitAction('atom-debug-ui.actions.run',{context:this.props.context})
    }
  }

  handleContinueDebugging () {
    if (this._services.hasService('Actions')) {
      this._services.getActionsService().emitAction('atom-debug-ui.actions.continue',{context:this.props.context})
    }
  }
  handleStepOver () {
    if (this._services.hasService('Actions')) {
      this._services.getActionsService().emitAction('atom-debug-ui.actions.stepOver',{context:this.props.context})
    }
  }
  handleStepIn () {
    if (this._services.hasService('Actions')) {
      this._services.getActionsService().emitAction('atom-debug-ui.actions.stepInto',{context:this.props.context})
    }
  }
  handleStepOut () {
    if (this._services.hasService('Actions')) {
      this._services.getActionsService().emitAction('atom-debug-ui.actions.stepOut',{context:this.props.context})
    }
  }
  handleStopDebugging () {
    if (this._services.hasService('Actions')) {
      this._services.getActionsService().emitAction('atom-debug-ui.actions.stop',{context:this.props.context})
    }
  }
}

ActionBar.bindFns = ['debuggerReady','handleStepOut', 'handleRestorePanels', 'handleContinueDebugging',
'handleStepOver', 'handleStepIn', 'handleStopDebugging', 'handleAttach', 'handleRun','enableButtons','disableButtons',"actionsReady","addExternalButton","removeExternalButton","handleExternalClickFactory"]
