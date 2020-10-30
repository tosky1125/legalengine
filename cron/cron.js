var CronJob = require('cron').CronJob;
const getLaws = require('./getNewLaw');
var newLaw = new CronJob('0 18 * * *', function() {
  getLaws();
}, null, true, 'Asia/Seoul');
newLaw.start();
