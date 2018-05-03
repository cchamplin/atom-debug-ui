'use babel'
/** @jsx etch.dom */

import etch from 'etch'

import UiComponent from '../ui/component'
import ContextVariableView from '../context/context-variable-view'

export default class WatchpointItemView extends UiComponent {

  render () {
    const {services,context,state} = this.props;
    return <li className='native-key-bindings'>
      <div className='watchpoint-item'>
      <ContextVariableView services={services} context={context} variable={state.watchpointData} parent="Watchpoints" />
      <span onclick={this.removeWatchpoint} className='icon close-icon' />
      </div>
    </li>
  }

  constructor (props,children) {
    super(props,children)
    this._services = props.services
    this.watchpoint = props.watchpoint
    this.subscriptions.add(this.props.watchpoint.onWatchpointChanged((event) => {
      if (event.context == this.props.context) {
        this.updateValue(event.watchpoint.getValue(event.context));
      }
    }))
  }

  shouldUpdate(newProps) {
    if (newProps.watchpoint && newProps.watchpoint.value != undefined && newProps.watchpoint.value != null) {
      if (!this.props.state) {
        this.props.state = {}
      }
      this.props.state.watchpointData = newProps.watchpoint.value
      return true
    }
    return super.shouldUpdate(newProps)
  }

  updateValue(newValue) {
    const state = Object.assign({}, this.props.state);
    if (newValue == null || newValue == undefined) {
      state.watchpointData = {
          type : 'uninitialized',
          label : this.props.watchpoint.getExpression(),
        }
    } else {
      state.watchpointData = newValue;
    }
    this.update({state:state});
  }

  init () {
    if (!this.props.state) {
      this.props.state = {
        watchpointData : {
          type : 'uninitialized',
          label : this.props.watchpoint.getExpression()
        }
      }
    }
    super.init()
  }

  removeWatchpoint () {
    if (this._services.hasService("Watchpoints")) {
      this._services.getWatchpointsService().removeWatchpoint(this.watchpoint)
    }
  }
}
WatchpointItemView.bindFns = ["removeWatchpoint","updateValue"];
