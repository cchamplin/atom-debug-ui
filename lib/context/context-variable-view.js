'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import UiComponent from '../ui/component'
import ContextVariableListView from "./context-variable-list-view"
import helpers from '../helpers'

export default class ContextVariableView extends UiComponent {

  render() {
    const {context,services,state,variable} = this.props;
    let renderedVariable = null;
    if (services.hasService("Decorator")) {
      renderedVariable = services.getDecoratorService().decorate("variableRenderer",{variable:variable, parent:this.props.parent}, renderedVariable)
    }
    if (renderedVariable == null) {
      switch (variable.type) {
        case 'string':
        case 'numeric':
        case 'bool':
        case 'uninitialized':
        case 'error':
        case 'null':
        case 'resource':
          renderedVariable = this.renderScalar(variable)
          break;
        case 'array':
        case 'object':
          renderedVariable = this.renderComplex(variable)
          break;
        default:
          console.error("Unhandled variable type" + variable.type);
      }
    }
    return <li className='native-key-bindings' attributes={{"tabindex":"-1"}}>
      <div className='native-key-bindings' attributes={{"tabindex":"-1"}}>
      {renderedVariable}
      </div>
    </li>
  }

  renderComplex(variable) {
    let labels = [{text:variable.label,classes:''}]
    if (this.props.services.hasService("Decorator")) {
      labels = this.props.services.getDecoratorService().decorate("variableLabels",{variable:variable,parent:this.props.parent}, labels)
    }
    let variableContext = {
      parent: this.props.parent,
      identifier: variable.label,
      labels: labels,
      variables: variable.value,
      type: variable.type,
    }
    return <ContextVariableListView variableContext={variableContext} context={this.props.context} services={this.props.services} />
  }

  renderScalar (variable) {
    let labels = [{text:variable.label,classes:''}]
    if (this.props.services.hasService("Decorator")) {
      labels = this.props.services.getDecoratorService().decorate("variableLabels",{variable:variable,parent:this.props.parent}, labels)
    }
    const labelElements = labels.map((label,index) => {
      return <span className={label.classes}>{label.text}</span>
    });
    return <div>{labelElements}</div>
  }
}
