'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import UiComponent from '../ui/component'
import BreakpointListView from  './breakpoint-list-view'
import Editor from '../ui/editor'
import WatchpointListView from '../watchpoints/watchpoint-list-view'
import Watchpoint from '../models/watchpoint'
export default class BreakpointView extends UiComponent {

  constructor (props,children) {
    super(props,children)
    this._services = props.services;
    this.subscriptions.add(atom.commands.add(this.element, 'core:confirm', () => { this.confirmWatchpoint() }))
  }

  render () {
    const {services,context,state,showWatchpoints} = this.props;
    const breakpoints = <section className="breakpoints-view atom-debug-ui-breakpoints atom-debug-ui-contents">
      <BreakpointListView services={services} context={context} />
      </section>

    var watchpoints = []
    if (showWatchpoints) {
      watchpoints =   <section className='atom-debug-ui-watchpoints atom-debug-ui-contents section'>
          <div className='editor-container'>
            <Editor ref='editor' mini={true} placeholder="New Watch: $myVariable"/>
          </div>
          <WatchpointListView services={services} context={context} />
        </section>
    }
    let attachedViews = [];
    if (this.props.attached != undefined && this.props.attached != null && this.props.attached != "") {
      attachedViews = this.props.attached;
    }

    return <div className='atom-debug-ui-breakpoint-view pane-item'>
        {breakpoints}
        {watchpoints}
        {attachedViews}
    </div>
  }

  init() {
    if (!this.props.hasOwnProperty("showWatchpoints")) {
      this.props.showWatchpoints = false;
    }
    super.init();
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

}
BreakpointView.bindFns = ["confirmWatchpoint"];
