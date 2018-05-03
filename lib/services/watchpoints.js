'use babel'

import {Emitter, Disposable} from 'event-kit'
import Watchpoint from '../models/watchpoint'
import helpers from '../helpers'
import Service from './service'

export default class WatchpointsService extends Service {
  /**
   * Watchpoints Service
   * @class WatchpointsService
   *
   * @extends Service
   * @public
   * @param  {ServiceManager} services
   * @param  {Object} options Service Options
   */
  constructor(services,options) {
    super(services,options)
    this._watchpoints = []
    /**
    * Watchpoints cleared event
    *
    * @event "watchpoints.watchpointsCleared"
    *
    * @memberof! WatchpointsService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {object[]} removed
    */
    /**
    * Watchpoints changed event
    *
    * @event "watchpoints.watchpointsChanged"
    *
    * @memberof! WatchpointsService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {object[]} removed
    * @param {object[]} added
    */
    /**
    * Watchpoint added event
    *
    * @event "watchpoints.watchpointAdded"
    *
    * @memberof! WatchpointsService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {object[]} removed
    */
    /**
    * Watchpoint removed event
    *
    * @event "watchpoints.watchpointRemoved"
    *
    * @memberof! WatchpointsService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {object[]} removed
    */
    this._emitter = new Emitter()
  }

  /**
   * Serialize current watchpoints data
   * @public
   * @return {object} Serialized state data
   */
  serialize() {
    return {
      deserializer: 'WatchpointsService',
      version: WatchpointsService.version,
      data: {
        watchpoints: helpers.serializeArray(this.getWatchpoints())
      }
    }
  }

  /**
   * Deserialize prior watchpoints data
   * @package
   * @param  {object} state Serialized data object
   */
  deserialize(state) {
    if (state != null && state.data != undefined && state.data != null)
    {
      if (state.data.watchpoints != undefined && state.data.watchpoints != null) {
        let watchpoints = helpers.deserializeArray(state.data.watchpoints);
        for (let watchpoint of watchpoints) {
          this.addWatchpoint(watchpoint)
        }
      }
    }
  }

  /**
   * Created a watchpoint from the user selection in the editor
   * @public
   * @return {Object} [description]
   */
  createWatchpointFromSelection () {
    let editor = atom.workspace.getActivePaneItem();

    if (editor == undefined || editor == null || typeof editor.getSelectedText !== 'function') {
      return;
    }
    let expression = editor.getSelectedText();

    if (expression == null || expression.trim() == "") return

    let w = new Watchpoint({
      expression: expression
    });
    return this.addWatchpoint(w);
  }

  /**
   * Gets all watchpoints
   * @public
   * @return {Object[]} [description]
   */
  getWatchpoints() {
    return  this._watchpoints;
  }

  /**
   * Clears all watchpoints
   * @public
   * @return {Object[]} [description]
   * @fires "watchpoints.watchpointsCleared"
   * @fires "watchpoints.watchpointsChanged"
   */
  clearWatchpoints () {
    const previous = this._watchpoints.slice();
    this._watchpoints = []
    const data = {
      type : "cleared",
      removed : previous
    }
    this._emitter.emit('atom-debug-ui.watchpoints.watchpointsCleared', data)
    this._emitter.emit('atom-debug-ui.watchpoints.watchpointsChanged', data)
    return previous
  }

  /**
   * Add a watchpoint
   * @public
   * @param  {Object} watchpoint [description]
   * @fires "watchpoints.watchpointAdded"
   * @fires "watchpoints.watchpointsChanged"
   */
  addWatchpoint(watchpoint) {
    helpers.insertOrdered(this._watchpoints, watchpoint)
    const data = {
      type : "added",
      added: [watchpoint]
    }
    this._emitter.emit('atom-debug-ui.watchpoints.watchpointAdded', data)
    this._emitter.emit('atom-debug-ui.watchpoints.watchpointsChanged', data)
  }

  /**
   * Remove a specific watchpoint
   * @public
   * @param  {Object} item [description]
   * @return {Object}      [description]
   * @fires "watchpoints.watchpointRemoved"
   * @fires "watchpoints.watchpointsChanged"
   */
  removeWatchpoint(item) {
    const removed = helpers.arrayRemove(this._watchpoints, item)
    if (removed != null) {
      const data = {
        type : "removed",
        removed : [removed]
      }
      this._emitter.emit('atom-debug-ui.watchpoints.watchpointRemoved', data)
      this._emitter.emit('atom-debug-ui.watchpoints.watchpointsChanged', data)
      return removed
    }
    return null
  }

  // Events
  /**
   * Subscribe to Watchpoints:watchpointAdded events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onWatchpointAdded(callback) {
    return this._emitter.on('atom-debug-ui.watchpoints.watchpointAdded', callback)
  }

  /**
   * Subscribe to Watchpoints:watchpointRemoved events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onWatchpointRemoved(callback) {
    return this._emitter.on('atom-debug-ui.watchpoints.watchpointRemoved', callback)
  }

  /**
   * Subscribe to Watchpoints:watchpointsChanged events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onWatchpointsChanged(callback) {
    return this._emitter.on('atom-debug-ui.watchpoints.watchpointsChanged', callback)
  }

  /**
   * Subscribe to Watchpoints:watchpointsCleared events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onWatchpointsCleared(callback) {
    return this._emitter.on('atom-debug-ui.watchpoints.watchpointsCleared', callback)
  }

  destroy() {
    this.clearWatchpoints()
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
WatchpointsService.version = "1a";
atom.deserializers.add(WatchpointsService);
