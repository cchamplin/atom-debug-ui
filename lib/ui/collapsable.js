'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import UiComponent from './component'

export default class Collapsable extends UiComponent {
  render () {
    const { expanded, title } = this.props
    if (this.props.closed) {
      return <div style="display:none;" />
    }
    return <div className={'atom-debug-ui-collapsable ' + this.props.className} dataset={{ expanded }}>
      <div className='atom-debug-uig-collapsable-header panel-heading' onclick={this.handleCollapseChange}>
        <span className={'atom-debug-ui-icon icon icon-chevron-' + (expanded ? 'down' : 'right')} />
        <span className='close-icon' onclick={this.handleCloseClick} />
        {title}
      </div>
      <div className='atom-debug-ui-collapsable-body'>
        {this.children}
      </div>
    </div>
  }

  handleCollapseChange () {
    this.props.onChange(this.props.name)
  }
  handleCloseClick () {
    this.props.onClose(this.props.name)
  }
}
Collapsable.bindFns = ['handleCollapseChange','handleCloseClick']
