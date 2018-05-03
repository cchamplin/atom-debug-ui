'use babel'
import autoBind from 'auto-bind-inheritance'
import {CompositeDisposable} from 'atom'

export default class Service {
  /**
   * Abstract Class Service
   * @class Service
   *
   * @public
   * @param  {ServiceManager} services
   * @param  {Object} options Service Options
   */
  constructor(services, options) {
    this._services = services
    if (!options) {
      options = {}
    }
    this._options = options
    this._subscriptions = new CompositeDisposable()
    autoBind(this);
  }

  /**
   * Returns the service manager associated with the service
   * @public
   * @return {Object} [description]
   */
  getServices() {
    return this._services
  }

  /**
   * Returns the service options
   * @public
   * @return {Object[]} [description]
   */
  getOptions() {
    return this._options
  }

  /**
   * Returns an option by name
   * @public
   * @param  {string} name [description]
   * @return {Object}      [description]
   */
  getOption(name) {
    return this._options[name]
  }

  /**
   * Set the state for the given service
   * @private
   * @param  {Object} state [description]
   */
  setState(state) {
    if (typeof this.deserialize === "function") {
      this.deserialize(state);
    }
  }

  destroy() {
    if (this._subscriptions != undefined && this._subscriptions != null) {
      this._subscriptions.dispose()
      delete this._subscriptions
    }
  }

  dispose() {
    this.destroy()
  }
}
