var UI = require('ui');
var Vector2 = require('vector2');

var window = {
  window: new UI.Window({}),
  background: new UI.Rect({
    position: new Vector2(0,0), 
    size: new Vector2(144, 168)
  }),
  lines: [],
  logo: null,
  animateIn: function() {
    // Animate logo up
    this.logo.animate({ position: this.logo.position().set(40, 30) }, 400);
    // Animate lines into view
    for (var n = 0; n < this.lines.length; n++) {
      this.lines[n].animateTo(70 + (n*24));
    }
  }
};

window.window.add(window.background);

window.status = createLine(25*8, '');
window.lines = [window.status];

module.exports = window;

function createLine(top, value) {
  var line = {
    value: new UI.Text({
      text: value,
      position: new Vector2(48, top), 
      size: new Vector2(60, 1),
      font: 'gothic-28-bold',
      color: 'black',
      textAlign: 'center'
    }),
    animateTo: function(top) {
      this.value.animate({position: this.value.position().set(48, top)});
    },
    text: function(text) {
      this.value.text(text);
    }
  };
  
  window.window.add(line.value);
  return line;
}
