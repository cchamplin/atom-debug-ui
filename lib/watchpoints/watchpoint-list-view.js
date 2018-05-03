'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import UiComponent from '../ui/component'
import WatchpointItemView from './watchpoint-item-view'
import helpers from '../helpers'

export default class WatchpointListView extends UiComponent {

  constructor (props,children) {
    super(props,children)
    this._services = props.services;
    this._services.fetchService("Watchpoints").then(this.watchpointsReady)
  }

  render () {
    const {services,context,state} = this.props;

    const watchpoints = state.watchpoints.map((watch,index) => {
      return <WatchpointItemView key={watch.getId()} context={context} services={services} watchpoint={watch} />
    });
    return <ul className='atom-debug-ui-watchpoints native-key-bindings' attributes={{"tabindex":"-1"}}>
      {watchpoints}
      </ul>
  }

  watchpointsReady() {
    this.subscriptions.add(this._services.getWatchpointsService().onWatchpointsChanged((event) => {
      this.updateWatchpoints()
    }))
    this.updateWatchpoints()
  }

  init () {
    if (!this.props.state) {
      this.props.state = {
        watchpoints: []
      };
    }
    super.init();
  }
  updateWatchpoints () {
    if (this._services.hasService("Watchpoints")) {
      const state = Object.assign({}, this.props.state);
      let watchpoints = this._services.getWatchpointsService().getWatchpoints().slice()
      state.watchpoints = watchpoints;
      this.update({state:state})
    }
  }
}
WatchpointListView.bindFns = ["updateWatchpoints","watchpointsReady",]
