'use babel'

import uuid from 'uuid'

export default class Codepoint {

  /**
   * Codepoint Model
   * @class Codepoint
   *
   * @public
   * @param  {object} props
   * @param  {string} props.id UUID
   * @param  {string} props.filePath
   * @param  {string} props.line
   * @param  {object} props.marker
   * @param  {int} props.stackDepth
   */
  constructor (props) {
    if (props.line != undefined && props.line != null) {
      this._line = props.line;
    } else {
      this._line = "";
    }
    this._marker = props.marker;
    this._stackDepth = props.stackDepth;
    if (props.filePath != undefined && props.filePath != null) {
      this._filePath = props.filePath;
    } else {
      this._filePath = "";
    }
    this._filePath = props.filePath;
    this._id = props.id;
    if (this._marker != undefined && this._marker != null) {
      this.syncLineFromMarker()
    }
    if (!this._stackDepth) {
      this.stackdepth = -1
    }
    if (props.id == undefined || props.id == null || props.id.trim() == "") {
      this._id = uuid.v4()
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

  getId() {
    return this._id
  }

  getPath () {
    return this._filePath
  }

  getMarker() {
    return this._marker
  }

  getStackDepth () {
    return this._stackDepth
  }

  setMarker (marker) {
    if (this._marker != undefined && this._marker != null) {
      this._marker.destroy()
    }
    this._marker = marker
  }

  syncLineFromMarker () {
    this._line = this._marker.getStartBufferPosition().row + 1
  }

  getLine () {
    if (this._marker != undefined && this._marker != null) {
      return this._marker.getStartBufferPosition().row + 1
    }
    return this._line
  }

  isLessThan (other) {
    if (!(other instanceof Codepoint)) {
      return true
    }
    if (other.getPath() < this.getPath()) {
      return true
    }
    if (other.getLine() < this.getLine()) {
      return true
    }
  }

  isEqual (other) {
    if (!(other instanceof Codepoint)) {
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
    if (!(other instanceof Codepoint)) {
      return false
    }
    return !this.isLessThan(other) && !this.isEqual(other)
  }
}
