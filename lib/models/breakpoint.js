'use babel'
/** @jsx etch.dom */


import Codepoint from './codepoint'
import uuid from 'uuid'
import {Emitter, Disposable} from 'event-kit'

export default class Breakpoint extends Codepoint {

  /**
   * Breakpoint Model
   * @class Breakpoint
   *
   * @extends Codepoint
   * @public
   * @param  {object} props
   * @param  {string} props.id UUID
   * @param  {string} props.filePath
   * @param  {string} props.line
   * @param  {object[]} props.settings
   */
  constructor (props)  {
    super(props)
    /**
    * Breakpoint Changed
    *
    * @event "breakpoint.breakpointChanged"
    *
    * @memberof! Breakpoint
    * @instance
    * @type {object}
    * @param {Object} breakpoint
    */
    /**
    * Breakpoint Destroyed
    *
    * @event "breakpoint.breakpointDestroyed"
    *
    * @memberof! Breakpoint
    * @instance
    * @type {object}
    * @param {Object} breakpoint
    */
    this._emitter = new Emitter()
    if (props.settings != undefined && props.settings != null) {
      for (settingType in props.settings) {
        let setting = props.settings[settingType]
        if (typeof setting === "array") {
          this.setSettingValues(settingType, setting)
        } else {
          this.addSetting(settingType,setting)
        }
      }
    }
  }

  serialize () {
    return {
      deserializer: 'Breakpoint',
      version: Breakpoint.version,
      data: {
        id: this.getId(),
        filepath: this.getPath(),
        line: this.getLine(),
        settings: JSON.stringify(this.getSettings())
      }
    }
  }

  static deserialize (serialized) {
    const data = serialized.data;
    return new Breakpoint({id:data.id, filePath: data.filepath, line: data.line, settings: Breakpoint.parseSettings(data.settings)})
  }

  static parseSettings (settings) {
    let parsedSettings = JSON.parse(settings)
    /*for (let type in parsedSettings) {
        let settings = parsedSettings[type]
        for (let idx = 0; idx < settings.length; idx++) {
          parsedSettings[type][idx].id = Breakpoint.getNextBreakpointSettingId()
        }
    }*/
    return parsedSettings
  }

  /**
   * Gets all settings for the breakpoint
   * @public
   * @return {Object[]} [description]
   */
  getSettings () {
    if (!this._settings) {
      this._settings = {}
    }
    return this._settings;
  }

  /**
   * Gets the setting values for a key
   * @public
   * @param  {String} key [description]
   * @return {Object[]}     [description]
   */
  getSettingValues (key) {
    if (!this._settings) {
      this._settings = {}
      return []
    }
    if (!this._settings[key]) {
      return []
    }
    return this._settings[key];
  }

  /**
   * Gets the setting value for a key
   * @public
   * @param  {String} key [description]
   * @return {Object}     [description]
   */
  getSettingValue (key) {
    if (!this._settings) {
      this._settings = {}
      return null
    }
    if (!this._settings[key]) {
      return null
    }
    return this._settings[key].value;
  }

  /**
   * Sets the setting value for a key
   * @public
   * @param  {String} key    [description]
   * @fires "breakpoint.breakpointChanged"
   */
  setSettingValues (key,values) {
    if (!this._settings) {
      this._settings = {}
    }
    this._settings[key] = []
    for (value of values) {
      this.addSetting(key, value, "array", true)
    }
    this._emitter.emit('atom-debug-ui.breakpoint.breakpointChanged',{breakpoint:this})
  }

  /**
   * Adds a setting for a given key
   * @public
   * @param  {String} key     [description]
   * @param  {Object} value   [description]
   * @param  {String} type    array or property
   * @param  {Boolean} noEvent Do not fire an event if true
   * @fires "breakpoint.breakpointChanged"
   */
  addSetting (key,value,type,noEvent) {
    if (type == undefined || type == null) {
      type = "property"
    }
    if (value == null) {
      value = {value:null}
    }
    if (typeof value !== "object") {
      value = {value:value}
    }
    if (!this._settings) {
      this._settings = {}
    }
    if (!this._settings[key]) {
      switch (type) {
        case "array":
          this._settings[key] = []
          break;
      }
    }
    switch (type) {
      case "array":
        this._settings[key].push(value)
        break;
      case "property":
      default:
        this._settings[key] = value
    }

    if (value.id == undefined || value.id == null || value.id.trim() == "") {
      value.id =  uuid.v4()
    }
    if (noEvent == undefined || noEvent == null || noEvent === false) {
      this._emitter.emit('atom-debug-ui.breakpoint.breakpointChanged',{breakpoint:this})
    }
    return value
  }

  /**
   * Remove a setting
   * @public
   * @param  {String} setting [description]
   * @fires "breakpoint.Changed"
   */
  removeSetting (setting) {
    if (setting == undefined || setting == null) {
      return
    }
    if (this._settings == undefined || this._settings == null) {
      return
    }
    for (let key in this._settings) {
      let settings = this._settings[key];
      if (typeof settings === "array") {
        if (typeof setting === "object" && setting.id != undefined && setting.id != null) {
          for (let idx = 0; idx < settings.length; idx++) {
            if (settings[idx].id == setting.id) {
              this._settings[key].splice(idx,1)
              this._emitter.emit('atom-debug-ui.breakpoint.breakpointChanged',{breakpoint:this})
              return
            }
          }
        } else if (key == setting) {
          delete this._settings[key]
          this._emitter.emit('atom-debug-ui.breakpoint.breakpointChanged',{breakpoint:this})
          return
        }
      } else {
        if (key == setting) {
          delete this._settings[key]
          this._emitter.emit('atom-debug-ui.breakpoint.breakpointChanged',{breakpoint:this})
          return
        }
      }
    }
  }

  toString() {
    let result = "";
    if (this._filePath != undefined && this._filePath != null && this._filePath.trim() != "") {
      result += this._filePath + " "
    }
    if (this._line != undefined && this._line != null && this._line.trim() != "") {
      result += this._line + " "
    }
    return result.trim();
  }

  isLessThan (other) {
    if (!(other instanceof Breakpoint)) {
      return true
    }
    if (other.getPath() < this.getPath()) {
      return true
    }
    if (other.getLine() < this.getLine()) {
      return true
    }
    return false
  }

  isEqual (other) {
    if (!(other instanceof Breakpoint)) {
      return false
    }
    if (other.getPath() != this.getPath()) {
      return false
    }
    if (other.getLine() != this.getLine()) {
      return false
    }

    return true
  }

  isGreaterThan (other) {
    if (!(other instanceof Breakpoint)) {
      return false
    }
    return !this.isLessThan(other) && !this.isEqual(other)
  }

  destroy() {
    this._emitter.emit('atom-debug-ui.breakpoint.breakpointDestroyed',{breakpoint:this})
    this._emitter.dispose()
  }

  dispose() {
    this.destroy()
    super.dispose()
  }

  onBreakpointChanged(callback) {
    return this._emitter.on('atom-debug-ui.breakpoint.breakpointChanged', callback)
  }
  onBreakpointDestroyed(callback) {
    return this._emitter.on('atom-debug-ui.breakpoint.breakpointDestroyed', callback)
  }
}
Breakpoint.version = '1a'
atom.deserializers.add(Breakpoint);
