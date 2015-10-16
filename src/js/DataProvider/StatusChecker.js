var ajax = require('../lib/ajax');
var UI = require('../ui');
var Vector2 = require('../lib/vector2');

var Settings = require('../settings');

var colorType = 'bw';
if(Settings.option('color') === true) {
  colorType = 'color';
}

var provider = {
  loadData: function(sn, loading, window, callback) {
    if(sn) {
      var ajaxData = JSON.stringify({ 'operation': 'check', 'company': sn}),
          imgUrl = 'http://settings.pebble.sillevis.net/img/color/' + sn + (colorType === 'color' ? '~color' : '') + '.png#width:70';
           
      var windowLogo = new UI.Image({
        position: new Vector2(40,40), 
        size: new Vector2(70, 18),
        image: imgUrl
      });
      window.logo = windowLogo;
      window.window.add(window.logo);
      
      // Hack to make sure the logo actually shows..
      window.window.show();
      window.window.hide();
      
      loading.window.show();
      
      console.log('Executing ajax!', sn, ajaxData);
      ajax({
        url: 'https://om7glvbki1.execute-api.eu-west-1.amazonaws.com/prod/statusAPI',
        method: 'POST',
        data: ajaxData,
        type: 'json'
      }, function(data) {
        console.log('Response:', data);
        if(typeof data === 'object' && 'status' in data && data.status) {
          window.status.text(data.status);
          
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
        loading.window.hide();
        callback();
      }, function(error) {
        console.log('Error loading data', error);
        loading.window.hide();
        callback(error);
      });
    }
  }
};

module.exports = provider;