var twilio = require('twilio'),
var client = new twilio('ACCOUNTSID', 'AUTHTOKEN'),
cronJob = require('cron').CronJob;

var textJob = new cronJob( '0 18 * * *', function(){
    client.messages.create( { to:'4022155170', from:'3370830295dc9c73597e64e1ccea260d', body:'Hello! Hope you’re having a good day!' }, function( err, data ) {});
  },  null, true);