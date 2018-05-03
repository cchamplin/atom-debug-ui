'use babel'
/** @jsx etch.dom */

import etch from 'etch'

import UiComponent from '../ui/component'
import Editor from '../ui/editor'
import WatchItemView from './watch-item-view'
import Watch from '../models/watch'

export default class WatchView extends UiComponent {
  render () {
    const {services,context,state} = this.props;
    const watches = state.watches.map((watch,index) => {
      return <WatchItemView key={watch.getId()} context={context} services={services} watch={watch} />
    });
    let watchList = []
    if (watches.length > 0) {
      watchList = <ul className='atom-debug-ui-watches'>
        {watches}
      </ul>
    }

    return <div className='atom-debug-ui-watch-view pane-item' style="overflow:auto;">
      <section className='atom-debug-ui-watches atom-debug-ui-contents section'>
        <div className='editor-container'>
          <Editor ref='editor' mini={true} placeholder="New Watch: $myVariable"/>
        </div>
        {watchList}
      </section>
    </div>
  }


  constructor (props,children) {
    super(props,children)
    this._services = props.services
    this._services.fetchService("Watches").then(this.watchesReady)
    this.subscriptions.add(atom.commands.add(this.element, 'core:confirm', () => { this.confirmWatch() }))
  }

  watchesReady() {
    this.subscriptions.add(this._services.getWatchesService().onWatchesChanged((event) => {
      this.updateWatches()
    }))
    this.updateWatches()
  }

  confirmWatch() {
    const expression = this.refs.editor.getText()
    if (expression != null && expression.trim() != "") {
      if (this._services.hasService("Watches")) {
        const watch = new Watch({expression:expression.trim()})
        this._services.getWatchesService().addWatch(watch)
      }
      this.refs.editor.setText('')
    }
  }

  init () {
    if (!this.props.state) {
      this.props.state = {
        watches: []
      }
    }
    super.init()
  }

  submitWatchpoint (event) {
    /*return unless event.text is "\n"
    expression = @newWatchpointEditor
      .getModel()
      .getText()
    w = new Watchpoint(expression:expression)
    @GlobalContext.addWatchpoint(w)
    @newWatchpointEditor
      .getModel()
      .setText('')
    event.cancel()*/
  }

  updateWatches () {
    if (this._services.hasService("Watches")) {
      const state = Object.assign({}, this.props.state);
      let watches = this._services.getWatchesService().getWatches().slice()
      state.watches = watches;
      this.update({state:state})
    }
  }
}
WatchView.bindFns = ["updateWatches","watchesReady","confirmWatch"];
