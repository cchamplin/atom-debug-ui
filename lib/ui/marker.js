'use babel'
/** @jsx etch.dom */

export default class Marker {
  constructor(editor, range, gutter) {
    var enableGutters, gutterMarker, lineMarker;
    this.editor = editor;
    this.range = range;
    this.gutter = gutter;
    this.markers = {};
    enableGutters = atom.config.get('atom-debug-ui.gutters.gutterBreakpointToggle');
    if (enableGutters && this.gutter) {
      gutterMarker = this.editor.markBufferRange(this.range, {
        invalidate: 'inside'
      });
      this.markers.gutter = gutterMarker;
    }
    lineMarker = this.editor.markBufferRange(this.range);
    this.markers.line = lineMarker;
  }

  decorate = function() {
    var item;
    item = document.createElement('span');
    item.className = "highlight atom-debug-ui-gutter atom-debug-ui-highlight";
    if (this.markers.gutter) {
      this.gutter.decorateMarker(this.markers.gutter, {
        "class": 'atom-debug-ui-gutter-marker',
        item: item
      });
    }
    if (this.markers.line) {
      return this.editor.decorateMarker(this.markers.line, {
        type: 'line-number',
        "class": 'atom-debug-ui-breakpoint'
      });
    }
  };

  destroy = function() {
    var marker, ref, results, type;
    ref = this.markers;
    results = [];
    for (type in ref) {
      marker = ref[type];
      results.push(marker != null ? marker.destroy() : void 0);
    }
    return results;
  };

  getStartBufferPosition = function() {
    var marker, ref, type;
    ref = this.markers;
    for (type in ref) {
      marker = ref[type];
      if (marker) {
        return marker.getStartBufferPosition();
      }
    }
  };
}
