'use babel'

import {Emitter, Disposable} from 'event-kit'
import Service from './service'

export default class ConsoleService extends Service {
  /**
  * Console Service
  * @class ConsoleService
  *
  * @extends Service
  * @public
  * @param  {ServiceManager} services
  * @param  {Object} options Service Options
  */
  constructor(services,options) {
    super(services,options)
    this._messages = {}
    this._commandHistory = {}
    /**
    * Next command in console activated
    *
    * @event "console.nextCommand"
    *
    * @memberof! ConsoleService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {string} context
    * @param {string} expression
    */
    /**
    * Previous command in console activated
    *
    * @event "console.previousCommand"
    *
    * @memberof! ConsoleService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {string} context
    * @param {string} expression
    */
    /**
    * User is attempting to execute an expression
    *
    * @event "console.executeExpression"
    *
    * @memberof! ConsoleService
    * @instance
    * @type {object}
    * @param {string} context
    * @param {string} expression
    */
    /**
    * A message was added to the console
    *
    * @event "console.messageAdded"
    *
    * @memberof! ConsoleService
    * @instance
    * @type {object}
    * @param {int} total
    * @param {string} context
    * @param {string} message
    */
    /**
    * All messages in the console were cleared
    *
    * @event "console.messagesCleared"
    *
    * @memberof! ConsoleService
    * @instance
    * @type {object}
    * @param {string} context
    */
    this._emitter = new Emitter()
  }

/**
 * Return messages after a specific index for a specific context
 * @public
 * @param  {string} context
 * @param  {int} index
 * @return {object}
 */
  getMessages(context, index) {
    if (!this._messages.hasOwnProperty(context)) {
      return {total:0,lines:[]}
    }
    if (index == undefined || index == null) {
      index = 0
    }
    return {
      total: this._messages[context].length,
      lines: this._messages[context].slice(index)
    }
  }

/**
 * Scroll to next console command in history
 * @public
 * @param  {string} context
 * @fires "console.nextCommand"
 */
  nextConsoleCommand(context) {
    if (!this._commandHistory.hasOwnProperty(context)) {
      return
    }
    if (this._commandHistory[context].commandStack.length == 0) {
      return
    }
    let len = this._commandHistory[context].commandStack.length;
    if (this._commandHistory[context].currentIndex < len) {
      this._commandHistory[context].currentIndex += 1
    }
    if (this._commandHistory[context].currentIndex < len) {
      this._emitter.emit('atom-debug-ui.console.nextCommand', {type:"next", context:context, expression:this._commandHistory[context].commandStack[this._commandHistory[context].currentIndex]})
    } else {
      this._emitter.emit('atom-debug-ui.console.nextCommand', {type:"next", context:context, expression:""})
    }
  }

/**
 * Scroll to previous console command in history
 * @public
 * @param  {string} context
 * @fires "console.previousCommand"
 */
  previousConsoleCommand(context) {
    if (!this._commandHistory.hasOwnProperty(context)) {
      return
    }
    let len = this._commandHistory[context].commandStack.length;
    if (this._commandHistory[context].currentIndex > 0) {
      this._commandHistory[context].currentIndex -= 1
      this._emitter.emit('atom-debug-ui.console.previousCommand', {type:"previous", context:context, expression:this._commandHistory[context].commandStack[this._commandHistory[context].currentIndex]})
    }
  }

/**
 * Attempt to execute a console command
 * @public
 * @param  {string} context
 * @param  {string} expression
 * @fires "console.executeExpression"
 */
  executeExpression(context,expression) {
    if (!this._commandHistory.hasOwnProperty(context)) {
      this._commandHistory[context] = {
        currentIndex : 1,
        commandStack : [expression]
      }
    } else {
      this._commandHistory[context].commandStack.push(expression)
      if (  this._commandHistory[context].commandStack.length > 20) {
        this._commandHistory[context].commandStack.shift()
      }
      this._commandHistory[context].currentIndex = this._commandHistory[context].commandStack.length
    }
    this.addMessage(context,">" + expression);
    this._emitter.emit('atom-debug-ui.console.executeExpression', {context:context, expression:expression})
  }

/**
 * Add a message to the console
 * @public
 * @param  {string} context
 * @param  {string} message
 * @fires "console.messageAdded"
 */
  addMessage(context, message) {
    if (!this._messages.hasOwnProperty(context)) {
      this._messages[context] = [message]
    } else {
      this._messages[context].push(message)
    }
    this._emitter.emit('atom-debug-ui.console.messageAdded', {context:context, total:this._messages[context].length, message:message})
  }

/**
 * Register a context for the console
 * @public
 * @param  {string} context
 */
  registerContext(context) {
    this._messages[context] = []
  }

/**
 * Remove a registered context
 * @public
 * @param  {string} context
 */
  unregisterContext(context) {
    delete this._messages[context]
  }

/**
 * Adds a message to all registered contexts
 * @public
 * @param  {string} message
 */
  broadcastMessage(message) {
    for (let context in this._messages) {
      this.addMessage(context,message)
    }
  }

/**
 * Clear all console messages for a specific context
 * @public
 * @param  {string} context
 * @fires "console.messagesCleared"
 */
  clearMessages(context) {
    if (!this._messages.hasOwnProperty(context)) {
      return
    }
    this._messages[context] = []
    this._emitter.emit('atom-debug-ui.console.messagesCleared', {context:context})
  }

  /**
   * Subscribe to Console:executeExpression events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onExecuteExpression(callback) {
    return this._emitter.on('atom-debug-ui.console.executeExpression', callback)
  }
  /**
   * Subscribe to Console:previousCommand events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onPreviousCommand(callback) {
    return this._emitter.on('atom-debug-ui.console.previousCommand', callback)
  }
  /**
   * Subscribe to Console:messageAdded events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onMessageAdded(callback) {
    return this._emitter.on('atom-debug-ui.console.messageAdded', callback)
  }
  /**
   * Subscribe to Console:messagesCleared events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onMessagesCleared(callback) {
    return this._emitter.on('atom-debug-ui.console.messagesCleared', callback)
  }
  /**
   * Subscribe to Console:nextCommand events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onNextCommand(callback) {
    return this._emitter.on('atom-debug-ui.console.nextCommand', callback)
  }

  destroy() {
    for (let context in this._messages) {
      this.clearMessages(context)
    }
    delete this._messages
    delete this._commandHistory
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
