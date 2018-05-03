'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import UiComponent from '../ui/component'

export default class BreakpointItemView extends UiComponent {

  render () {
    const {breakpoint} = this.props;
    return <li className='breakpoint-list-item' onclick={this.handleClick}>
        <div className='breakpoint-item'>
          <span className='breakpoint-path'>{breakpoint.getPath()}</span>
          <span className='breakpoint-line'>{breakpoint.getLine()}</span>
          <span onclick={this.handleSettingsClick} className='icon settings-icon' />
          <span onclick={this.handleRemoveClick} className='icon close-icon' />
        </div>
      </li>
  }
  handleClick () {
    if (!this.props.onclick) {
      return
    }
    this.props.onclick(this.props.breakpoint);
  }
  handleRemoveClick() {
    if (!this.props.onremove) {
      return
    }
    this.props.onremove(this.props.breakpoint)
  }
  handleSettingsClick() {
    if (!this.props.onsettings) {
      return
    }
    this.props.onsettings(this.props.breakpoint)
  }
}
BreakpointItemView.bindFns = ["handleClick","handleRemoveClick","handleSettingsClick"]
