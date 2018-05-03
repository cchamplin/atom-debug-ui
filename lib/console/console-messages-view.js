'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import UiComponent from '../ui/component'
import ConsoleItemView from './console-item-view'

export default class ConsoleMessagesView extends UiComponent {

  constructor(props,children) {
    super(props,children);
    this._services = props.services
    this._services.fetchService("Console").then(this.consoleReady)
  }

  // TODO perform line appends without rerendering the entire list
  render () {
    const {state, services, context} = this.props;
    const items = state.lines.map((line,index) => {
      return <ConsoleItemView key={index} services={services} context={context} line={line}/>
    });
    return <ul ref="viewList" className="console-list-view">
        {items}
      </ul>
  }

  readAfterUpdate() {
    this.refs.viewList.parentElement.scrollTo(0,this.refs.viewList.parentElement.scrollHeight)
  }

  init () {
    if (!this.props.state) {
      this.props.state = {
        currentIndex: 0,
        lines: []
      }
    }
    super.init();
  }

  consoleReady() {
    this.subscriptions.add(this._services.getConsoleService().onMessageAdded((event) => {
      if (event.context == this.props.context) {
        this.updateConsole()
      }
    }))
    this.subscriptions.add(this._services.getConsoleService().onMessagesCleared((event) => {
      if (event.context == this.props.context) {
        this.clear()
      }
    }))
    this.updateConsole()
  }

  clear () {
    const state = Object.assign({}, this.props.state);
    state.lines = [];
    state.currentIndex = 0;
    this.update({state:state});
  }

  updateConsole () {
    if (this._services.hasService("Console")) {
      const state = Object.assign({}, this.props.state);
      const console = this._services.getConsoleService().getMessages(this.props.context, state.currentIndex)
      state.currentIndex = console.total;
      state.lines = state.lines.concat(console.lines);
      this.update({state:state});
    }
  }
}
ConsoleMessagesView.bindFns = ["updateConsole","clear","consoleReady"]
