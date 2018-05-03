'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import UiComponent from '../ui/component'
import Editor from '../ui/editor'

export default class BreakpointSettingsConditionView extends UiComponent {

  render () {
    const {setting} = this.props;
    const text = setting.value
    return <div className='breakpoint-setting setting-condition setting-existing'>
        <span className='setting-label'>Condition:</span>
        <div className='setting-container'>
          <Editor ref="editor" mini={true} on={{didChange:this.handleDidChange}}>{text}</Editor>
          <span className='setting-action setting-remove setting-condition-remove' onclick={this.handleRemoveClick}>Remove</span>
        </div>
      </div>
  }
  handleRemoveClick () {
    if (this.props.onRemoveCondition) {
      this.props.onRemoveCondition(this.props.key);
    }
  }

  handleDidChange (event) {
    if (this.props.didChange) {
      if (this.props.setting.value != this.refs.editor.getText()) {
        this.props.didChange(this.props.key,this.refs.editor.getText());
      }
    }
  }

}
BreakpointSettingsConditionView.bindFns = ["handleRemoveClick","handleDidChange"]
