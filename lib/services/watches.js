'use babel'

import {Emitter, Disposable} from 'event-kit'
import Watch from '../models/watch'
import helpers from '../helpers'
import Service from './service'

export default class WatchesService extends Service {
  /**
   * Watches Service
   * @class WatchesService
   *
   * @extends Service
   * @public
   * @param  {ServiceManager} services
   * @param  {Object} options Service Options
   */
  constructor(services,options) {
    super(services,options)
    this._watches = []
    /**
    * Watches cleared event
    *
    * @event "watches.watchesCleared"
    *
    * @memberof! WatchesService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {object[]} removed
    */
    /**
    * Watches changed event
    *
    * @event "watches.watchesChanged"
    *
    * @memberof! WatchesService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {object[]} removed
    * @param {object[]} added
    */
    /**
    * Watch added event
    *
    * @event "watches.watchAdded"
    *
    * @memberof! WatchesService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {object[]} added
    */
    /**
    * Watch removed event
    *
    * @event "watches.watchRemoved"
    *
    * @memberof! WatchesService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {object[]} removed
    */
    this._emitter = new Emitter()
    this.getServices().fetchService("Debugger").then((service) => {
      this._subscriptions.add(service.onSessionEnd((event) => {
        for (let watch of this._watches) {
          watch.unsetValue(event.context);
        }
      }))
    })
  }

  /**
   * Serialize current watches data
   * @public
   * @return {object} Serialized state data
   */
  serialize() {
    return {
      deserializer: 'WatchesService',
      version: WatchesService.version,
      data: {
        watches: helpers.serializeArray(this.getWatches())
      }
    }
  }

  /**
   * Deserialize prior watches data
   * @package
   * @param  {object} state Serialized data object
   */
  deserialize(state) {
    if (state != null && state.data != undefined && state.data != null)
    {
      if (state.data.watches != undefined && state.data.watches != null) {
        let watches = helpers.deserializeArray(state.data.watches);
        for (let watch of watches) {
          this.addWatch(watch)
        }
      }
    }
  }

  /**
   * Create a watch from the user selection in the editor
   * @public
   * @return {Object} [description]
   */
  createWatchFromSelection () {
    let editor = atom.workspace.getActivePaneItem();

    if (editor == undefined || editor == null || typeof editor.getSelectedText !== 'function') {
      return;
    }
    let expression = editor.getSelectedText();

    if (expression == null || expression.trim() == "") return

    let w = new Watch({
      expression: expression
    });
    return this.addWatch(w);
  }

  /**
   * Return all watches
   * @public
   * @return {Object[]} [description]
   */
  getWatches() {
    return  this._watches;
  }

  /**
   * Clear all watches
   * @public
   * @return {Object[]} [description]
   * @fires "watches.watchesCleared"
   * @fires "watches.watchesChanged"
   */
  clearWatches () {
    const previous = this._watches.slice();
    this._watches = []
    const data = {
      type : "cleared",
      removed : previous
    }
    this._emitter.emit('atom-debug-ui.watches.watchesCleared', data)
    this._emitter.emit('atom-debug-ui.watches.watchesChanged', data)
    return previous
  }

  /**
   * Adds a watch
   * @public
   * @fires "watches.watchAdded"
   * @fires "watches.watchesChanged"
   */
  addWatch(watch) {
    helpers.insertOrdered(this._watches, watch)
    const data = {
      type: "added",
      added: [watch]
    }
    this._emitter.emit('atom-debug-ui.watches.watchAdded', data)
    this._emitter.emit('atom-debug-ui.watches.watchesChanged', data)
  }

  /**
   * Remove a watch
   * @public
   * @param  {Object} item [description]
   * @return {Object}      [description]
   * @fires "watches.watchRemoved"
   * @fires "watches.watchesChanged"
   */
  removeWatch(item) {
    const removed = helpers.arrayRemove(this._watches, item)
    if (removed != null) {
      const data = {
        type : "removed",
        removed : [removed]
      }
      this._emitter.emit('atom-debug-ui.watches.watchRemoved', data)
      this._emitter.emit('atom-debug-ui.watches.watchesChanged', data)
      return removed
    }
    return null
  }

  // Events
  /**
   * Subscribe to Watches:watchAdded events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onWatchAdded(callback) {
    return this._emitter.on('atom-debug-ui.watches.watchAdded', callback)
  }

  /**
   * Subscribe to Watches:watchRemoved events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onWatchRemoved(callback) {
    return this._emitter.on('atom-debug-ui.watches.watchRemoved', callback)
  }

  /**
   * Subscribe to Watches:watchesChanged events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onWatchesChanged(callback) {
    return this._emitter.on('atom-debug-ui.watches.watchesChanged', callback)
  }

  /**
   * Subscribe to Watches:watchesCleared events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onWatchesCleared(callback) {
    return this._emitter.on('atom-debug-ui.watches.watchesCleared', callback)
  }

  destroy() {
    this.clearWatches()
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
WatchesService.version = "1a"
atom.deserializers.add(WatchesService);
