const { TableHints } = require('sequelize/types');

const CronJob = require('cron').CronJob;
const job = new CronJob('* * * * * *', () => {
    Table.create({
        attr: 'a'
    }); 
});
job.start();