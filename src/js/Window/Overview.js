'use strict';

var UI = require('../ui');
var Vector2 = require('../lib/vector2');
var current_watch = require('../WatchInfo.js');

var background = new UI.Rect({
  position: new Vector2(0,0),
  size: new Vector2(144, 168)
});
var sizex = 144;
var sizey = 28;
var posx = 0;
var posy = 120;
if(current_watch.platform == 'chalk') {
  background = new UI.Circle({
    position: new Vector2(89,89),
    radius: 89
  });
  sizex = 100;
  posx = 39;
  posy = 120;
}

var window = {
  window: new UI.Window({
    fullscreen: true
  }),
  background: background,
  lines: [],
  logo: null,
  status: new UI.Text({
    text: '',
    position: new Vector2(posx, posy), 
    size: new Vector2(sizex, sizey),
    font: 'gothic-24-bold',
    color: 'black',
    textAlign: 'center'
  })/*,
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
window.window.add(window.status);

module.exports = window;


/*

// For when cards have better control over font-size and images:
'use strict';
var UI = require('../ui');
var card = new UI.Card({
  style: 'large',
  scrollable: true,
  bodyColor: 'white',
  subtitleColor: 'white',
  titleColor: 'white'
});
module.exports = card;

 */