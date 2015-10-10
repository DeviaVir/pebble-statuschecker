var UI = require('ui');
var Vector2 = require('vector2');
        
var window = {
  window: new UI.Window({}),
  background: new UI.Rect({
    position: new Vector2(0,0), 
    size: new Vector2(144, 168),
    backgroundColor: 'white'
  }),
  loadingText: new UI.Text({
    text: 'Fetching data..',
    position: new Vector2(0,100), 
    size: new Vector2(144, 10),
    font: 'gothic-24',
    color: 'black',
    textAlign: 'center'
  })
};

window.window.add(window.background);
window.window.add(window.loadingText);

module.exports = window;