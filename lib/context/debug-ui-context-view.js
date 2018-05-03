'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import UiComponent from '../ui/component'
import ContextScopeView from './context-scope-view'

export default class ContextView extends UiComponent {
  constructor (props,children) {
    super(props,children)
    this._services = props.services;
    this._services.fetchService("Scope").then(this.scopeReady)
  }
  render () {
    const {services, context, state} = this.props;
    let scopes = []
    if (state.scopes != undefined && state.scopes != null) {
      scopes = Object.keys(state.scopes).map((key,index) => {
        var scope = state.scopes[key];
        return <ContextScopeView ref={'contextScope' + scope.scopeId} key={scope.scopeId} services={services} context={context} currentScope={scope} />
      });
    }
    return <div className='atom-debug-ui-context-view pane-item native-key-bindings' attributes={{"tabindex":"-1","style":"overflow:auto;"}}>
      <div className='atom-debug-ui-contexts atom-debug-ui-contents native-key-bindings' attributes={{"tabindex":"-1"}}>
        {scopes}
      </div>
    </div>
  }

  init () {
    if (!this.props.state) {
      this.props.state = {
        scopes : {}
      };
    }
    super.init()
  }

  scopeReady() {
    this.subscriptions.add(this._services.getScopeService().onScopesCleared((event) => {
      if (event.context == this.props.context) {
        this.clearScopes()
      }
    }))
    this.subscriptions.add(this._services.getScopeService().onScopesChanged((event) => {
      if (event.context == this.props.context) {
        this.updateContext()
      }
    }))
    this.subscriptions.add(this._services.getScopeService().onScopeDataSet((event) => {
      if (event.context == this.props.context) {
        this.updateContext(event.scopeId)
      }
    }))
    updateContext();
  }

  update (props, children) {
    this.props = Object.assign({}, this.props, props)
    this.children = children
    return etch.update(this)
  }

  updateContext (scopeId) {
    if (this._services.hasService("Scope")) {
      const state = Object.assign({}, this.props.state);
      if (scopeId != undefined && scopeId != null) {
        const scope = this._services.getScopeService().getScope(this.props.context,scopeId)
        state.scopes[scopeId] = scope
      } else {
        const debugContexts = this._services.getScopeService().getScopesForContext(this.props.context)
        state.scopes = debugContexts;
      }

      this.update({state:state});
    }
  }

  clearScopes () {
    const state = Object.assign({}, this.props.state);
    state.scopes = {}
    this.update({state:state});
  }

}
ContextView.bindFns = ["updateContext","clearScopes","scopeReady"];
