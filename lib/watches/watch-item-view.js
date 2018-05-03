'use babel'
/** @jsx etch.dom */

import etch from 'etch'

import UiComponent from '../ui/component'
import ContextVariableView from '../context/context-variable-view'

export default class WatchItemView extends UiComponent {

  render () {
    const {services,context,state} = this.props;
    return <li className='native-key-bindings' attributes={{"tabindex":"-1"}}>
      <div className='watch-item'>
        <ContextVariableView services={services} context={context} variable={state.watchData} parent="Watches" />
        <span onclick={this.removeWatch} className='icon close-icon' />
      </div>
    </li>
  }

  constructor (props,children) {
    super(props,children)
    this._services = props.services
    this.watch = props.watch
    this.autoopen = props.autoopen
    this.subscriptions.add(this.props.watch.onWatchChanged((event) => {
      if (event.context == this.props.context) {
        this.updateValue(event.watch.getValue(event.context));
      }
    }))
  }

  shouldUpdate(newProps) {
    if (newProps.watch && newProps.watch.getValue(this.props.context) != undefined && newProps.watch.getValue(this.props.context) != null) {
      if (!this.props.state) {
        this.props.state = {}
      }
      this.props.state.watchData = newProps.watch.getValue(this.props.context)
      return true
    }
    return super.shouldUpdate(newProps)
  }

  updateValue(newValue) {
    const state = Object.assign({}, this.props.state);
    if (newValue == null || newValue == undefined) {
      state.watchData = {
          type : 'uninitialized',
          label : this.props.watch.getExpression(),
        }
    } else {
      state.watchData = newValue;
    }
    this.update({state:state});
  }

  init () {
    if (!this.props.state) {
      this.props.state = {
        watchData : {
          type : 'uninitialized',
          label : this.props.watch.getExpression(),
        }
      }
    }
    super.init()
  }

  removeWatch () {
    if (this._services.hasService("Watches")) {
      this._services.getWatchesService().removeWatch(this.watch)
    }
  }
}
WatchItemView.bindFns = ["removeWatch","updateValue"];
