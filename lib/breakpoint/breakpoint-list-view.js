'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import UiComponent from '../ui/component'
import BreakpointItemView from './breakpoint-item-view'
import helpers from '../helpers'

export default class BreakpointListView extends UiComponent {

  constructor (props,children) {
    super(props,children)
    this._services = props.services;
    this._services.fetchService("Breakpoints").then(this.breakpointsReady)
  }

  render () {
    const {services,context,state} = this.props;
    const breakpointComponents = state.breakpoints.map((breakpoint,index) => {
      return <BreakpointItemView key={breakpoint.getId()} context={context} services={services} breakpoint={breakpoint} onsettings={this.handleSettings} onremove={this.handleRemove} onclick={this.handleBreakpointClick} />
    });
    return <ul className="breakpoint-list-view native-key-bindings" attributes={{"tabindex":"-1"}}>
        {breakpointComponents}
      </ul>
  }

  breakpointsReady() {
    this.subscriptions.add(this._services.getBreakpointsService().onBreakpointsChanged(() => {
      this.updateBreakpoints()
    }))
    this.updateBreakpoints()
  }

  init () {
    if (!this.props.state) {
      this.props.state = {
        breakpoints: []
      };
    }
    super.init();
  }
  updateBreakpoints () {
    if (this._services.hasService("Breakpoints")) {
      const state = Object.assign({}, this.props.state);
      const contextBreakpoints = this._services.getBreakpointsService().getBreakpoints();
      state.breakpoints = contextBreakpoints;
      this.update({state:state});
    }
  }

  handleRemove(breakpoint) {
    this._services.getBreakpointsService().removeBreakpoint(breakpoint)
  }

  handleSettings(breakpoint) {
    this._services.getBreakpointsService().showSettingsUI(breakpoint.getId())
  }


  handleBreakpointClick(breakpoint) {
    const filepath = breakpoint.getPath()
    const line = breakpoint.getLine();
    atom.workspace.open(filepath,{searchAllPanes: true, activatePane:true}).then((editor) => {
      range = [[line-1, 0], [line-1, 0]];
      editor.scrollToBufferPosition([line-1,0]);
      editor.setCursorScreenPosition([line-1,0]);
    });
  }
}
BreakpointListView.bindFns = ["handleBreakpointClick","updateBreakpoints","breakpointsReady","handleRemove","handleSettings"]
