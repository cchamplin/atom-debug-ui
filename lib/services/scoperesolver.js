'use babel'
import Service from './service'

export default class ScopeResolverService extends Service {
  /**
   * Scope Resolver Service
   * @class ScopeResolverService
   *
   * @extends Service
   * @public
   * @param  {ServiceManager} services
   * @param  {Object} options Service Options
   */
  constructor(services,options) {
    super(services,options)
  }

  /**
   * Returns true if the editor is in a valid scope
   * @public
   * @return {Boolean} [description]
   */
  editorInValidScope() {
    let editor = atom.workspace.getActiveTextEditor()
    if (editor == undefined || editor == null || typeof editor.getGrammar !== "function") {
      return false
    }
    return this.validForScope(editor.getGrammar().scopeName)
  }

  /**
   * Returns true if a specific scope is valid for the debug engine
   * @public
   * @param  {string} scopeName [description]
   * @return {Boolean}           [description]
   */
  validForScope(scopeName) {
    if (!this.getServices().hasService("Debugger")) {
      return false
    }
    const grammars = this.getServices().getDebuggerService().getGrammars()
    for (let grammar of grammars) {
      if (grammar == scopeName) {
        return true
      }
    }
    return false
  }
}
