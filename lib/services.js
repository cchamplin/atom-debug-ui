'use babel'
import {Emitter, Disposable} from 'event-kit'
import BreakpointsService from './services/breakpoints'
import WatchpointsService from './services/watchpoints'
import WatchesService from './services/watches'
import StackService from './services/stack'
import ConsoleService from './services/console'
import ScopeService from './services/scope'
import StatusService from './services/status'
import DebugViewService from './services/debugview'
import ActionsService from './services/actions'
import LoggerService from './services/logger'
import {CompositeDisposable} from 'atom'
import SubscriptionManager from './subscriptions'
import Promise from 'promise'


export default class ServiceManager {
/**
* @class ServiceManager
*
* @classdesc
* Provided to packages that consume "debug-ui"
*  ```
*  "consumedServices": {
*   "debug-ui": {
*     "versions": {
*       "0.1.0": "consumeDebugUI"
*     }
*   }
*  ```
*/
  constructor() {
    this._activated = false
    this._registeredServices = {}
    this._emitter = new Emitter();
    this._subscriptions = new SubscriptionManager(this)
    this.registerService('InternalLogger', new LoggerService(this,{prefix:'Atom Debug (Internal)'}))

  }

  /**
   * Services activation
   * Should be called by consumers after receiving DebugUI services
   * @public
   * @param  {string} name Name of debugger, must match an engine name
   * @param  {object} state Serialized state
   * @fires atom.debug-ui.services#activated
   */
  activate(name, state) {
    if (name == undefined || name == null || name.trim() == "") {
      throw "Unable to activate services, name cannot be null"
    }
    this._activated = true
    this._name = name
    this._state = state
    this.registerService('Logger', new LoggerService(this,{prefix:'Atom Debug ('+name+')'}))
    /**
     * Service activated event
     * @event atom-debug-ui.services#activated
     * @type {object}
     * @property {string} name - Service name
     * @property {object} services - Service Manager instance - this instance
     */
    this._emitter.emit('atom-debug-ui.services.activated', {name:name,services: this})
    this.getInternalLoggerService().debug("Activated Services for ", name);
  }

  /**
   * Returns true or false if activate() has succeeded
   * @access public
   * @return {Boolean}
   */
  isActivated() {
    return this._activated
  }

  /**
   * Services activation name via activate()
   * @access public
   * @return {string} Name of activated services
   */
  getName() {
    return this._name
  }

  /**
   * Returns true if services have been activated and the specified
   * service has been registered
   * @access public
   * @param  {string}  name Service name
   * @return {Boolean}
   * @throws Exception if services have not been activated
   */
  hasService(name) {
    if (!this._activated) {
      throw "Cannot get services before activation";
    }
    if (this._registeredServices.hasOwnProperty(name)) {
      return true
    }
  }

  /**
   * Returns are promise that is resolved when the specified service
   * has been registered and is available
   * @access public
   * @param  {string} name Service name
   * @return {Promise}      Promise resolves with the Service object
   * @fulfil {Service} - Requested service object
   */
  fetchService(name) {
    return new Promise((fulfill,reject) => {
      if (this.hasService(name)) {
        fulfill(this._registeredServices[name])
      } else {
        const disposable = this.onServiceRegistered((event) => {
          if (event.name == name) {
            // TODO this event listener should be disposed of when it's completed
            fulfill(event.service)
            disposable.dispose()
          }
        });
      }
    })
  }

  /**
   * Primary means of accessing debug-ui services
   * Available services:
   * * Breakpoints
   * * Stack
   * * Scope
   * * Watchpoints
   * * Watches
   * * Actions
   * * Console
   * * Status
   * * DebugView
   * Always Available Services (do not need to be requested):
   * * Logger
   * @public
   * @param  {string}   name     [description]
   * @param  {object}   options  [description]
   * @param  {Function} callback [description]
   * @throws Exception if service manager has not been activated
   */
  requestService(name,options,callback) {
    if (!this._activated) {
      throw "Cannot request services before activation";
    }
    switch (name.toLowerCase()) {
      case 'breakpoint':
      case 'breakpoints':
        this.registerService('Breakpoints',new BreakpointsService(this,options),callback)
        break;
      case 'stack':
      case 'stackframes':
        this.registerService('Stack',new StackService(this,options),callback)
        break;
      case 'scope':
        this.registerService('Scope',new ScopeService(this,options),callback)
        break;
      case 'watchpoint':
      case 'watchpoints':
        this.registerService('Watchpoints',new WatchpointsService(this,options),callback)
        break;
      case 'watch':
      case 'watches':
        this.registerService('Watches',new WatchesService(this,options),callback)
        break;
      case 'actions':
        this.registerService('Actions',new ActionsService(this,options),callback)
        break;
      case 'console':
        this.registerService('Console',new ConsoleService(this,options),callback)
        break;
      case 'status':
        this.registerService('Status',new StatusService(this,options),callback)
        break;
      case 'debugview':
        this.registerService('DebugView',new DebugViewService(this,options),callback)
        break;
      default:
        console.log('unrecognized service')
    }
  }

  /**
   * Provides serialized service data for loaded services
   * @oublic
   * @return {Object|Serialized-Data}
   */
  serialize() {
    let data = {version: ServiceManager.version}
    for (let name in this._registeredServices) {
      if (typeof this._registeredServices[name].serialize === "function") {
        data[name] = this._registeredServices[name].serialize();
      }
    }
    return {
      deserializer: 'ServiceManager',
      data: data
    }
  }

  /**
   * Register third party services with the service manager
   * @public
   * @param  {name}   name     Unique name of service
   * @param  {object|Service}   service  Service object to be registered
   * @param  {Function} callback Callback to be executed when service is registered
   * @return {null|Service}            [description]
   * @throws Exception if service manager has not been activated
   */
  registerService(name,service,callback) {
    if (!this._activated && name != "InternalLogger") {
      throw "Cannot register services before activation";
    }
    let that = this
    if (this._state != null && this._state.data != undefined && this._state.data != null) {
      if (this._state.data.hasOwnProperty(name)) {
        if (typeof service.setState === "function") {
          service.setState(this._state.data[name]);
        }
      }
    }
    this._registeredServices[name] = service;
    this['get'+name+'Service'] = () => {
      return that._registeredServices[name];
    }
    this._emitter.emit('atom-debug-ui.services.serviceRegistered', {name:name,service:service})
    if (callback != undefined && callback != null && typeof callback === 'function') {
      callback(service, service.getOptions())
    }
  }

  /**
   * Unregister the given service from the service manager
   * @public
   * @param  {string} name Service Name
   */
  unregisterService(name) {
    if (!this.hasService(name)) return
    this._emitter.emit('atom-debug-ui.services.serviceDeregistered', {name:name, service:this._registeredServices[name]})
    delete this._registeredServices[name]
  }

  /**
   * Subscribe to Service Registration events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onServiceRegistered(callback) {
    return this._emitter.on('atom-debug-ui.services.serviceRegistered', callback)
  }

  /**
   * Subscribe to Service Deregistration events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onServiceDeregistered(callback) {
    return this._emitter.on('atom-debug-ui.services.serviceDeregistered', callback)
  }

  /**
   * Subscribe to Service activation events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onActivated(callback) {
    return this._emitter.on('atom-debug-ui.services.activated', callback)
  }

  /**
   * Unregisters all services and destroys the service manager
   * @public
   */
  destroy() {
    if (this._activated) {
      // Unregister the Views first
      if (this.hasService("DebugView")) {
        this._emitter.emit('atom-debug-ui.services.serviceDeregistered', {name:"DebugView", service:this._registeredServices["DebugView"]})
        if (typeof this._registeredServices["DebugView"].destroy === "function") {
          this._registeredServices["DebugView"].destroy(true)
        } else {
          this.getInternalLoggerService().warn("Could not destroy service", "DebugView")
        }
        delete this._registeredServices["DebugView"]
      }
    }
        // Unregister all services except for loggers
    for (let name in this._registeredServices) {
      if (name != "Logger" && name != "InternalLogger") {
        this._emitter.emit('atom-debug-ui.services.serviceDeregistered', {name:name, service:this._registeredServices[name]})
        if (typeof this._registeredServices[name].destroy === "function") {
          this._registeredServices[name].destroy(true)
        } else {
          this.getInternalLoggerService().warn("Could not destroy service", name)
        }
        delete this._registeredServices[name]
      }
    }
    // Run second pass to remove loggers
    for (let name in this._registeredServices) {
      this._emitter.emit('atom-debug-ui.services.serviceDeregistered', {name:name, service:this._registeredServices[name]})
      this._registeredServices[name].destroy(true)
      delete this._registeredServices[name]
    }

    if (typeof this._emitter.destroy === "function") {
      this._emitter.destroy()
    }
    this._emitter.dispose()
    this._subscriptions.dispose()
  }

  dispose() {
    this.destroy()
  }
}
