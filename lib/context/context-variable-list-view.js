'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import UiComponent from '../ui/component'

import ContextVariableView from './context-variable-view'
import helpers from '../helpers'

export default class ContextVariableListView extends UiComponent {

  render () {
    const {context,services,state,variableContext} = this.props;
    const path = (variableContext.parent) ? variableContext.parent + '.' + variableContext.identifer : variableContext.identifier;
    const variables = variableContext.variables.map((variable,index) => {
      return <ContextVariableView key={variable.identifier + ":" + index} services={services} context={context} variable={variable} parent={path} />
    });

    const labels = variableContext.labels.map((label,index) => {
      return <span className={label.classes}>{label.text}</span>
    });

    return <li className="context-variable-list-view">
      <details data-name="dataname">
        <summary>
          {labels}
        </summary>
        <ul>
        {variables}
        </ul>
      </details>
    </li>
  }

  init ()  {
    super.init()
  }

}
