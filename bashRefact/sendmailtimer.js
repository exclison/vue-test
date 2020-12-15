var sendMailTimer =  require('./sendmail.js')
const args = process.argv.slice(2)
console.log(args)

var schedule = require('node-schedule');

var startTime = new Date(Date.now())
var endTime = new Date(startTime.valueOf + args[0]*24*60*60*1000)

var rule = new schedule.RecurrenceRule();

rule.second = 0;
rule.minute = 0;
rule.hour = 9;
 
var j = schedule.scheduleJob({start:startTime,end:endTime,rule}, function(){
  console.log('发送邮件');
  sendMailTimer()
});