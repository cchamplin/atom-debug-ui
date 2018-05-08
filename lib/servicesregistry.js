'use babel'
import {CompositeDisposable} from 'atom'
import autoBind from 'auto-bind-inheritance'
import ScopeResolverService from './services/scoperesolver'

export default class ServicesRegistry {
  /**
   * @class ServicesRegistry
   * @package
   */
  constructor() {
    autoBind(this);
    this._serviceManagers = []
    this._engines = []
    this._subscriptions = new CompositeDisposable()
  }

  /**
   * Add a debug engine to the registry
   * @public
   * @param  {DebugEngine} engine Debug engine
   */
  addDebugEngine(engine) {
    this._engines.push(engine)
    for (let services of this._serviceManagers) {
      if (services.isActivated()) {
        if (services.getName() == engine.getName()) {
          services.registerService('Debugger',engine)
          services.registerService("ScopeResolver", new ScopeResolverService(services,{}))
          services.getLoggerService().debug("Debug Engine Registered with Services")
        }
      }
    }
  }

  /**
   * Gets all registered service managers
   * @public
   * @return {ServiceManager[]} Array of service managers
   */
  getAllServices() {
    return this._serviceManagers;
  }

  /**
   * Add service manager to registry
   * @public
   * @param  {ServiceManager} services Service Manager
   */
  addServiceManager(services) {
    this._serviceManagers.push(services)
    this._subscriptions.add(services.onActivated(this.serviceManagerActivated.bind(this)))
    services.getInternalLoggerService().debug('Initialized new Service Manager')
  }

  /**
   * Callback for when a service manager has been activated
   * @public
   * @param  {object} event - Event for activation
   * @param  {string} event.name - Engine name
   * @param  {string} event.services - ServiceManager instance
   */
  serviceManagerActivated(event) {
    for (let engine of this._engines) {
      if (event.name == engine.getName()) {
        event.services.registerService('Debugger',engine)
        event.services.registerService("ScopeResolver", new ScopeResolverService(event.services,{}))
        event.services.getLoggerService().debug("Debug Engine Registered with Services")
      }
    }
  }

  /**
   * Gets a service manager for a specific editor based on Grammar
   * @public
   * @return {ServiceManager} Service Manager
   */
  locateServicesForEditor() {
    let editor = atom.workspace.getActiveTextEditor()
    if (editor == undefined || editor == null || typeof editor.getGrammar !== "function") {
      return null
    }
    return this.locateServicesForScope(editor.getGrammar().scopeName)
  }

  /**
   * Gets a service manager for a specific grammar scope name
   * @public
   * @param  {string} scopeName Grammar scope name
   * @return {ServiceManager}  Service Manager
   */
  locateServicesForScope(scopeName) {
    for (let services of this._serviceManagers) {
      if (services.isActivated()) {
        if (services.hasService("Debugger")) {
          const grammars = services.getDebuggerService().getGrammars()
          for (let grammar of grammars) {
            if (grammar == scopeName) {
              return services
            }
          }
        }
      }
    }
    return null
  }

  destroy() {
    if (this._serviceManagers != undefined && this._serviceManagers != null) {
      for (let services of this._serviceManagers) {
        services.destroy()
      }
    }
    delete this._serviceManagers
    delete this._engines
    this._subscriptions.dispose()
  }
  dispose() {
    this.destroy()
  }

}
