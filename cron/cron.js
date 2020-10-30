var CronJob = require('cron').CronJob;
const getLaws = require('./getNewLaw');
var newLaw = new CronJob('* * * * * *', function() {
  getLaws();
});
newLaw.start();
