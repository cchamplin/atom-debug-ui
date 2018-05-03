'use babel'

import {Emitter, Disposable} from 'event-kit'
import BreakpointSettingsView  from '../breakpoint/breakpoint-settings-view';
import Breakpoint  from '../models/breakpoint';
import Codepoint  from '../models/codepoint';
import Marker from '../ui/marker'
import Service from './service'
import helpers from '../helpers'
export default class BreakpointsService extends Service {
  /**
  * Breakpoints Service
  * @class BreakpointsService
  *
  * @extends Service
  * @public
  * @param  {ServiceManager} services
  * @param  {Object} options Service Options
  */
  constructor(services, options) {
    super(services, options)
    this._breakpoints = []
    this._codePoints = {}
    /**
    * Breakpoints Cleared
    *
    * @event "breakpoints.breakpointsCleared"
    *
    * @memberof! BreakpointsService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {object[]} removed
    */
    /**
    * Breakpoints Changed
    *
    * @event "breakpoints.breakpointsChanged"
    *
    * @memberof! BreakpointsService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {object[]} removed
    * @param {object[]} added
    */
    /**
    * Breakpoint Added
    *
    * @event "breakpoints.breakpointAdded"
    *
    * @memberof! BreakpointsService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {object} added
    */
    /**
    * Breakpoint Removed
    *
    * @event "breakpoints.breakpointRemoved"
    *
    * @memberof! BreakpointsService
    * @instance
    * @type {object}
    * @param {string} type
    * @param {object} removed
    */
    /**
    * Breakpoint Changed
    *
    * @event "breakpoints.breakpointChanged"
    *
    * @memberof! BreakpointsService
    * @instance
    * @type {object}
    * @param {object} breakpoint
    */
    this._emitter = new Emitter()
    this.getServices().fetchService("Debugger").then((service) => {
      this._subscriptions.add(service.onBreak((event) => {
        this.getServices().getLoggerService().info("Breakpoint Triggered")
        this.doCodePoint(event.context, event.breakpoint)
      }))
      this._subscriptions.add(service.onSessionEnd((event) => {
        for (let context in this._codePoints) {
          let decoration = this._codePoints[context].decoration;
          if (decoration != undefined && decoration != null && typeof decoration.destroy === "function") {
            this._codePoints[context].decoration.destroy();
          }
          delete this._codePoints[context].decoration;
          delete this._codePoints[context]
        }
      }))
    })
  }

  /**
   * Deserialize prior breakpoint data
   * @package
   * @param  {object} state Serialized data object
   */
  deserialize(state) {
    if (state != null && state.data != undefined && state.data != null)
    {
      if (state.data.breakpoints != undefined && state.data.breakpoints != null) {
        let breakpoints = helpers.deserializeArray(state.data.breakpoints);
        for (let breakpoint of breakpoints) {
          this.addBreakpoint(breakpoint)
        }
      }
    }
  }

/**
 * Serialize current breakpoint data
 * @public
 * @return {object} Serialized state data
 */
  serialize() {
    return {
      deserializer: 'BreakpointsService',
      version: BreakpointsService.version,
      data: {
        breakpoints: helpers.serializeArray(this.getBreakpoints())
      }
    }
  }

/**
 * Highlight a line in the editor for a specific context
 * @public
 * @param  {string} context
 * @param  {Codepoint} point
 */
  doCodePoint (context, point) {
    let filepath = point.getPath();
    console.log(filepath);
    atom.workspace.open(filepath, {
      searchAllPanes: true,
      activatePane: true
    }).then( (editor) => {
      if (this._codePoints[context] != undefined && this._codePoints[context] != null) {
        let decoration = this._codePoints[context].decoration;
        if (decoration != undefined && decoration != null && typeof decoration.destroy === "function") {
          this._codePoints[context].decoration.destroy();
        }
        delete this._codePoints[context].decoration;
        delete this._codePoints[context];
      }

      let line = point.getLine();

      let range = [[line - 1, 0], [line - 1, 0]];
      let marker = editor.markBufferRange(range, {
        invalidate: 'surround'
      });

      const type = 'generic';
      let markerData = {
        type: 'line',
        "class": 'debug-break-' + type,
      }

      if (this.getServices().hasService("Decorator")) {
        markerData = this.getServices().getDecoratorService().decorate("breakpointMarker",point,markerData);
      }


      this._codePoints[context] = {point:point,decoration:editor.decorateMarker(marker, markerData)};

      editor.scrollToBufferPosition([line - 1, 0]);

      if (atom.config.get('atom-debug-ui.display.activateWindow')) {
        return atom.focus();
      }
    })
  }

  getActiveCodepoint(context) {
    if (this._codePoints[context] != undefined && this._codePoints[context] != null) {
      return this._codePoints[context].point;
    }
    return null;
  }

/**
 * Get all breakpoints in the service
 * @public
 * @return {Breakpoint[]}
 */
  getBreakpoints() {
    return this._breakpoints
  }

/**
 * Create a new breakpoint object without adding it to the service
 * @public
 * @param  {string} path
 * @param  {string} line
 * @param  {object} settings
 * @return {Breakpoint}
 */
  createBreakpoint(path, line, settings) {
    return new Breakpoint({filePath:path, line:line, settings:settings})
  }

/**
 * Create a new code point without activating it
 * @public
 * @param  {string} path
 * @param  {string} line
 * @param  {int} stackDepth
 * @return {Codepoint}
 */
  createCodepoint(path, line, stackDepth) {
    return new Codepoint({
      filePath: path,
      line: line,
      stackDepth: stackDepth
    })
  }

/**
 * Clear all breakpoints from the service
 * @public
 * @return {Breakpoint[]} Cleared breakpoints
 * @fires "breakpoints.breakpointsCleared"
 * @fires "breakpoints.breakpointsChanged"
 */
  clearBreakpoints () {
    const previous = this._breakpoints.slice();
    for (let bp of this._breakpoints) {
      if (bp != null && bp.getMarker() != undefined && bp.getMarker() != null) {
        if (typeof bp.getMarker().destroy === "function") {
          bp.getMarker().destroy()
        }
      }
    }
    this._breakpoints = []
    const data = {
      type: "clear",
      removed : previous
    }
    this._emitter.emit('atom-debug-ui.breakpoints.breakpointsCleared', data)
    this._emitter.emit('atom-debug-ui.breakpoints.breakpointsChanged', data)
    return previous
  }

/**
 * Add a breakpoint to the service
 * @public
 * @param  {Breakpoint} breakpoint
 * @fires "breakpoints.breakpointAdded"
 * @fires "breakpoints.breakpointsChanged"
 * @fires "breakpoints.breakpointChanged"
 */
  addBreakpoint(breakpoint) {
    if (breakpoint == undefined || breakpoint == null || !(breakpoint instanceof Breakpoint)) return
    const disposable = breakpoint.onBreakpointChanged((event) => {
      this._emitter.emit('atom-debug-ui.breakpoints.breakpointChanged', data)
      var clearDisposable = this.onBreakpointsCleared((clearEvent) => {
        disposable.dispose()
        removeDisposable.dispose()
        clearDisposable.dispose()
      })
      var removeDisposable = this.onBreakpointRemoved((removeEvent) => {
        if (removeEvent.removed == event.breakpoint) {
          disposable.dispose()
          removeDisposable.dispose()
          clearDisposable.dispose()
        }
      })
    })
    helpers.insertOrdered(this._breakpoints, breakpoint)
    const data = {
      type: "add",
      added: breakpoint
    }
    this._emitter.emit('atom-debug-ui.breakpoints.breakpointAdded', data)
    this._emitter.emit('atom-debug-ui.breakpoints.breakpointsChanged', data)
  }

/**
 * Remove breakpoint from service
 * Also clears any breakpoint markers currently active for breakpoint
 * @public
 * @param  {Breakpoint} item Breakpoint to be removed
 * @return {Breakpoint}      Removed breakpoint
 * @fires "breakpoints.breakpointRemoved"
 * @fires "breakpoints.breakpointsChanged"
 */
  removeBreakpoint(item) {
    if (item == undefined || item == null || !(item instanceof Breakpoint)) return null
    const removed = helpers.arrayRemove(this._breakpoints, item)
    if (removed != null) {
      if (removed != null && removed.getMarker() != undefined && removed.getMarker() != null) {
        if (typeof removed.getMarker().destroy === "function") {
          removed.getMarker().destroy()
        }
      }
      const data = {
        type: "remove",
        removed : removed
      }
      this._emitter.emit('atom-debug-ui.breakpoints.breakpointRemoved', data)
      this._emitter.emit('atom-debug-ui.breakpoints.breakpointsChanged', data)
      return removed
    }
    return null
  }

  /**
   * Show native settings ui for a breakpoint by ID
   * @public
   * @param  {string} breakpointId
   */
  showSettingsUI (breakpointId) {
    var breakpoint = null;
    if (breakpointId != undefined && breakpointId != null) {
      for (let bp of this._breakpoints) {
        if (bp.getId() === breakpointId) {
          breakpoint = bp;
          break;
        }
      }
    } else {
      let editor = atom.workspace.getActivePaneItem();
      let range = editor.getSelectedBufferRange();
      let path = editor.getPath();
      let line = range.getRows()[0] + 1;

      for (let bp of this._breakpoints) {
        if (bp.getPath() === path && bp.getLine() === line) {
          breakpoint = bp;
          break;
        }
      }
    }
    if (!breakpoint) {
      return;
    }

    this.setActiveSettingsView(new BreakpointSettingsView({
      breakpoint: breakpoint,
      context: this.GlobalContext
    }));
    return this.getActiveSettingsView().attach();
  }

/**
 * Create a marker instance for a specific line and editor
 * @package
 * @param  {string} line
 * @param  {object} editor
 * @return {object}
 */
  createBreakpointMarker (line, editor) {
    var gutter, marker, range;
    gutter = editor.gutterWithName("atom-debug-ui-gutter");
    range = [[line - 1, 0], [line - 1, 0]];
    marker = new Marker(editor, range, gutter);
    marker.decorate();
    return marker;
  }

/**
 * Toggles the breakpoint on a specific line and editor
 * creating or destroying a breakpoint
 * @public
 * @param  {string} line   [description]
 * @param  {string} editor [description]
 */
  toggleBreakpoint (line, editor) {
    if (editor == undefined || editor == null) {
      editor = atom.workspace.getActivePaneItem();
    }
    if (line == undefined || line == null) {
      if (editor == undefined || editor == null || typeof editor.getSelectedBufferRange !== "function") {
        return;
      }
      let range = editor.getSelectedBufferRange();
      line = range.getRows()[0] + 1;
    }
    if (editor == undefined || editor == null || typeof editor.getPath !== "function") {
      return;
    }
    let path = editor.getPath();
    let existingPoint = this.findBreakpoint(path,line)
    if (existingPoint != null) {
      removed = this.removeBreakpoint(existingPoint);
      return
    }
    breakpoint = new Breakpoint({
      filePath: path,
      line: line
    });
    marker = this.createBreakpointMarker(line, editor);
    breakpoint.setMarker(marker);
    this.addBreakpoint(breakpoint);
  }

/**
 * Find a breakpoint by line and file
 * @public
 * @param  {string} filePath
 * @param  {string} line
 * @return {Breakpoint}
 */
  findBreakpoint(filePath,line) {
    for (let breakpoint of this._breakpoints) {
      if (breakpoint.getPath() == filePath && breakpoint.getLine() == line) {
        return breakpoint
      }
    }
    return null
  }

/**
 * Returns an active breakpoint setting view if one exists
 * @public
 * @return {object}
 */
  getActiveSettingsView() {
    return this._activeSettingsView
  }

/**
 * Sets the active settings view fore breakpoint
 * @public
 * @param  {object} settingsView
 */
  setActiveSettingsView(settingsView) {
    this._activeSettingsView = settingsView
  }

  /**
   * Subscribe to Breakpoints:breakpointAdded events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onBreakpointAdded(callback) {
    return this._emitter.on('atom-debug-ui.breakpoints.breakpointAdded', callback)
  }
  /**
   * Subscribe to Breakpoints:breakpointRemoved events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onBreakpointRemoved(callback) {
    return this._emitter.on('atom-debug-ui.breakpoints.breakpointRemoved', callback)
  }
  /**
   * Subscribe to Breakpoints:breakpointsChanged events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onBreakpointsChanged(callback) {
    return this._emitter.on('atom-debug-ui.breakpoints.breakpointsChanged', callback)
  }
  /**
   * Subscribe to Breakpoints:breakpointChanged events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onBreakpointChanged(callback) {
    return this._emitter.on('atom-debug-ui.breakpoints.breakpointChanged', callback)
  }
  /**
   * Subscribe to Breakpoints:breakpointsCleared events
   * @public
   * @param  {Function} callback [description]
   * @return {Disposable}
   */
  onBreakpointsCleared(callback) {
    return this._emitter.on('atom-debug-ui.breakpoints.breakpointsCleared', callback)
  }

  destroy() {
    this.clearBreakpoints()
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
BreakpointsService.version = "1a";
atom.deserializers.add(BreakpointsService);
