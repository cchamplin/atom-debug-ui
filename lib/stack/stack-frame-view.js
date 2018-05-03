'use babel'
/** @jsx etch.dom */

import { CompositeDisposable } from 'atom'
import etch from 'etch'
import UiComponent from '../ui/component'
import {remotePathToLocal} from '../helpers'

export default class StackFrameView extends UiComponent {

render () {
    const {frame,context,services} = this.props;
    var highlight = "stack-frame";
    if ((frame.active == true || frame.level != undefined && frame.level != null && frame.level == 0) && services.hasService("Breakpoints")) {
      let codepoint = services.getBreakpointsService().getActiveCodepoint(context);
      if (codepoint != null && typeof codepoint.getSettingValue === "function") {
        let type = codepoint.getSettingValue("type");
        if (type == "error" || type == "exception") {
          highlight += " stack-frame-" + type;
        }
      }
    }
    return <li className={highlight} onclick={this.handleClick}>
        <div className='stack-frame-level text-info inline-block-tight' attributes={{'data-level':frame.id}}> {frame.id}</div>
        <div className='stack-frame-label text-info inline-block-tight'>{frame.label}</div>
        <div className='stack-frame-filepath text-smaller inline-block-tight' attributes={{'data-path':frame.filepath}}>{frame.filepath}</div>
        <div className='stack-frame-line text-smaller inline-block-tight' attributes={{'data-line':frame.line}}>{'(' + frame.line + ')'}</div>
      </li>
  }
  handleClick () {
    this.props.onclick(this.props.frame);
  }
}
StackFrameView.bindFns = ["handleClick"];
