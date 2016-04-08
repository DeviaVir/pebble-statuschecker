'use strict';

var ajax = require('../lib/ajax');
var UI = require('../ui');
var Vector2 = require('../lib/vector2');
var current_watch = require('../WatchInfo.js');

var Settings = require('../settings');

var colorType = 'bw';
if(Settings.option('color') === true) {
  colorType = 'color';
}

var provider = {
  loadData: function(sn, loading, window, callback) {
    if(sn) {
      var ajaxData = JSON.stringify({ 'operation': 'check', 'company': sn});/*,
          imgUrl = 'http://settings.pebble.sillevis.net/img/color/' + sn + (colorType === 'color' ? '~color' : '') + '.png#width:70';*/
      
      if (window.logo !== null) {
        window.window.remove(window.logo);
      }
      /*var windowLogo = new UI.Image({
        position: new Vector2(40,40), 
        size: new Vector2(70, 18),
        backgroundColor: 'clear',
        image: imgUrl
      });*/
      var sizex = 144;
      var sizey = 80;
      var posx = 0;
      var posy = 50;
      if(current_watch.platform === 'chalk') {
        sizex = 150;
        posx = 14;
        posy = 50;
      }
      var windowLogo = new UI.Text({
        text: sn.replace('/status/', ''),
        position: new Vector2(posx, posy), 
        size: new Vector2(sizex, sizey),
        font: 'gothic-24',
        color: 'black',
        textAlign: 'center'
      });

      window.logo = windowLogo;
      window.window.add(window.logo);
      
      loading.show();
      
      //console.log('Executing ajax!', sn, ajaxData);
      ajax({
        url: 'https://om7glvbki1.execute-api.eu-west-1.amazonaws.com/prod/statusAPI',
        method: 'POST',
        data: ajaxData,
        type: 'json'
      }, function(data) {
        //console.log('Response:', data);
        if(typeof data === 'object' && 'status' in data && data.status) {
          window.status.text(data.status);
          /*
          // when card has better font control and image support:
          overview.title(sn.replace('/status/', ''));
          overview.body(data.status);
          overview.banner(imgUrl);
           */
          
          if(current_watch.platform !== 'aplite') {
            switch(data.status.toLowerCase()) {
              case 'ok':
                window.background.backgroundColor('green');
              break;
              case 'warning':
                window.background.backgroundColor('orange');
              break;
              case 'down':
                window.background.backgroundColor('red');
              break;
            }
          }
        }
        loading.hide();
        callback();
      }, function(error) {
        //console.log('Error loading data', error);
        loading.hide();
        callback(error);
      });
    }
  }
};

module.exports = provider;