var CronJob = require('cron').CronJob;
var job = new CronJob('35 13 * * *', function() {
  console.log('You will see this message every second');
}, null, true, 'Asia/Seoul');
job.start();