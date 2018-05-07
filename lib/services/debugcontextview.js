'use babel'
import Service from './service'
import {Emitter, Disposable} from 'event-kit'

export default class DebugContextViewService extends Service {
  /**
  * Debug Context View Service
  * The views for a specific debug context
  * @class DebugContextViewService
  *
  * @extends Service
  * @public
  * @param  {ServiceManager} services
  * @param  {Object} options Service Options
  */
  constructor(services,options) {
    super(services,options)
    this._destroyed = false;
    this._viewService = null;
    if (this.getOption("context") == null || this.getOption("context").trim() == "") {
      throw "A context identifier must be provided when creating a debug view"
    }
    this._enabledPanels = {
      'watchpoints' : false,
      'watches' : false,
      'context' : false,
      'stack' : false,
      'breakpoints' : false,
    };
    /**
    * Debugger View Activated
    *
    * @event "debugcontextview.debuggerActivated"
    *
    * @memberof! DebugContextViewService
    * @instance
    * @type {object}
    * @param {context} string
    */
    /**
    * Console view Activated
    *
    * @event "debugcontextview.consoleActivated"
    *
    * @memberof! DebugContextViewService
    * @instance
    * @type {object}
    * @param {context} string
    */
    /**
    * Debugger View Deactivated
    *
    * @event "debugcontextview.debuggerDeactivated"
    *
    * @memberof! DebugContextViewService
    * @instance
    * @type {object}
    * @param {context} string
    */
    /**
    * Console view deactivated
    *
    * @event "debugcontextview.consoleDeativated"
    *
    * @memberof! DebugContextViewService
    * @instance
    * @type {object}
    * @param {context} string
    */
    this._emitter = new Emitter()
    this.getServices().fetchService('DebugContextView_'+this.getOption("context")).then((service) => {
      this._viewService = service;
      this.createDebugger(service)
      this.createConsole(service)
    })

  }

  /**
   * Get the URI for a view type (debug-view,console-view)
   * @public
   * @param  {string} type [description]
   * @return {string}      [description]
   */
  getViewURI(type) {
    let prefix = 'atomdebugui'
    if (this.getOption('uriPrefix')) {
      prefix = this.getOption('uriPrefix')
    }
    switch (type) {
      case "debug-view":
          return prefix + '://' + 'debug-view-' + this.getOption("context")
      case "console-view":
          return prefix + '://' + 'console-view-' + this.getOption("context")
    }
  }

  /**
   * Get the title for a view type (debug-view, console-view)
   * @public
   * @param  {string} viewName [description]
   * @return {string}          [description]
   */
  getViewTitle(viewName) {
    switch (viewName) {
      case "debug-view":
        return this.getOption('debugViewTitle') ? this.getOption('debugViewTitle') : 'Debugger'
      case 'console-view':
        return this.getOption('consoleViewTitle') ? this.getOption('consoleViewTitle') : 'Debug Console'
    }
  }

  /**
   * Gets all panels enabled for the debug view in this context
   * @public
   * @return {Object[]} [description]
   */
  getEnabledPanels() {
    return this._enabledPanels
  }

  /**
   * Returns true if a specific panel is enabled for this context
   * @public
   * @param  {String}  name [description]
   * @return {Boolean}      [description]
   */
  isPanelEnabled(name) {
    return this._enabledPanels[name]
  }

  /**
   * Enables the panels provided for this context
   * Panel name can be one of:
   * breakpoints
   * context
   * watches
   * watchpoints
   * watches
   * @public
   * @param  {String[]} names [description]
   */
  enablePanels(names) {
    for (let name of names) {
      this.enablePanel(name)
    }
  }

  /**
   * Disable the panels provided for this context
   * @public
   * @param  {String[]} names [description]
   */
  disablePanels(names) {
    for (let name of names) {
      this.disablePanel(name)
    }
  }

  /**
   * Enable a panel for the debug view for this context
   * Panel name can be one of:
   * breakpoints
   * context
   * watches
   * watchpoints
   * watches
   * @public
   * @param  {String} name [description]
   */
  enablePanel (name) {
    if (this._enabledPanels.hasOwnProperty(name)) {
      this._enabledPanels[name] = true
    }
  }

  /**
   * Disable a panel for the debug view for this context
   * @see enablePanel for list of supported panel names
   * @public
   * @param  {String} name [description]
   */
  disablePanel (name) {
    if (this._enabledPanels.hasOwnProperty(name)) {
      this._enabledPanels[name] = false
    }
  }

  /**
   * Create the console view
   * @public
   * @param  {Object} service [description]
   * @return {Object}         [description]
   */
  createConsole (service) {
    var PanelManager;
    if (!this._consoleView) {
      PanelManager = require('../console/debug-ui-console-view').PanelManager;
      this._consoleView = new PanelManager({
        services: this.getServices(),
        viewService: service,
        context: this.getOption("context"),
        onDestroyed : () => {
          if (this._emitter != undefined && this._emitter != null) {
            this._emitter.emit('atom-debug-ui.debugcontextview.consoleDeactivated', {context:this.getOption("context"),close:true})
          }
        }
      });
      this.getServices().getDebugViewService().registerView(this.getOption("context"),this._consoleView.getURI(),this._consoleView)
      if (this.getServices().hasService("Console")) {
        this.getServices().getConsoleService().registerContext(this.getOption("context"))
      }
    }
    return this._consoleView;
  }

  /**
   * Create the debugger view
   * @public
   * @param  {Object} service [description]
   * @return {Object}         [description]
   */
  createDebugger(service) {
    var PanelManager;
    if (!this._unifiedView) {
      PanelManager = require('../unified/debug-ui-unified-view').PanelManager;
      this._unifiedView = new PanelManager({
        services: this.getServices(),
        viewService: service,
        context: this.getOption("context"),
        onDestroyed : () => {
          if (this._emitter != undefined && this._emitter != null) {
            this._emitter.emit('atom-debug-ui.debugcontextview.debuggerDeactivated', {context:this.getOption("context"),close:true})
          }
        }
      });
      this.getServices().getDebugViewService().registerView(this.getOption("context"),this._unifiedView.getURI(),this._unifiedView)
    }
    return this._unifiedView;
  }

  /**
   * Toggle the console view
   * @public
   */
  toggleConsole() {
    if (this._consoleView != undefined && this._consoleView != null && !this._consoleView.isDestroyed()) {
      if (this._consoleView.isVisible()) {
        this.deactivateConsole()
      } else {
        this.activateConsole()
      }
    } else {
      if (this._consoleView.isDestroyed() && !this.isDestroyed()) {
        delete this._consoleView;
      }
      this.createConsole(this._viewService)
      this.activateConsole()
    }
  }

  /**
   * Toggle the debugger view
   * @public
   */
  toggleDebugger() {
    if (this._unifiedView != undefined && this._unifiedView != null && !this._unifiedView.isDestroyed()) {
      if (this._unifiedView.isVisible()) {
        this.deactivateDebugger()
      } else {
        this.activateDebugger()
      }
    } else {
      if (this._unifiedView.isDestroyed() && !this.isDestroyed()) {
        delete this._unifiedView;
      }
      this.createDebugger(this._viewService)
      this.activateDebugger()
    }
  }

  /**
   * Activate the console view
   * @public
   * @fires debugcontextview.consoleActivated
   */
  activateConsole() {
    if (this._consoleView != undefined && this._consoleView != null) {
      this._consoleView.activate().then( () => {
        if (this._consoleView != null && this._consoleView != null && !this._consoleView.isDestroyed()) {
          this._consoleView.setVisible(true)
          this._consoleView.focus()
          this._emitter.emit('atom-debug-ui.debugcontextview.consoleActivated', {context:this.getOption("context")})
        }
      })
    } else {
      this.createConsole()
      this.activateConsole()
    }
  }

  /**
   * Activate the debugger view
   * @public
   * @fires debugcontextview.debuggerActivated
   */
  activateDebugger() {
    if (this._unifiedView != undefined && this._unifiedView != null) {
      this._unifiedView.activate().then( () => {
        if (this._unifiedView != null && this._unifiedView != null && !this._unifiedView.isDestroyed()) {
          this._unifiedView.setVisible(true)
          this._unifiedView.focus()
          this._emitter.emit('atom-debug-ui.debugcontextview.debuggerActivated', {context:this.getOption("context")})
        }
      })
    } else {
      this.createDebugger()
      this.activateDebugger()
    }
  }

  /**
   * Deactivate the console view
   * @public
   * @fires debugcontextview.consoleDeactivated
   */
  deactivateConsole(destroy, ignoreVisible) {
    if (this._consoleView != undefined && this._consoleView != null && !this._consoleView.isDestroyed()) {
      if (ignoreVisible == undefined || ignoreVisible == null || ignoreVisible == false) {
        this._consoleView.setVisible(false)
      }
      let close = destroy != undefined && destroy != null && destroy == true;
      this._emitter.emit('atom-debug-ui.debugcontextview.consoleDeactivated', {context:this.getOption("context"), close:close})
    }
  }

  /**
   * Deactivate the debugger view
   * @public
   * @fires debugcontextview.debuggerDeactivated
   */
  deactivateDebugger(destroy, ignoreVisible) {
    if (this._unifiedView != undefined && this._unifiedView != null && !this._unifiedView.isDestroyed()) {
      if (ignoreVisible == undefined || ignoreVisible == null || ignoreVisible == false) {
        this._unifiedView.setVisible(false)
      }
      let close = destroy != undefined && destroy != null && destroy == true;
      this._emitter.emit('atom-debug-ui.debugcontextview.debuggerDeactivated', {context:this.getOption("context"), close:close})
    }
  }

  /**
   * Returns true if panels exist and are not destroyed
   * @public
   * @type {bool}
   */
  hasPanels() {
    if (this._unifiedView != undefined && this._unifiedView != null) {
      if (!this._unifiedView.isDestroyed()) {
        return true;
      }
    }
    if (this._consoleView != undefined || this._consoleView != null) {
      if (!this._consoleView.isDestroyed()) {
        return true;
      }
    }
    return false;
  }

  /**
   * Returns true if this view has been destroyed
   * @private
   * @return {Boolean}
   */
  isDestroyed() {
    return this._destroyed;
  }

  /**
   * Subscribe to DebugContextView:debuggerActivated events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onDebuggerActivated(callback) {
    return this._emitter.on('atom-debug-ui.debugcontextview.debuggerActivated',callback)
  }

  /**
   * Subscribe to DebugContextView:consoleActivated events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onConsoleActivated(callback) {
    return this._emitter.on('atom-debug-ui.debugcontextview.consoleActivated',callback)
  }

  /**
   * Subscribe to DebugContextView:debuggerDeactivated events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onDebuggerDeactivated(callback) {
    return this._emitter.on('atom-debug-ui.debugcontextview.debuggerDeactivated',callback)
  }

  /**
   * Subscribe to DebugContextView:consoleDeativated events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onConsoleDeactivated(callback) {
    return this._emitter.on('atom-debug-ui.debugcontextview.consoleDeactivated',callback)
  }

  /**
   * Subscribe to DebugContextView:destroyed events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onDestroyed(callback) {
    return this._emitter.on('atom-debug-ui.debugcontextview.destroyed',callback)
  }

  destroy() {
    if (this._destroyed) {
      return;
    }
    this._destroyed = true;
    this.deactivateDebugger(true, true)
    this.deactivateConsole(true, true)
    if (this._unifiedView != undefined && this._unifiedView != null) {
      if (!this._unifiedView.isDestroyed()) {
        this._unifiedView.destroy()
      }
      delete this._unifiedView
    }
    if (this._consoleView != undefined && this._consoleView != null) {
      if (!this._consoleView.isDestroyed()) {
        this._consoleView.destroy()
      }
      delete this._consoleView
    }
    if (this._emitter != undefined && this._emitter != null) {
      this._emitter.emit('atom-debug-ui.debugcontextview.destroyed',{context:this.getOption("context")})
    }

    if (typeof this._emitter.destroy === "function") {
      this._emitter.destroy()
    }
    this._emitter.dispose()

  }

  dispose() {
    this.destroy()
    super.dispose()
  }

}
