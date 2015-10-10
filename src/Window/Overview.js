var UI = require('ui');
var Vector2 = require('vector2');
var current_watch = require('WatchInfo.js');


var window = {
  window: new UI.Window({}),
  background: new UI.Rect({
    position: new Vector2(0,0), 
    size: new Vector2(144, 168),
  }),
  logo: new UI.Image({
    image: 'images/pebble.png',
    position: new Vector2(40,40), 
    size: new Vector2(70, 18)
  }),
  loadingText: new UI.Text({
    text: 'Fetching data',
    position: new Vector2(0,100), 
    size: new Vector2(144, 10),
    font: 'gothic-24',
    color: (current_watch.platform == "basalt" ? 'red' : 'black'),
    textAlign: 'center'
  }),
  lines: [],
  animateIn: function() {
    // Remove loading text
    this.window.remove(this.loadingText);
    // Animate logo up
    this.logo.animate({ position: this.logo.position().set(2, 2) }, 400);
    // Animate lines into view
    for (var n = 0; n < this.lines.length; n++) {
      this.lines[n].animateTo(25 + (n*24));
    }
  }
};

window.window.add(window.background);
window.window.add(window.logo);
window.window.add(window.loadingText);

window.status = createLine(25*7, 'Status:', 'Calculating');
window.lines = [window.status];

module.exports = window;

function createLine(top, legend, value) {
  var line = {
    legend: new UI.Text({
      text: legend,
      position: new Vector2(2, top+2), 
      size: new Vector2(46, 1),
      font: 'gothic-24',
      color: 'black',
      textAlign: 'left'
    }),
    value: new UI.Text({
      text: value,
      position: new Vector2(48, top), 
      size: new Vector2(60, 1),
      font: 'gothic-28-bold',
      color: 'black',
      textAlign: 'right'
    }),
    animateTo: function(top) {
      this.legend.animate({position: this.legend.position().set(2, top+2)});
      this.value.animate({position: this.value.position().set(48, top)});
    },
    text: function(text) {
      this.value.text(text);
    }
  };
  
  window.window.add(line.legend);
  window.window.add(line.value);
  return line;
}
