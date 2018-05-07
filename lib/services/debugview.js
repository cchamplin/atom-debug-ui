'use babel'
import Service from './service'
import {Emitter, Disposable} from 'event-kit'
import Promise from 'promise'
import DebugContextViewService from './debugcontextview'
import OverlayBar from '../actions/overlay-bar'
export default class DebugViewService extends Service {
  constructor(services,options) {
    super(services,options)
    this._contexts = {}
    this._registeredViews = {}
    this._actionBar = null
    this._emitter = new Emitter()
    this.getServices().fetchService("DebugView").then(() => {
      if (atom.config.get('atom-debug-ui.gutters.gutterBreakpointToggle')) {
        this.createGutters(true)
      }
    })
  }

  registerView(context,uri,view) {
    this._registeredViews[uri] = { context:context, view:view }
  }

  hasView(uri) {
    return this._registeredViews.hasOwnProperty(uri)
  }

  getView(uri) {
    return this._registeredViews[uri]
  }

  unregisterView(uri) {
    delete this._registeredViews[uri]
  }

  createContext(name, additionalOptions) {
    return new Promise((fulfill,reject) => {
      this.getServices().getLoggerService().debug("Creating new View Context", name)
      if (this.hasContext(name)) {
        fulfill(this._contexts[name])
        return;
      }
      const options = Object.assign({}, this._options, additionalOptions);
      options["context"] = name
      this.getServices().registerService('DebugContextView_'+name, new DebugContextViewService(this.getServices(),options), (service,serviceOptions) => {
        this.getServices().getLoggerService().debug("View Context Created", name)
        this.getServices().fetchService("Debugger").then((debugService) => {
          if (options.hasOwnProperty('allowActionBar') && serviceOptions.allowActionBar) {
            this.bindActionBarEvents(debugService,name)
          }
          this._subscriptions.add(debugService.onSessionEnd((event) => {
            if (event.context == name) {
              if (atom.config.get("atom-debug-ui.display.autoCloseEndedSessions")) {
                if (options.hasOwnProperty("allowAutoClose") && serviceOptions.allowAutoClose) {
                  this.getServices().unregisterService('DebugContextView_'+name)
                  service.destroy()
                  delete this._contexts[name]
                  this._emitter.emit('atom-debug-ui.debugview.contextDestroyed',{context:name})
                }
              }
            }
          }))
        }).catch( (err) => {
          console.error(err)
        })
        this.contextCreated(service,options)
        fulfill(service)
      });
    });
  }

  bindActionBarEvents(debugService,name) {
    this._subscriptions.add(debugService.onSessionStart((event) => {
      if (event.context == name) {
        if (atom.config.get('atom-debug-ui.display.enableActionBar')) {
          if (this._actionBar != undefined && this._actionBar != null) {
            this._actionBar.destroy()
          }
          this._actionBar = new OverlayBar({context:name,services:this.getServices()})
          this._actionBar.attach()
        }
      }

    }))
    this._subscriptions.add(debugService.onSessionEnd((event) => {
      if (event.context == name) {
        if (this._actionBar != undefined && this._actionBar != null) {
          this._actionBar.destroy()
          delete this._actionBar
        }
      }
    }))
  }

  removeContext(name) {
    if (this.hasContext(name)) {
      let service = this._contexts[name];
      service.destroy();
      delete this._contexts[name];
      this._emitter.emit('atom-debug-ui.debugview.contextDestroyed',{context:name});
    }
  }

  contextCreated(service,options) {
    this._contexts[service.getOption("context")] = service;
    this._emitter.emit('atom-debug-ui.debugview.contextCreated',{context:service.getOption("context"),service:service})
  }

  requestDebugger() {
    if (this.getOption("allowDefaultDebugger")) {
      this._emitter.emit('atom-debug-ui.debugview.defaultDebuggerRequested')
    }
  }

  requestConsole() {
    if (this.getOption("allowDefaultConsole")) {
      this._emitter.emit('atom-debug-ui.debugview.defaultConsoleRequested')
    }
  }

  hasContext(name) {
    if (this._contexts.hasOwnProperty(name)) {
      return true
    }
  }

  createGutters (create, recreate) {
    editors = atom.workspace.getTextEditors();
    for (let i = 0, len = editors.length; i < len; i++) {
      let editor = editors[i];
      if (editor == undefined || editor == null || typeof editor.gutterWithName !== "function") {
        continue
      }

      if (!this.getServices().hasService("ScopeResolver") || !this.getServices().getScopeResolverService().validForScope(editor.getGrammar().scopeName)) {
        continue;
      }
      if (create === false) {
        if (editor.gutterWithName('atom-debug-ui-gutter') !== null) {
          let gutter = editor.gutterWithName('atom-debug-ui-gutter');
          if (gutter != null) {
            if (typeof gutter.destroy === "function") {
              gutter.destroy();
            }
          }
        }
      } else {
        if (recreate) {
          if (editor.gutterWithName('atom-debug-ui-gutter') !== null) {
            let gutter = editor.gutterWithName('atom-debug-ui-gutter');
            if (gutter != null) {
              if (typeof gutter.destroy === "function") {
                gutter.destroy();
              }
            }
          }
        }
        if (editor.gutterWithName('atom-debug-ui-gutter') === null) {
          this.createGutter(editor);
        }
      }
    }
  }

  createGutter (editor) {
    if (editor == undefined || editor == null) {
      editor = atom.workspace.getActivePaneItem();
    }
    if (editor == undefined || editor == null || typeof editor.gutterWithName !== "function" || typeof editor.getGrammar !== "function") {
      return;
    }
    const gutterEnabled = atom.config.get('atom-debug-ui.gutters.gutterBreakpointToggle');
    if (!gutterEnabled) {
      return;
    }
    if (!this.getServices().hasService("ScopeResolver") || !this.getServices().getScopeResolverService().validForScope(editor.getGrammar().scopeName)) {
      return
    }
    const gutterPosition = atom.config.get('atom-debug-ui.gutters.gutterPosition');
    var priority = 200
    if (gutterPosition === "Left") {
      priority = -200;
    }
    var gutter = null
    if (editor.gutterWithName('atom-debug-ui-gutter') !== null) {
      return;
    } else {
      gutter = editor.gutterContainer.addGutter({
        name: 'atom-debug-ui-gutter',
        priority: priority
      })
    }
    const view = atom.views.getView(editor);
    const domNode = atom.views.getView(gutter);
    domNode.removeEventListener('click', this.handleGutterClick);
    domNode.addEventListener('click', this.handleGutterClick);

    if (gutter != null) {
      if (this.getServices().hasService("Breakpoints")) {
        const breakPoints = this.getServices().getBreakpointsService().getBreakpoints()
        for (let breakpoint of breakPoints) {

          if (breakpoint.getPath() === editor.getPath()) {
            breakpoint.setMarker(null);
            let marker = this.getServices().getBreakpointsService().createBreakpointMarker(breakpoint.getLine(), editor);
            breakpoint.setMarker(marker);
          }
        }
      }
    }
  }

  handleGutterClick(event) {
    editor = atom.workspace.getActivePaneItem();
    if (editor == undefined || editor == null) {
      return
    }
    const view = atom.views.getView(editor);
    let clickedScreenRow = view.component.screenPositionForMouseEvent(event).row;
    let clickedBufferRow = editor.bufferRowForScreenRow(clickedScreenRow) + 1;
    if (this.getServices().hasService('Breakpoints')) {
      this.getServices().getBreakpointsService().toggleBreakpoint(clickedBufferRow);
    }
  }

  getContext(name) {
    return this._contexts[name]
  }

  onContextCreated(callback) {
    return this._emitter.on('atom-debug-ui.debugview.contextCreated',callback)
  }
  onContextDestroyed(callback) {
    return this._emitter.on('atom-debug-ui.debugview.contextDestroyed',callback)
  }
  onDefaultDebuggerRequested(callback) {
    return this._emitter.on('atom-debug-ui.debugview.defaultDebuggerRequested',callback)
  }
  onDefaultConsoleRequested(callback) {
    return this._emitter.on('atom-debug-ui.debugview.defaultConsoleRequested',callback)
  }

  destroy() {
    for (let view in this._registeredViews) {
      if (this._registeredViews[view].view != undefined && this._registeredViews[view].view != null && typeof this._registeredViews[view].view.destroy === "function") {
        this._registeredViews[view].view.destroy()
      }
    }
    if (this._actionBar != undefined && this._actionBar != null) {
      this._actionBar.destroy()
      delete this._actionBar
    }
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
