'use babel'
import {Emitter, Disposable} from 'event-kit'
import uuid from 'uuid'

export default class Watch {
  /**
   * Watch Model
   * @class Watch
   *
   * @public
   * @param  {object} props
   * @param  {string} props.id UUID
   * @param  {string} props.expression
   */
  constructor (data) {
    this._emitter = new Emitter()
    if (!data.expression)
      throw new Error("Invalid watch")
    this._id = data.id
    this._expression = data.expression.trim()
    if (data.id == undefined || data.id == null || data.id.trim() == "") {
      this._id = uuid.v4()
    }
    this._value = {}
  }
  serialize () {
    return {
      deserializer: 'Watch',
      version: Watch.version,
      data: {
        expression: this.getExpression(),
        id: this.getId()
      }
    }
  }

  static deserialize (serialized) {
    const data = serialized.data;
    return new Watch({id:data.id, expression: data.expression})
  }

  getId() {
    return this._id
  }

  getExpression() {
    return this._expression
  }

  setValue (context,value) {
    this._value[context] = value;
    this._emitter.emit('atom-debug-ui.watch.watchChanged',{watch:this,context:context})
  }

  unsetValue (context) {
    delete this._value[context]
    this._emitter.emit('atom-debug-ui.watch.watchChanged',{watch:this,context:context})
  }

  getValue (context) {
    return this._value[context]
  }

  isLessThan (other) {
    if (!(other instanceof Watch)) {
      return true
    }

    if (other.getExpression() < this.getExpression()) {
      return true;
    }
    return false;
  }

  isEqual (other) {
    if (!(other instanceof Watch)) {
      return false
    }
    if (other.getExpression() != this.getExpression()) {
      return false
    }
    return true
  }

  isGreaterThan (other) {
    if (!(other instanceof Watch)) {
      return false;
    }
    if (!this.isLessThan(other) && !this.isEqual(other)) {
      return true
    }
    return false;
  }

  // Events
  onWatchChanged(callback) {
    return this._emitter.on('atom-debug-ui.watch.watchChanged', callback)
  }
  onWatchDestroyed(callback) {
    return this._emitter.on('atom-debug-ui.watch.watchDestroyed', callback)
  }
}
Watch.version = '1a'
atom.deserializers.add(Watch)
