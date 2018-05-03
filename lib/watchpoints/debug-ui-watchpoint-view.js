'use babel'
/** @jsx etch.dom */

import etch from 'etch'

import UiComponent from '../ui/component'
import Editor from '../ui/editor'
import WatchpointListView from './watchpoint-list-view'

export default class WatchpointsView extends UiComponent {
  render () {
    const {services,context,state} = this.props;
    return <div className='atom-debug-ui-watchpoint-view pane-item' style="overflow:auto;">
      <section className='atom-debug-ui-watchpoints atom-debug-ui-contents section'>
        <div className='editor-container'>
          <Editor ref='editor' mini={true} placeholder="New Watch: $myVariable"/>
        </div>
        <WatchpointListView services={services} context={context} />
      </section>
    </div>
  }


  constructor (props,children) {
    super(props,children)
    this._services = props.services
    this.subscriptions.add(atom.commands.add(this.element, 'core:confirm', () => { this.confirmWatchpoint() }))
  }

  confirmWatchpoint() {
    const expression = this.refs.editor.getText()
    if (expression != null && expression.trim() != "") {
      if (this._services.hasService("Watchpoints")) {
        const watchpoint = new Watchpoint({expression:expression.trim()})
        this._services.getWatchpointsService().addWatchpoint(watchpoint)
      }
      this.refs.editor.setText('')
    }
  }

  init () {
    super.init()
  }


}
WatchpointsView.bindFns = ["confirmWatchpoint"];
