'use babel'

import Service from './service'

export default class LoggerService extends Service {
  /**
  * Logging Service
  * Used to log messages to the atom debugger console
  * @class LoggerService
  *
  * @extends Service
  * @public
  * @param  {ServiceManager} services
  * @param  {Object} options Service Options
  */
  constructor(services,options) {
    super(services,options)
    this.prefix = this.getOption('prefix');
  }

  /**
   * Log warn message
   * @public
   * @param {...string}
   */
  warn () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.warn.apply(console, this.format(args));
  };
  /**
   * Log error message
   * @public
   * @param {...string}
   */
  error  () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.error.apply(console, this.format(args));
  };
  /**
   * Log info message
   * @public
   * @param {...string}
   */
  info () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.info.apply(console, this.format(args));
  };
  /**
   * Log debug message
   * @public
   * @param {...string}
   */
  debug () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.debug.apply(console, this.format(args));
  };
  /**
   * Log message
   * @public
   * @param {...string}
   */
  log  () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log.apply(console, this.format(args));
  };

  format (args_) {
    var args = args_.filter(function (a) { return a != null; });
    if (typeof args[0] === 'string') {
        if (args.length === 1) {
            return [this.prefix + " " + args[0]];
        }
        else if (args.length === 2) {
            return [this.prefix + " " + args[0], args[1]];
        }
        else {
            return [this.prefix + " " + args[0], args.slice(1)];
        }
    }
    return ["" + this.prefix, args];
  };

  destroy() {

  }
}
