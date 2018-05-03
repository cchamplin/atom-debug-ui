'use babel'

import {Emitter, Disposable} from 'event-kit'
import Service from './service'
export default class StatusService extends Service {
  /**
   * Status Service
   * @class StatusService
   *
   * @extends Service
   * @public
   * @param  {ServiceManager} services
   * @param  {Object} options Service Options
   */
  constructor(services,options) {
    super(services,options)
    this._statuses = {}
    /**
    * Status changed event
    *
    * @event "status.statusChanged"
    *
    * @memberof! StatusService
    * @instance
    * @type {object}
    * @param {string} context
    * @param {object} new
    * @param {object} old
    */
    this._emitter = new Emitter()
  }

  /**
   * Returns the current status for a given context
   * @public
   * @param  {String} context [description]
   * @return {Object}         [description]
   */
  getStatus(context) {
    if (context == undefined || context == null) {
      return
    }
    if (!this._statuses.hasOwnProperty(context)) {
      return null
    }
    return this._statuses[context]
  }

  /**
   * Sets the status for a given context
   * @public
   * @param  {String} context   [description]
   * @param  {Object} newStatus [description]
   * @fires "status.statusChanged"
   */
  setStatus(context,newStatus) {
    if (context == undefined || context == null) {
      return
    }
    if (!this._statuses.hasOwnProperty(context)) {
      this._statuses[context] = null
    }
    const old = this._statuses[context]
    this._statuses[context] = newStatus
    this._emitter.emit('atom-debug-ui.status.statusChanged', {context:context, 'new':newStatus, 'old':old})
  }

  /**
   * Subscribe to Status:statusChanged events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onStatusChanged(callback) {
    return this._emitter.on('atom-debug-ui.status.statusChanged', callback)
  }

  destroy() {
    delete this._statuses
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
