'use babel'
/** @jsx etch.dom */

import { CompositeDisposable } from 'atom'
import etch from 'etch'
import UiComponent from '../ui/component'

import StackFrameView from './stack-frame-view';
import Codepoint from '../models/codepoint';
export default class StackView extends UiComponent {
  constructor (props,children) {
    super(props,children);
    this._services = props.services;
    this._services.fetchService("Stack").then(this.stackReady)
  }

  render () {
    const {services,context,state} = this.props;
    const frames = state.stackFrames.map((frame,index) => {
      return <StackFrameView key={index} context={context} services={services} frame={frame} onclick={this.handleFrameClick} />
    });
    if (frames.length > 0) {
      return <div className='atom-debug-ui-stack-view pane-item native-key-bindings' attributes={{style:"overflow:auto;",tabindex:'-1'}}>
                <ul className='atom-debug-ui-stacks atom-debug-ui-contents native-key-bindings'>
                {frames}
                </ul>
            </div>
    } else {
      return <div className='atom-debug-ui-stack-view pane-item native-key-bindings' attributes={{style:"overflow:auto;", tabindex:'-1'}}>
            </div>
          }
    }

  init () {
    this.props.state = { stackFrames : []};
    super.init()
  }

  stackReady() {
    this.subscriptions.add(this._services.getStackService().onFramesChanged((event) => {
      this._services.getLoggerService().debug("Got Frames!",event)
      if (event.context == this.props.context) {
        this.getStackFrames()
      }
    }))
    this.subscriptions.add(this._services.getStackService().onFramesCleared((event) => {
      if (event.context == this.props.context) {
        this.emptyStackFrames()
      }
    }))
  }

  getStackFrames() {
    if (this._services.hasService("Stack")) {
      const state = Object.assign({}, this.props.state);
      const service = this._services.getStackService();
      state.stackFrames = [];
      const frames = service.getStack(this.props.context)
      if (frames == null) {
        return
      }
      for (let stackFrame of frames) {
        if (stackFrame == undefined || stackFrame == null) {
          continue;
        }
        state.stackFrames.push(stackFrame);
      }
      this.update({state:state});
    }
  }

  emptyStackFrames () {
    const state = Object.assign({}, this.props.state);
    state.stackFrames = [];
    this.update({state:state});
  }

  handleFrameClick (item) {
    if (this._services.hasService("Stack")) {
      this._services.getStackService().selectStackFrame({
        frame: item,
        context: this.props.context,
        codepoint: new Codepoint({
          filePath: item.filepath,
          line: item.line,
          stackDepth: item.id
        })
      })
    }
  }

}
StackView.bindFns = ["handleFrameClick","getStackFrames","emptyStackFrames","stackReady"];
