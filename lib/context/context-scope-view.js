'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import UiComponent from '../ui/component'
import ContextVariableListView from './context-variable-list-view'

export default class ContextScopeView extends UiComponent {

  render () {
    const {state,services,context} = this.props;
    let labels = [{text:state.scope.name,classes:""}]
    if (services.hasService("Decorator")) {
      labels = services.getDecoratorService().decorate("variableLabels",{variable:state.scope}, labels)
    }
    let variables = []
    if (state.scope.data != undefined && state.scope.data != null && state.scope.data.variables != undefined && state.scope.data.variables != null) {
      variables = state.scope.data.variables
    }
    const variableContext = {
      parent: null,
      identifier: state.scope.name,
      label: state.scope.name,
      labels: labels,
      variables: variables,
      type: null
    };
    return <div className="scope-list">
      <ContextVariableListView context={context} services={services} variableContext={variableContext} />
    </div>
  }

  update (props,children) {
    this.props = Object.assign({}, this.props, props)
    this.children = children
    return etch.update(this)
  }

  init () {
    if (!this.props.state) {
      let scope = this.props.currentScope;
      if (this.props.services.hasService("Decorator")) {
        scope = this.props.services.getDecoratorService().decorate("scopeContextArraySort",scope,scope)
      }
      this.props.state = {
        scope : scope
      }
    }
    super.init()
  }

}
