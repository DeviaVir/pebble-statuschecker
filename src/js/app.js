'use strict';

var errorCard = require('Window/Error.js');
var overviewWindow = require('Window/Overview.js');
var loadingCard = require('Window/Loading.js');
var current_watch = require('WatchInfo.js');
var provider = require('DataProvider/StatusChecker.js');

var UI = require('ui');
var Settings = require('settings');

var currentService = 0;

console.log('Starting app', JSON.stringify(Settings.option()));

// Detect colors
Settings.option('color', true);
if(current_watch.platform === 'aplite') {
  Settings.option('color', false);
}

// Catch configuration events
Pebble.addEventListener('showConfiguration', function(e) {
  Pebble.openURL('http://settings.pebble.sillevis.net/?' + encodeURIComponent(JSON.stringify(Settings.option())));
});

Pebble.addEventListener('webviewclosed',function(e) {
  var configuration = JSON.parse(decodeURIComponent(e.response));
  //console.log('Configuration window returned: ', JSON.stringify(configuration));
  Settings.option('services', configuration.services);
  provider.loadData(Settings.option('services')[currentService], loadingCard, overviewWindow, overviewDataLoaded);
});

if (Settings.option('services')) {
  var items = [];
  for (var i = 0 ; i < Settings.option('services').length ; i++) {
    items.push({
      title: Settings.option('services')[i].replace('/status/', ''),
      subtitle: 'Select to show status'
    });
  }
  // Construct Menu to show to user
  var resultsMenu = new UI.Menu({
    sections: [{
      title: 'StatusCheckers',
      items: items
    }]
  });

  // Show the Menu, hide the loader
  resultsMenu.show();

  resultsMenu.on('select', function(e) {
    currentService = e.itemIndex;
    provider.loadData(Settings.option('services')[e.itemIndex], loadingCard, overviewWindow, overviewDataLoaded);
  });
} else {
  errorCard.show();
}

function overviewDataLoaded(err) {
  if(err) {
    overviewWindow.window.hide();
    errorCard.body('Error loading data, backend might be experiencing problem!');
    errorCard.show();
  }
  else {
    overviewWindow.window.hide();
    overviewWindow.window.show();
  }
}

overviewWindow.window.on('click', 'select', function() {
  // make a refresh
  provider.loadData(Settings.option('services')[currentService], loadingCard, overviewWindow, overviewDataLoaded);
});