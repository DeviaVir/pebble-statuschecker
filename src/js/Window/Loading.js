'use strict';
var UI = require('../ui');
var card = new UI.Card({
  title: 'Loading',
  body: 'Fetching data..',
  style: 'large',
  backgroundColor: 'black',
  titleColor: 'white',
  bodyColor: 'white'
});
module.exports = card;