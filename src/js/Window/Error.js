'use strict';
var UI = require('../ui');
var current_watch = require('../WatchInfo.js');
var card = new UI.Card({
  title: 'Error',
  body: 'Please configure first!',
  style: 'small',
  banner: 'IMAGE_EXCLAMATION',
  scrollable: true,
  backgroundColor: (current_watch.platform !== 'aplite' ? 'darkCandyAppleRed' : 'white'),
  titleColor: (current_watch.platform !== 'aplite' ? 'white' : 'black'),
  bodyColor: (current_watch.platform !== 'aplite' ? 'white' : 'black')
});
module.exports = card;