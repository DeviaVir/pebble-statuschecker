var errorWindow = require('Window/Error.js');
var overviewWindow = require('Window/Overview.js');

var Settings = require('settings');

var provider = require('DataProvider/StatusChecker.js');

console.log('Starting app', JSON.stringify(Settings.option()));

// Catch configuration events
Pebble.addEventListener('showConfiguration', function(e) {
  Pebble.openURL('http://settings.pebble.sillevis.net/?' + encodeURIComponent(JSON.stringify(Settings.option())));
});

Pebble.addEventListener('webviewclosed',function(e) {
  var configuration = JSON.parse(decodeURIComponent(e.response));
  console.log('Configuration window returned: ', JSON.stringify(configuration));
  Settings.option('service', configuration.service);
  provider.loadData(overviewWindow, overviewDataLoaded);
});

if (Settings.option('service')) {
  overviewWindow.window.show();
  provider.loadData(overviewWindow, overviewDataLoaded);
} else {
  errorWindow.window.show();
}

function overviewDataLoaded(err) {
  if(err) {
    overviewWindow.window.hide();
    errorWindow.statusText.text('Error loading');
    errorWindow.image.image('images/exclamation.png');
    errorWindow.window.show();
    return;
  }
  
  overviewWindow.animateIn();
  overviewWindow.window.on('click', 'select', function() {
    // make a refresh
  });
  overviewWindow.window.on('click', 'up', function() {
    // make a refresh
  });
  overviewWindow.window.on('click', 'down', function() {
    // make a refresh
  });
}