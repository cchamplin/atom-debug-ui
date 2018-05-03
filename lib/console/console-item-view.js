'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import UiComponent from '../ui/component'

export default class ConsoleItemView extends UiComponent {
  render () {
    const {line} = this.props;
    return <li className='console-item native-key-bindings'>
      <div className='console-item-text native-key-bindings'>
        <span className='line native-key-bindings'>{line}</span>
      </div>
    </li>
  }
}
