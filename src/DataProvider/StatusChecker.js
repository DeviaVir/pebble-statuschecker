var ajax = require('ajax');

var Settings = require('settings');

var provider = {
  loadData: function(window, callback) {
    ajax({
      url: 'https://om7glvbki1.execute-api.eu-west-1.amazonaws.com/prod/statusAPI',
      method: 'POST',
      data: JSON.stringify({ 'operation': 'check', 'company': Settings.option('service')}),
      type: 'json'
    }, function(data) {
      console.log(JSON.stringify(data));
      window.status.text(data.status);
      callback();
    }, function(error) {
      console.log('Error loading data', error);
      callback(error);
    });
  }
};

module.exports = provider;