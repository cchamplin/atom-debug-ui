'use babel'

import {Emitter, Disposable} from 'event-kit'
import Service from './service'

export default class StackService extends Service {
  /**
   * Stack Service
   * @class StackService
   *
   * @extends Service
   * @public
   * @param  {ServiceManager} services
   * @param  {Object} options Service Options
   */
  constructor(services,options) {
    super(services,options)
    this._stackFrames = {}
    /**
    * Stack frames cleared event
    *
    * @event "stack.stackFramesCleared"
    *
    * @memberof! StackService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {string} context
    * @param {object[]} removed
    */
    /**
    * Stack frames changed event
    *
    * @event "stack.stackFramesChanged"
    *
    * @memberof! StackService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {string} context
    * @param {object[]} removed
    * @param {object[]} added
    */
    /**
    * Stack registered event
    *
    * @event "stack.stackRegistered"
    *
    * @memberof! StackService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {string} context
    */
    /**
    * Stack unregistered event
    *
    * @event "stack.stackUnregistered"
    *
    * @memberof! StackService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {string} context
    * @param {object[]} removed
    */
    /**
    * Stack frames set event
    *
    * @event "stack.stackFramesSet"
    *
    * @memberof! StackService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {string} context
    * @param {object[]} removed
    * @param {object[]} added
    */
    /**
    * Stack frames added event
    *
    * @event "stack.stackFramesAdded"
    *
    * @memberof! StackService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {string} context
    * @param {object[]} added
    */
    /**
    * Stack frames removed event
    *
    * @event "stack.stackFramesRemoved"
    *
    * @memberof! StackService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {string} context
    * @param {object[]} removed
    */
    /**
    * Stack frame selected event
    *
    * @event "stack.stackFrameSelected"
    *
    * @memberof! StackService
    * @instance
    * @type {object}
    * @param {object} frame
    * @param {string} context
    * @param {object} codepoint
    */
    this._emitter = new Emitter()
  }

  /**
   * Get the stack frames for a given context
   * @public
   * @param  {string} context [description]
   * @return {Object[]}         [description]
   */
  getStackFrames(context) {
    if (context == undefined || context == null || context.trim() == "") {
      return null
    }
    if (this.hasStackForContext(context)) {
      return this._stackFrames[context]
    }
  }

  /**
   * Alias for getStackFrames
   * @public
   * @param  {string} context [description]
   * @return {Object[]}         [description]
   */
  getStack(context) {
    return this.getStackFrames(context)
  }

  /**
   * Clear the stack frames for every context
   * @public
   */
  clearAllStackFrames() {
    for (let context in this._stackFrames) {
      this.clearStackFrames(context)
    }
  }

  /**
   * Clear the stack frames for a given context
   * @public
   * @param  {string} context [description]
   * @return {Object[]}         [description]
   * @fires "stack.stackFramesCleared"
   * @fires "stack.stackFramesChanged"
   */
  clearStackFrames (context) {
    if (context == undefined || context == null || context.trim() == "") {
      return null
    }
    if (!this.hasStackForContext(context)) {
      return null;
    }
    const previous = this._stackFrames[context].slice();
    this._stackFrames[context] = []
    const data = {
      type: "clear",
      context: context,
      removed : previous
    }
    this._emitter.emit('atom-debug-ui.stack.stackFramesCleared', data)
    this._emitter.emit('atom-debug-ui.stack.stackFramesChanged', data)
    return previous
  }

  /**
   * Register a context to have stack frames
   * @public
   * @param  {String} context [description]
   * @fires "stack.stackRegistered"
   */
  registerStack(context) {
    if (context == undefined || context == null || context.trim() == "") {
      return null
    }
    if (this.hasStackForContext(context)) {
      return
    }
    this._stackFrames[context] = []
    const data = {
      type: "register",
      context: context,
    }
    this._emitter.emit('atom-debug-ui.stack.stackRegistered', data)
  }

  /**
   * Unregister a context and clear all stack frames for the given context
   * @public
   * @param  {String} context [description]
   * @fires "stack.stackUnregistered"
   * @fires "stack.stackFramesCleared"
   * @fires "stack.stackFramesChanged"
   */
  unregisterStack(context) {
    if (context == undefined || context == null || context.trim() == "") {
      return null
    }
    if (!this.hasStackForContext(context)) {
      return
    }
    const previous = this._stackFrames[context].slice();
    delete this._stackFrames[context]
    const data = {
      type: "unregister",
      context: context,
      removed : previous
    }
    this._emitter.emit('atom-debug-ui.stack.stackUnregistered', data)
    this._emitter.emit('atom-debug-ui.stack.stackFramesCleared', data)
    this._emitter.emit('atom-debug-ui.stack.stackFramesChanged', data)
  }

  /**
   * Sets the stack for a given context
   * @public
   * @param  {String} context [description]
   * @param  {Object[]} frames  [description]
   * @fires "stack.stackFramesSet"
   * @fires "stack.stackFramesChanged"
   */
  setStack(context, frames) {
    if (context == undefined || context == null || context.trim() == "") {
      return null
    }
    if (!this.hasStackForContext(context)) {
      return null;
    }
    const previous = this._stackFrames[context].slice();
    this._stackFrames[context] = frames
    const data = {
      type: "set",
      context: context,
      removed: previous,
      added: frames
    }
    this._emitter.emit('atom-debug-ui.stack.stackFramesSet', data)
    this._emitter.emit('atom-debug-ui.stack.stackFramesChanged', data)
  }

  /**
   * Adds a single stack frame to a given context
   * @public
   * @param  {String} context [description]
   * @param  {Object} frame   [description]
   * @fires "stack.stackFrameAdded"
   * @fires "stack.stackFramesChanged"
   */
  addFrame(context, frame) {
    if (context == undefined || context == null || context.trim() == "") {
      return null
    }
    if (!this.hasStackForContext(context)) {
      return null;
    }
    this._stackFrames[context].push(frame)
    const data = {
      type: "added",
      context:context,
      added: [frame]
    }
    this._emitter.emit('atom-debug-ui.stack.stackFrameAdded', data)
    this._emitter.emit('atom-debug-ui.stack.stackFramesChanged', data)
  }

  /**
   * Removes a single stack frame from a given context
   * @public
   * @param  {String} context [description]
   * @param  {Object} item    [description]
   * @return {Object}         [description]
   * @fires "stack.stackFrameRemoved"
   * @fires "stack.stackFramesChanged"
   */
  removeFrame(context, item) {
    if (context == undefined || context == null || context.trim() == "") {
      return null
    }
    if (!this.hasStackForContext(context)) {
      return null;
    }
    const removed = helpers.arrayRemove(this._stackFrames[context], item)
    if (removed != null) {
      const data = {
        type: "removed",
        context:context,
        removed : [removed]
      }
      this._emitter.emit('atom-debug-ui.stack.stackFrameRemoved', data)
      this._emitter.emit('atom-debug-ui.stack.stackFramesChanged', data)
      return removed
    }
    return null
  }

  /**
   * Returns true if a given context has been registered
   * @public
   * @param  {String}  context [description]
   * @return {Boolean}         [description]
   */
  hasStackForContext(context) {
    if (this._stackFrames.hasOwnProperty(context)) {
      return true
    }
    return false
  }

  /**
   * User selected a specific stack frame
   * @public
   * @param  {Object} data [description]
   * @fires "stack.stackFrameSelected"
   */
  selectStackFrame(data) {
    this._emitter.emit('atom-debug-ui.stack.stackFrameSelected',data);
  }


  // Events
  /**
   * Subscribe to Stack:stackRegistered events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onStackRegistered(callback) {
    return this._emitter.on('atom-debug-ui.stack.stackRegistered', callback)
  }

  /**
   * Subscribe to Stack:stackUnregistered events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onStackUnregistered(callback) {
    return this._emitter.on('atom-debug-ui.stack.stackUnregistered', callback)
  }

  /**
   * Subscribe to Stack:stackFrameAdded events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onFrameAdded(callback) {
    return this._emitter.on('atom-debug-ui.stack.stackFrameAdded', callback)
  }

  /**
   * Subscribe to Stack:stackFrameRemoved events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onFrameRemoved(callback) {
    return this._emitter.on('atom-debug-ui.stack.stackFrameRemoved', callback)
  }

  /**
   * Subscribe to Stack:stackFramesSet events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onFramesSet(callback) {
    return this._emitter.on('atom-debug-ui.stack.stackFramesSet', callback)
  }

  /**
   * Subscribe to Stack:stackFramesChanged events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onFramesChanged(callback) {
    return this._emitter.on('atom-debug-ui.stack.stackFramesChanged', callback)
  }

  /**
   * Subscribe to Stack:stackFramesCleared events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onFramesCleared(callback) {
    return this._emitter.on('atom-debug-ui.stack.stackFramesCleared', callback)
  }

  /**
   * Subscribe to Stack:stackFrameSelected events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onFrameSelected(callback) {
    return this._emitter.on('atom-debug-ui.stack.stackFrameSelected', callback)
  }

  destroy() {
    this.clearAllStackFrames()
    delete this._stackFrames
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
