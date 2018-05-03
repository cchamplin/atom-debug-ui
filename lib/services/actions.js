'use babel'

import {Emitter, Disposable} from 'event-kit'
import Service from './service'

export default class ActionsService extends Service {
  /**
   * Actions Service
   * @class ActionsService
   *
   * @extends Service
   * @public
   * @param  {ServiceManager} services
   * @param  {Object} options Service Options
   */
  constructor(services,options) {
    super(services,options)
    this._enabledActionButtons = {
      'continue' : false,
      'step-over' : false,
      'step-into' : false,
      'step-out' : false,
      'stop' : false,
      'attach' : false,
      'detach' : false,
      'run' : false
    }
    this._visibleActionButtons = {
      'continue' : true,
      'step-over' : true,
      'step-into' : true,
      'step-out' : true,
      'stop' : true,
      'attach' : true,
      'detach' : true,
      'run' : true
    }
    /**
     * Button Register
     *
     * @event "buttons.register"
     *
     * @memberof! ActionsService
     * @instance
     * @type {object}
     * @param {string} type
     * @param {string} context
     * @param {object} data
     */
    /**
    * Button Updated
    *
    * @event "buttons.update"
    *
    * @memberof! ActionsService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {string} context
    * @param {object} old
    * @param {object} data
    */
    /**
     * Button Register
     *
     * @event "buttons.remove"
     *
     * @memberof! ActionsService
     * @instance
     * @type {object}
     * @param {string} type
     * @param {string} context
     * @param {object} data
     */
    /**
    * Actions Run
    *
    * @event "actions.run"
    *
    * @memberof! ActionsService
    * @instance
    * @type {object}
    * @param {string} context
    */
    /**
     * Actions Step Over
     *
     * @event "actions.stepOver"
     *
     * @memberof! ActionsService
     * @instance
     * @type {object}
     * @param {string} context
     */
    /**
    * Actions Step Into
    *
    * @event "actions.stepInto"
    *
    * @memberof! ActionsService
    * @instance
    * @type {object}
    * @param {string} context
    */
    /**
     * Actions StepOut
     *
     * @event "actions.stepOut"
     *
     * @memberof! ActionsService
     * @instance
     * @type {object}
     * @param {string} context
     */
     /**
      * Actions Stop
      *
      * @event "actions.stop"
      *
      * @memberof! ActionsService
      * @instance
      * @type {object}
      * @param {string} context
      */
      /**
       * Actions Detach
       *
       * @event "actions.detach"
       *
       * @memberof! ActionsService
       * @instance
       * @type {object}
       * @param {string} context
       */
    /**
     * Actions Continue
     *
     * @event "actions.continue"
     *
     * @memberof! ActionsService
     * @instance
     * @type {object}
     * @param {string} context
     */
     /**
      * Actions Attach
      *
      * @event "actions.attach"
      *
      * @memberof! ActionsService
      * @instance
      * @type {object}
      * @param {string} context
      */
    this._emitter = new Emitter()
    this._buttons = {}
  }

  /**
   * Register a new button on the action bar
   * @public
   * @param  {string} id
   * @param  {string} context
   * @param  {string} text
   * @param  {string[]} classes
   * @param  {function} handler
   * @return {object}
   * @fires "buttons.register"
   */
  registerButton(id, context, panel, text, classes, handler) {
    if (panel != "debug" && panel != "console") {
      return null;
    }
    if (!this.hasButtonContext(context)) {
      this._buttons[context] = { debug: {}, console: {}};
    }
    this._buttons[context][panel][id] = {
      buttonId: id,
      buttonContext: context,
      buttonText: text,
      buttonClasses: classes,
      buttonPanel: panel,
      buttonHandler: handler
    }
    this._emitter.emit('atom-debug-ui.actions.buttons.register', {type:"add", panel: panel, context:context, "data":this._buttons[context][panel][id]})
    return this._buttons[context][panel][id]
  }

  /**
   * Returns true if action button context exists
   * @public
   * @param  {string}  context
   * @return {Boolean}
   */
  hasButtonContext(context) {
    return this._buttons.hasOwnProperty(context);
  }

  /**
   * Get all buttons for a specific context
   * @public
   * @param  {string} context
   * @return {object[]}
   */
  getButtons(context,panel) {
    if (panel != "debug" && panel != "console") {
      return null;
    }
    return this._buttons[context][panel];
  }

  /**
   * Get an button by ID
   * @public
   * @param  {string} id
   * @param  {string} context
   * @return {object}
   */
  getButton(id, context, panel) {
    if (panel != "debug" && panel != "console") {
      return null;
    }
    return this._buttons[context][panel][id];
  }

  /**
   * Returns true if a specific button exists
   * @public
   * @param  {string}  id
   * @param  {string}  context
   * @return {Boolean}
   */
  hasButton(id, context, panel) {
    if (panel != "debug" && panel != "console") {
      return null;
    }
    return this._buttons[context][panel].hasOwnProperty(id);
  }

  /**
   * Update an buttons properties
   * @public
   * @param  {string} id
   * @param  {string} context
   * @param  {string} text
   * @param  {string[]} classes
   * @return {object}
   * @fires "buttons.update"
   */
  updateButton(id, context, panel, text, classes) {
    if (this.hasButton(id, context, panel)) {
      var data = this._buttons[context][panel][id];
      this._buttons[context][panel][id] = {
        buttonContext: context,
        buttonId: id,
        buttonText: text,
        buttonClasses: classes,
        buttonPanel: panel,
        buttonHandler: data.buttonHandler
      }
      this._emitter.emit('atom-debug-ui.actions.buttons.update', {type:"update", panel: panel,context:context, "old":data, "data":this._buttons[context][panel][id]})
      return this._buttons[context][panel][id]
    }
  }

  /**
   * Remove a specific button
   * @public
   * @param  {string} id
   * @param  {string} context
   * @fires "buttons.remove"
   */
  removeButton(id, context, panel) {
    if (this.hasButton(id, context, panel)) {
      this._emitter.emit('atom-debug-ui.actions.buttons.remove', {type:"remove", panel: panel, context:context, "data":this._buttons[context][panel][id]})
      delete this._buttons[context][panel][id]
    }
  }

  /**
   * Gets all action buttons for the debug view in this context
   * @public
   * @return {Object[]} [description]
   */
  getEnabledActionButtons() {
    return this._enableActionButtons
  }

  /**
   * Gets all visible action buttons for the debug view in this context
   * @public
   * @return {Object[]} [description]
   */
  getVisibleActionButtons() {
    return this._visibleActionButtons
  }

  /**
   * Returns true if a specific action button is enabled for this context
   * @public
   * @param  {String}  name [description]
   * @return {Boolean}      [description]
   */
  isActionButtonEnabled(name) {
    return this._enabledActionButtons[name]
  }

  /**
   * Returns true if a specific action button is visible for this context
   * @public
   * @param  {String}  name [description]
   * @return {Boolean}      [description]
   */
  isActionButtonVisible(name) {
    return this._visibleActionButtons[name]
  }

  /**
   * Enables the buttons provided for this context
   * Button name can be one of:
   * continue
   * stop
   * step-over
   * step-into
   * step-out
   * run
   * attach
   * @public
   * @param  {String[]} names [description]
   */
  enableActionButtons(names) {
    for (let name of names) {
      this.enableActionButton(name)
    }
  }

  /**
   * Disable the buttons provided for this context
   * @public
   * @param  {String[]} names [description]
   */
  disableActionButtons(names) {
    for (let name of names) {
      this.disableActionButton(name)
    }
  }

  /**
   * Shows the buttons provided for this context
   * Button name can be one of:
   * continue
   * stop
   * step-over
   * step-into
   * step-out
   * run
   * attach
   * @public
   * @param  {String[]} names [description]
   */
  showActionButtons(names) {
    for (let name of names) {
      this.showActionButton(name)
    }
  }

  /**
   * Hides the buttons provided for this context
   * @public
   * @param  {String[]} names [description]
   */
  hideActionButtons(names) {
    for (let name of names) {
      this.hideActionButton(name)
    }
  }

  /**
   * Enable a button for the debug view action bar in this context
   * Button name can be one of:
   * continue
   * stop
   * step-over
   * step-into
   * step-out
   * run
   * attach
   * @public
   * @param  {String} name [description]
   */
  enableActionButton (name) {
    if (this._enabledButtons.hasOwnProperty(name)) {
      this._enabledButtons[name] = true
      this._emitter.emit('atom-debug-ui.actions.buttons.actionButtonUpdate', {type:"enable", "name":name})
    }
  }

  /**
   * Disable a button for the debug view action bar in this context
   * @see enableButton for list of valid button names
   * @public
   * @param  {String} name [description]
   */
  disableActionButton (name) {
    if (this._enabledButtons.hasOwnProperty(name)) {
      this._enabledButtons[name] = false
      this._emitter.emit('atom-debug-ui.actions.buttons.actionButtonUpdate', {type:"disable", "name":name})
    }
  }

  /**
   * Enable a button for the debug view action bar in this context
   * Button name can be one of:
   * continue
   * stop
   * step-over
   * step-into
   * step-out
   * run
   * attach
   * @public
   * @param  {String} name [description]
   */
  showActionButton (name) {
    if (this._visibleActionButtons.hasOwnProperty(name)) {
      this._visibleActionButtons[name] = true
      this._emitter.emit('atom-debug-ui.actions.buttons.actionButtonUpdate', {type:"show", "name":name})
    }
  }

  /**
   * Disable a button for the debug view action bar in this context
   * @see enableButton for list of valid button names
   * @public
   * @param  {String} name [description]
   */
  hideActionButton (name) {
    if (this._visibleActionButtons.hasOwnProperty(name)) {
      this._visibleActionButtons[name] = false
      this._emitter.emit('atom-debug-ui.actions.buttons.actionButtonUpdate', {type:"hide", "name":name})
    }
  }

  /**
   * Subscribe to Button:register events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onButtonRegistered(callback) {
    return this._emitter.on('atom-debug-ui.actions.buttons.register', callback)
  }
  /**
   * Subscribe to Button:remove events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onButtonRemoved(callback) {
    return this._emitter.on('atom-debug-ui.actions.buttons.remove', callback)
  }

  /**
   * Subscribe to Button:update events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onButtonUpdated(callback) {
    return this._emitter.on('atom-debug-ui.actions.buttons.update', callback)
  }

  /**
   * Subscribe to Button:actionButtonUpdate events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onActionButtonUpdated(callback) {
    return this._emitter.on('atom-debug-ui.actions.buttons.actionButtonUpdate', callback)
  }

  /**
   * Subscribe to Action:run events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onRun(callback) {
    return this._emitter.on('atom-debug-ui.actions.run', callback)
  }
  /**
   * Subscribe to Action:attach events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onAttach(callback) {
    return this._emitter.on('atom-debug-ui.actions.attach', callback)
  }
  /**
   * Subscribe to Action:detach events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onDetach(callback) {
    return this._emitter.on('atom-debug-ui.actions.detach', callback)
  }
  /**
   * Subscribe to Action:continue events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onContinue(callback) {
    return this._emitter.on('atom-debug-ui.actions.continue', callback)
  }
  /**
   * Subscribe to Action.stepOver events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onStepOver(callback) {
    return this._emitter.on('atom-debug-ui.actions.stepOver', callback)
  }
  /**
   * Subscribe to Action:stepInto events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onStepInto(callback) {
    return this._emitter.on('atom-debug-ui.actions.stepInto', callback)
  }
  /**
   * Subscribe to Action:stepOut events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onStepOut(callback) {
    return this._emitter.on('atom-debug-ui.actions.stepOut', callback)
  }
  /**
   * Subscribe to Action:stop events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onStop(callback) {
    return this._emitter.on('atom-debug-ui.actions.stop', callback)
  }

/**
 * Used to fire specific action events
 * @package
 * @param  {string} action
 * @param  {object} data
 */
  emitAction(action,data) {
    this._emitter.emit(action,data)
  }

  destroy() {
    for (var context in this._buttons) {
      for (var button in this._buttons[context]['console']) {
        this.removeButton(button, context, 'console');
      }
      for (var button in this._buttons[context]['debug']) {
        this.removeButton(button, context, 'debug');
      }
      delete this._buttons[context]
    }
    delete this._buttons

    if (typeof this._emitter.destroy === "function") {
      this._emitter.destroy()
    }
    this._emitter.dispose()
    super.destroy()
  }

  dispose() {
    this.destroy()
    super.dispose()
  }
}
