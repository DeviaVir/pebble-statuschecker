var UI = require('../ui');
var Vector2 = require('../lib/vector2');
var current_watch = require('../WatchInfo.js');

var background = new UI.Rect({
  position: new Vector2(0,0),
  size: new Vector2(144, 168),
  backgroundColor: 'white'
});
if(current_watch.platform == 'chalk') {
  background = new UI.Circle({
    position: new Vector2(89,89),
    radius: 89,
    backgroundColor: 'white'
  });
}
        
var window = {
  window: new UI.Window({
    fullscreen: true
  }),
  background: background,
  loadingText: new UI.Text({
    text: 'Fetching data..',
    position: new Vector2(0,89), 
    size: new Vector2(178, 35),
    font: 'bitham-30-black',
    color: 'black',
    textAlign: 'center'
  })
};

window.window.add(window.background);
window.window.add(window.loadingText);

module.exports = window;