'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import UiComponent from '../ui/component'
import Editor from '../ui/editor'
import BreakpointSettingsConditionView from './breakpoint-settings-condition-view'

export default class BreakpoinSettingsView extends UiComponent {

  constructor (props,children) {
    super(props,children)
    this.subscriptions.add(atom.commands.add(this.element, 'core:cancel', () => { this.onCancel() }))
    this.subscriptions.add(atom.commands.add(this.element, 'core:confirm', () => { this.onConfirm() }))
    this.subscriptions.add(this.props.breakpoint.onBreakpointDestroyed(() => {
      this.onCancel()
    }));
  }

  render () {
    const {context,services,state} = this.props;
    const settings = state.conditions.map((setting,index) => {
      return <BreakpointSettingsConditionView key={index} services={services} context={context} setting={setting} didChange={this.handleConditionChange} onRemoveCondition={this.handleRemoveCondition}/>
    });
    return <div className='atom-debug-ui-breakpoints-settings breakpoint-settings-view'>
      <span onclick={this.handleCloseClick} className='atom-pair-exit-view close-icon' />
      <div className='breakpoint-settings setting-conditions'>
        <div className='breakpoint-settings-existing setting-conditions-existing'>
          {settings}
        </div>
        <div className='breakpoint-setting setting-condition setting-new'>
          <span className='setting-label'>Condition:</span>
          <Editor ref='editor' mini={true} placeholder='x == 1'/>
          <span onclick={this.handleAddConditionClick} className='setting-add setting-condition-add'>Add condition</span>
        </div>
        <div className='breakpoint-settings-actions'>
          <div className="action-list">
            <button className="btn btn-cancel breakpoint-setting-cancel" onclick={this.onCancel}>Cancel</button>
            <button className="btn btn-save breakpoint-setting-save" onclick={this.handleSaveClick}>Save</button>
          </div>
        </div>
      </div>
    </div>
  }

  onCancel () {
    this.destroy()
  }

  handleSaveClick () {
    const model = this.refs.editor;
    const state = Object.assign({}, this.props.state);
    if (model.getText() != null && model.getText().trim() != "") {
      state.conditions.push({value:model.getText()});
    }
    this.props.breakpoint.setSettingValues("conditions", state.conditions);
    this.destroy()
  }

  handleConditionChange (key,text) {
    const state = Object.assign({}, this.props.state);
    state.conditions[key].value = text;
    this.update({state:state});
  }

  onConfirm () {
    const model = this.refs.editor;
    const state = Object.assign({}, this.props.state);
    if (model.getText() != null && model.getText().trim() != "") {
      state.conditions.push({value:model.getText()});
      this.update({state:state});
      model.setText("");
    }

  }

  init () {
    if (!this.props.state) {
      this.props.state = {
        conditions: this.props.breakpoint.getSettingValues("conditions")
      }
    }
    super.init();
  }

  handleAddConditionClick (event) {
    const model = this.refs.editor;
    const state = Object.assign({}, this.props.state);
    if (model.getText() != null && model.getText().trim() != "") {
      state.conditions.push({value:model.getText()});
      this.update({state:state});
      model.setText("");
    }
  }

  attach () {
    this.panel = atom.workspace.addModalPanel({item: this.element});
  }

  destroy() {
    super.destroy();
    if (this.panel) {
      this.panel.destroy();
      this.panel = null;
    }
  }


  handleCloseClick (event) {
    const {breakpoint}= this.props;
    if (this.panel) {
      this.panel.destroy();
      this.panel = null;
    }
  }

  handleRemoveCondition (key) {
    const model = this.refs.editor;
    const state = Object.assign({}, this.props.state);
    state.conditions.splice(key,1)
    this.update({state:state});
  }
}
BreakpoinSettingsView.bindFns = ["handleAddConditionClick","handleRemoveCondition","handleCloseClick","onConfirm","onCancel","handleSaveClick","handleConditionChange"]
