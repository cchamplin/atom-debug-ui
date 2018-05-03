'use babel'

import {Emitter, Disposable} from 'event-kit'
import Service from './service'

export default class ScopeService extends Service {
  /**
  * Used to manage debug scopes
  * @class ScopeService
  *
  * @extends Service
  * @public
  * @param  {ServiceManager} services
  * @param  {Object} options Service Options
  */
  constructor(services,options) {
    super(services,options)
    this._scopes = {}
    this._commandHistory = {}
    /**
    * Scopes cleared event
    *
    * @event "scopes.scopesCleared"
    *
    * @memberof! ScopeService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {string} context
    * @param {object[]} removed
    */
    /**
    * Scopes changed event
    *
    * @event "scopes.scopesChanged"
    *
    * @memberof! ScopeService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {string} context
    * @param {object[]} removed
    * @param {object[]} added
    */
    /**
    * Scopes unregistered event
    *
    * @event "scopes.scopeUnregistered"
    *
    * @memberof! ScopeService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {string} context
    * @param {object[]} removed
    */
    /**
    * Scope data set event
    *
    * @event "scopes.scopeDataSet"
    *
    * @memberof! ScopeService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {string} context
    * @param {string} scopeId
    * @param {object[]} removed
    * @param {object[]} added
    */
    /**
    * Scope registered event
    *
    * @event "scopes.scopeRegistered"
    *
    * @memberof! ScopeService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {string} context
    * @param {object} data
    */
    this._emitter = new Emitter()
  }

  /**
   * Fetches all scopes for a given context
   * @public
   * @param  {string} context [description]
   * @return {object[]}
   */
  getScopesForContext(context) {
    if (context == undefined || context == null || context.trim() == "") {
      return null
    }
    if (!this.hasScopesForContext(context)) {
      return null;
    }
    return this._scopes[context]
  }

  /**
   * Get a specific scope for a given context
   * @public
   * @param  {string} context [description]
   * @param  {string} scopeId [description]
   * @return {object}         [description]
   */
  getScope(context, scopeId) {
    if (context == undefined || context == null || context.trim() == "") {
      return null
    }
    if (scopeId == undefined || scopeId == null || scopeId.trim() == "") {
      return null
    }
    if (!this.hasScopeForContext(context, scopeId)) {
      return null;
    }
    return this._scopes[context][scopeId]
  }

  /**
   * Clear all registered scopes for a given context
   * @public
   * @param  {string} context [description]
   * @return {object[]}         [description]
   * @fires "scopes.scopesCleared"
   * @fires "scopes.scopesChanged"
   * @fires "scopes.scopeUnregistered"
   */
  clearScopes (context) {
    if (context == undefined || context == null || context.trim() == "") {
      return null
    }
    if (!this.hasScopesForContext(context)) {
      return null;
    }
    const previous = Object.assign({}, this._scopes[context]);
    delete this._scopes[context]
    const data = {
      type: "clear",
      context: context,
      removed : previous
    }
    this._emitter.emit('atom-debug-ui.scopes.scopesCleared', data)
    this._emitter.emit('atom-debug-ui.scopes.scopesChanged', data)
    this._emitter.emit('atom-debug-ui.scopes.scopeUnregistered', data)
    return previous
  }

  /**
   * Set the data for a specific scope in a given context
   * @public
   * @param  {string} context   [description]
   * @param  {string} scopeId   [description]
   * @param  {object} scopeData [description]
   * @fires "scopes.scopeDataset"
   */
  setData(context, scopeId, scopeData) {
    if (context == undefined || context == null || context.trim() == "") {
      return null
    }
    if (scopeId == undefined || scopeId == null || scopeId.trim() == "") {
      return null
    }
    if (!this.hasScopeForContext(context, scopeId)) {
      return null;
    }
    const previous = Object.assign({}, this._scopes[context][scopeId].data);
    this._scopes[context][scopeId].data = scopeData
    const data = {
      type: "set",
      context: context,
      scopeId: scopeId,
      removed: previous,
      added: scopeData
    }
    this._emitter.emit('atom-debug-ui.scopes.scopeDataSet', data)
  }

  /**
   * Register a scope in a given context
   * @public
   * @param  {string} context [description]
   * @param  {string} scopeId [description]
   * @param  {string} name    [description]
   * @fires "scopes.scopeRegistered"
   * @fires "scopes.scopesChanged"
   */
  registerScope(context, scopeId, name) {
    if (context == undefined || context == null || context.trim() == "") {
      return
    }
    if (scopeId == undefined || scopeId == null || scopeId.trim() == "") {
      return
    }
    if (this.hasScopeForContext(context, scopeId)) {
      return
    }
    if (!this.hasScopesForContext(context)) {
      this._scopes[context] = {}
    }
    const scope = {
      context: context,
      scopeId: scopeId,
      name: name,
      data: {}
    }
    this._scopes[context][scopeId] = scope
    const data = {
      type: "added",
      context: context,
      data : scope
    }
    this._emitter.emit('atom-debug-ui.scopes.scopeRegistered', data)
    this._emitter.emit('atom-debug-ui.scopes.scopesChanged', data)
  }

  /**
   * Remove a specific scope in a given context
   * @public
   * @param  {string} context [description]
   * @param  {string} scopeId [description]
   * @return {Object}         [description]
   * @fires "scopes.scopeUnregistered"
   * @fires "scopes.scopesChanged"
   */
  removeScope(context, scopeId) {
    if (context == undefined || context == null || context.trim() == "") {
      return null
    }
    if (scopeId == undefined || scopeId == null || scopeId.trim() == "") {
      return null
    }
    if (!this.hasScopeForContext(context,scopeId)) {
      return null;
    }
    const removed = Object.assign({}, this._scopes[context][scopeId])
    delete this._scopes[context][scopeId]
    if (removed != null) {
      const data = {
        type: "removed",
        context:context,
        removed : [removed]
      }
      this._emitter.emit('atom-debug-ui.scopes.scopeUnregistered', removed)
      this._emitter.emit('atom-debug-ui.scopes.scopesChanged', data)
      return removed
    }
    return null
  }

  /**
   * Return true if a context has scopes
   * @public
   * @param  {string}  context [description]
   * @return {Boolean}         [description]
   */
  hasScopesForContext(context) {
    if (this._scopes.hasOwnProperty(context)) {
      return true
    }
    return false
  }

  /**
   * Return true if a given context has a specific scope
   * @public
   * @param  {string}  context [description]
   * @param  {string}  scopeId [description]
   * @return {Boolean}         [description]
   */
  hasScopeForContext(context,scopeId) {
    if (this._scopes.hasOwnProperty(context)) {
      if (this._scopes[context].hasOwnProperty(scopeId)) {
        return true
      }
    }
    return false
  }

  // Events
  /**
   * Subscribe to Scopes:scopeRegistered events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onScopeRegistered(callback) {
    return this._emitter.on('atom-debug-ui.scopes.scopeRegistered', callback)
  }

  /**
   * Subscribe to Scopes:scopeUnregistered events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onScopeUnregistered(callback) {
    return this._emitter.on('atom-debug-ui.scopes.scopeUnregistered', callback)
  }

  /**
   * Subscribe to Scopes:scopesChanged events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onScopesChanged(callback) {
    return this._emitter.on('atom-debug-ui.scopes.scopesChanged', callback)
  }

  /**
   * Subscribe to Scopes:scopeDataSet events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onScopeDataSet(callback) {
    return this._emitter.on('atom-debug-ui.scopes.scopeDataSet', callback)
  }

  /**
   * Subscribe to Scopes:scopesCleared events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onScopesCleared(callback) {
    return this._emitter.on('atom-debug-ui.scopes.scopesCleared', callback)
  }

  destroy() {
    for (let context in this._scopes) {
      this.clearScopes(context)
    }
    delete this._scopes
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
