'use babel'
import {CompositeDisposable} from 'atom'
import autoBind from 'auto-bind-inheritance'

export default class SubscriptionManager {
  constructor(services) {
    autoBind(this)
    this._services = services;
    this._subscriptions = new CompositeDisposable();
    this._subscriptions.add(this._services.onServiceRegistered(this.serviceRegistered))

  }

  serviceRegistered(event) {
    if (event.name == 'Watchpoints') {
      this.activateWatchpointSubscriptions()
    }
    if (event.name == 'Watches') {
      this.activateWatchesSubscriptions()
    }
    if (event.name == 'Breakpoints') {
      this.activateBreakpointSubscriptions()
    }
    if (event.name == 'DebugView') {
      this.activateDebugViewSubscriptions()
    }
    if (event.name == "Console") {
      this.activateConsoleSubscriptions()
    }

  }

  activateBreakpointSubscriptions() {
    this._subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-debug-ui:toggleBreakpoint': (event) => {
          if (!this._services.hasService('Debugger')) {
            return
          }
          if (this._services.getScopeResolverService().editorInValidScope()) {
            this._services.getBreakpointsService().toggleBreakpoint()
          }
        }
      }
    ));
    this._subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-debug-ui:breakpointSettings': (event) => {
          if (!this._services.hasService('Debugger')) {
            return
          }
          if (this._services.getScopeResolverService().editorInValidScope()) {
            this._services.getBreakpointsService().showSettingsUI()
          }
        }
      }
    ));
    this._subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-debug-ui:clearAllBreakpoints': (event) => {
          if (!this._services.hasService('Debugger')) {
            return
          }
          if (this._services.getScopeResolverService().editorInValidScope()) {
            this._services.getBreakpointsService().clearBreakpoints()
          }
        }
      }
    ));
  }

  activateWatchpointSubscriptions() {
    this._subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-debug-ui:addWatchpoint': (event) => {
          if (!this._services.hasService('Debugger')) {
            return
          }
          if (this._services.getScopeResolverService().editorInValidScope()) {
            this._services.getWatchpointsService().createWatchpointFromSelection()
          }
        }
      }
    ));

    this._subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-debug-ui:clearAllWatchpoints': (event) => {
          if (!this._services.hasService('Debugger')) {
            return
          }
          if (this._services.getScopeResolverService().editorInValidScope()) {
            this._services.getWatchpointsService().clearWatchpoints()
          }
        }
      }
    ));
  }

  activateWatchesSubscriptions() {
    this._subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-debug-ui:addWatch': (event) => {
          if (!this._services.hasService('Debugger')) {
            return
          }
          if (this._services.getScopeResolverService().editorInValidScope()) {
            this._services.getWatchesService().createWatchFromSelection()
          }
        }
      }
    ));

    this._subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-debug-ui:clearAllWatches': (event) => {
          if (!this._services.hasService('Debugger')) {
            return
          }
          if (this._services.getScopeResolverService().editorInValidScope()) {
            this._services.getWatchesService().clearWatches()
          }
        }
      }
    ));
  }

  activateDebugViewSubscriptions() {
    this._subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-debug-ui:toggleDebugging': (event) => {
          if (!this._services.hasService('Debugger')) {
            return
          }
          if (this._services.getScopeResolverService().editorInValidScope()) {
            this._services.getDebugViewService().requestDebugger(event)
          }
        }
      }
    ));
    this._subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-debug-ui:toggleConsole': (event) => {
          if (!this._services.hasService('Debugger')) {
            return
          }
          if (this._services.getScopeResolverService().editorInValidScope()) {
            this._services.getDebugViewService().requestConsole(event)
          }
        }
      }
    ));
  }

  activateConsoleSubscriptions() {
    this._subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-debug-ui:navigatePreviousConsoleCommand': (event) => {
          const paneItem = atom.workspace.getActivePaneItem()
          if (typeof paneItem.getURI !== "function") {
            return
          }
          const uri = paneItem.getURI();
          if (this._services.getDebugViewService().hasView(uri)) {
            const view = this._services.getDebugViewService().getView(uri).view
            const context = view.getContext()
            this._services.getConsoleService().previousConsoleCommand(context)
          }
        }
      }
    ));
    this._subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-debug-ui:navigateNextConsoleCommand': (event) => {
          const paneItem = atom.workspace.getActivePaneItem()
          if (typeof paneItem.getURI !== "function") {
            return
          }
          const uri = paneItem.getURI();
          if (this._services.getDebugViewervice().hasView(uri)) {
            const view = this._services.getDebugViewService().getView(uri).view
            const context = view.getContext()
            this._services.getConsoleService().nextConsoleCommand(context)
          }
        }
      }
    ));
  }

  destroy() {
    this._subscriptions.dispose()
  }
  dispose() {
    this.destroy()
  }
}
