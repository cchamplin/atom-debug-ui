'use babel'
/** @jsx etch.dom */

import etch from 'etch'
import UiComponent from '../ui/component'
import ActionBar from './actionbar'
import Editor from '../ui/editor'

export default class OverlayBar extends UiComponent {

  constructor (props,children) {
    super(props,children)
  }

  render () {
    const {services,context,state} = this.props;

    return <div className='atom-debug-ui-action-bar-overlay'>
              <ActionBar context={context} services={services} mini={true} />
            </div>
  }

  attach () {
    this.panel = atom.workspace.addModalPanel({item: this.element,className:'atom-debug-ui-action-bar-modal'});
    if (this.panel) {
      document.body.addEventListener('mousemove',this.mouseMove);
      this.panel.element.addEventListener('mousedown',this.mouseDown);
      document.body.addEventListener('mouseup',this.mouseUp);
      window.addEventListener('mouseleave',this.mouseLeave);
      document.body.addEventListener('mouseleave',this.mouseLeave);
      window.addEventListener('blur',this.onBlur);
    }
  }

  init () {
    if (!this.props.state) {
      this.props.state = {
        dragging : false
      }
    }
    super.init();
  }


  mouseLeave (event) {
    this.props.state.dragging = false;
  }

  onBlur (event) {
    this.props.state.dragging = false;
  }

  mouseMove (event) {
    if (this.props.state && this.props.state.dragging) {
        this.panel.element.style.left = (event.clientX + parseInt(this.props.state.offsetX,10)) + 'px';
        this.panel.element.style.top = (event.clientY + parseInt(this.props.state.offsetY,10)) + 'px';
    }

  }
  mouseDown (event) {
    if (this.props.state && this.panel && this.panel.element) {
      let style = window.getComputedStyle(this.panel.element);
      this.props.state.offsetX = parseInt(style.getPropertyValue("left"),10) - event.clientX
      this.props.state.offsetY = parseInt(style.getPropertyValue("top"),10) - event.clientY
      this.props.state.dragging = true;
    }
  }

  mouseUp (event) {
    if (this.props.state && this.props.state.dragging) {
      this.panel.element.style.left = (event.clientX + parseInt(this.props.state.offsetX,10)) + 'px';
      this.panel.element.style.top = (event.clientY + parseInt(this.props.state.offsetY,10)) + 'px';
      this.props.state.dragging = false;
    }
  }

  destroy() {
    document.body.removeEventListener('mousemove',this.mouseMove);

    document.body.removeEventListener('mousedown',this.mouseUp);
    window.removeEventListener('mouseleave',this.mouseLeave);
    window.removeEventListener('blur',this.onBlur);
    super.destroy();
    if (this.panel) {
      this.panel.element.removeEventListener('mousedown',this.mouseDown);
      this.panel.destroy();
    }
  }


}
OverlayBar.bindFns = ["mouseUp","mouseMove","mouseDown","onBlur","mouseLeave"]
