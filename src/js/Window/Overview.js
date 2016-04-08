var UI = require('../ui');
var Vector2 = require('../lib/vector2');
var current_watch = require('../WatchInfo.js');

var background = new UI.Rect({
  position: new Vector2(0,0),
  size: new Vector2(144, 168)
});
if(current_watch.platform == 'chalk') {
  background = new UI.Circle({
    position: new Vector2(89,89),
    radius: 89
  });
}

var window = {
  window: new UI.Window({
    fullscreen: true
  }),
  background: background,
  lines: [],
  logo: null/*,
  animateIn: function() {
    // Animate logo up
    this.logo.animate({ position: this.logo.position().set(40, 30) }, 400);
    // Animate lines into view
    for (var n = 0; n < this.lines.length; n++) {
      this.lines[n].animateTo(70 + (n*24));
    }
  }*/
};

window.window.add(window.background);

var top = 25*8;
if(current_watch.platform === 'chalk') {
  top = 120;
}
window.status = createLine('');
window.lines = [window.status];

module.exports = window;

function createLine(value) {
  var line = {
    value: new UI.Text({
      text: value,
      position: new Vector2(39, top), 
      size: new Vector2(100, 28),
      font: 'gothic-24-bold',
      color: 'black',
      textAlign: 'center'
    }),
    /*animateTo: function(top) {
      this.value.animate({position: this.value.position().set(40, top)});
    },*/
    text: function(text) {
      this.value.text(text);
    }
  };
  
  window.window.add(line.value);
  return line;
}
