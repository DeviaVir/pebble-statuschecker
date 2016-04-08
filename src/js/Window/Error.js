var UI = require('../ui');
var Vector2 = require('../lib/vector2');
var current_watch = require('WatchInfo.js');

var background = new UI.Rect({
  position: new Vector2(0,0), 
  size: new Vector2(144, 168),
  backgroundColor: (current_watch.platform !== 'aplite' ? 'white' : 'darkCandyAppleRed')
});
if(current_watch.platform == 'chalk') {
  background = new UI.Circle({
    position: new Vector2(89,89),
    radius: 89,
    backgroundColor: 'darkCandyAppleRed'
  });
}

var ErrorWindow = {
  window: new UI.Window({
    fullscreen: true
  }),
  background: background,
  image: new UI.Image({
    image: 'images/exclamation.png',
    position: new Vector2(37,37), 
    size: new Vector2(70, 70),
    compositing: (current_watch.platform !== 'aplite' ? 'clear' : 'set')
  }),
  statusText: new UI.Text({
    text: 'Please configure',
    position: new Vector2(17,115), 
    size: new Vector2(144, 25),
    font: 'gothic-24-bold',
    color: (current_watch.platform !== 'aplite' ? 'black' : 'white'),
    textAlign: 'center'
  })
};

ErrorWindow.window.add(ErrorWindow.image);
ErrorWindow.window.add(ErrorWindow.background);
ErrorWindow.window.add(ErrorWindow.statusText);

module.exports = ErrorWindow;