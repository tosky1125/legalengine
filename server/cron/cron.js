var CronJob = require('cron').CronJob;
const getLaws = require('./getNewLaw');
var newLaw = new CronJob('0 13 * * 1-5', function() {
  getLaws();
}, null, true, 'Asia/Seoul');
newLaw.start();
