'use babel'

import {CompositeDisposable} from 'atom'

import {Emitter} from 'event-kit'


import helpers  from './helpers'
import SubscriptionManager from './subscriptions'
import ServiceManager from './services'
import ServicesRegistry from './servicesregistry'
import LoggerService from './services/logger'

class AtomDebugUI {
  activate (state) {
    this._engines = []
    this._serviceRegistry = new ServicesRegistry()
    this._logger = new LoggerService(this,{prefix:'Atom Debug (Internal)'});
    this._subscriptions = new CompositeDisposable();
    var that = this;

    atom.contextMenu.add({'atom-text-editor': [
      {
        'label': 'Debug',
        'shouldDisplay': () => {
          return this.shouldDisplayMenuInScope()
        },
        'submenu' : [
          {
            'label' : 'Toggle Debugging',
            'command' : 'atom-debug-ui:toggleDebugging',
            'shouldDisplay': () => {
              let services = this._serviceRegistry.locateServicesForEditor()
              if (services == null) {
                return false
              }
              if (services.hasService("DebugView")) {
                const allowed = services.getDebugViewService().getOption("allowDefaultDebugger")
                if (allowed == true || allowed == "true") {
                  return true
                }
              }
              return false
            }
          },
          {
            'label' : 'Toggle Console',
            'command' : 'atom-debug-ui:toggleConsole',
            'shouldDisplay': () => {
              let services = this._serviceRegistry.locateServicesForEditor()
              if (services == null) {
                return false
              }
              if (services.hasService("DebugView")) {
                const allowed = services.getDebugViewService().getOption("allowDefaultConsole")
                if (allowed == true || allowed == "true") {
                  return true
                }
              }
              return false
            }
          },
          {
            'label' : 'Toggle Breakpoint',
            'command' : 'atom-debug-ui:toggleBreakpoint',
            'shouldDisplay': () => {
              let services = this._serviceRegistry.locateServicesForEditor()
              if (services == null) {
                return false
              }
              if (services.hasService("Breakpoints")) {
                return true
              }
              return false
            }
          },
          {
            'label' : 'Add Watch',
            'command' : 'atom-debug-ui:addWatch',
            'shouldDisplay': () => {
              let services = this._serviceRegistry.locateServicesForEditor()
              if (services == null) {
                return false
              }
              if (services.hasService("Watches")) {
                return true
              }
              return false
            }
          },
          {
            'label' : 'Add Watchpoint',
            'command' : 'atom-debug-ui:addWatchpoint',
            'shouldDisplay': () => {
              let services = this._serviceRegistry.locateServicesForEditor()
              if (services == null) {
                return false
              }
              if (services.hasService("Watchpoints")) {
                return true
              }
              return false
            }
          }
        ]
      }
    ]});


    this._subscriptions.add(atom.config.observe("atom-debug-ui.gutters.gutterBreakpointToggle", (newValue) => {
      const serviceManagers = this._serviceRegistry.getAllServices()
      for (let serviceManager of serviceManagers) {
        if (serviceManager.hasService("DebugView")) {
          serviceManager.getDebugViewService().createGutters(newValue)
        }
      }
    }));

    this._subscriptions.add(atom.config.observe("atom-debug-ui.gutters.gutterPosition", (newValue) => {
      const serviceManagers = this._serviceRegistry.getAllServices()
      for (let serviceManager of serviceManagers) {
        if (serviceManager.hasService("DebugView")) {
          serviceManager.getDebugViewService().createGutters(atom.config.get('atom-debug-ui.gutters.gutterBreakpointToggle'),true)
        }
      }
    }));

    this._subscriptions.add(atom.workspace.observeTextEditors((editor) => {
      if (atom.config.get('atom-debug-ui.gutters.gutterBreakpointToggle')) {
        const serviceManagers = this._serviceRegistry.getAllServices()
        for (let serviceManager of serviceManagers) {
          if (serviceManager.hasService("DebugView")) {
            serviceManager.getDebugViewService().createGutter(editor)
          }
        }
      }
    }));
  }

  shouldDisplayMenuInScope() {
    let services = this._serviceRegistry.locateServicesForEditor()
    if (services == null)
      return false
    return true
  }


  provideDebugUIService() {
    const sm = new ServiceManager()
    this._serviceRegistry.addServiceManager(sm)
    return sm;
  }

  consumeDebugEngine (engine) {
    this._serviceRegistry.addDebugEngine(engine)
  }


  deactivate () {
    try {
      this._serviceRegistry.destroy()
      this._subscriptions.dispose();
    } catch (err) {
      console.error(err);
      throw err
    }
  }
};

module.exports = new AtomDebugUI()
