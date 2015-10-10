var errorWindow = require('Window/Error.js');
var overviewWindow = require('Window/Overview.js');
var loadingWindow = require('Window/Loading.js');
var current_watch = require('WatchInfo.js');

var Settings = require('settings');

var provider = require('DataProvider/StatusChecker.js');

console.log('Starting app', JSON.stringify(Settings.option()));

// Detect colors
Settings.option('color', false);
if(current_watch.platform == 'basalt' || current_watch.platform == 'chalk') {
  Settings.option('color', true);
}

// Catch configuration events
Pebble.addEventListener('showConfiguration', function(e) {
  Pebble.openURL('http://settings.pebble.sillevis.net/?' + encodeURIComponent(JSON.stringify(Settings.option())));
});

Pebble.addEventListener('webviewclosed',function(e) {
  var configuration = JSON.parse(decodeURIComponent(e.response));
  console.log('Configuration window returned: ', JSON.stringify(configuration));
  Settings.option('service', configuration.service);
  provider.loadData(loadingWindow, overviewWindow, overviewDataLoaded);
});

if (Settings.option('service')) {
  provider.loadData(loadingWindow, overviewWindow, overviewDataLoaded);
} else {
  errorWindow.window.show();
}

function overviewDataLoaded(err) {
  loadingWindow.window.hide();
  if(err) {
    overviewWindow.window.hide();
    errorWindow.statusText.text('Error loading');
    errorWindow.image.image('images/exclamation.png');
    errorWindow.window.show();
    return;
  }
  overviewWindow.window.show();
  overviewWindow.animateIn();
}

function clear() {
  overviewWindow.window.hide();
  loadingWindow.window.show();
}

overviewWindow.window.on('click', 'select', function() {
  // make a refresh
  clear();
  provider.loadData(loadingWindow, overviewWindow, overviewDataLoaded);
});
overviewWindow.window.on('click', 'up', function() {
  // make a refresh
  clear();
  provider.loadData(loadingWindow, overviewWindow, overviewDataLoaded);
});
overviewWindow.window.on('click', 'down', function() {
  // make a refresh
  clear();
  provider.loadData(loadingWindow, overviewWindow, overviewDataLoaded);
});