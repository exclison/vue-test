// var sendMailTimer = require("./sendmail.js");
var sendRaindow = require("./sendRaindow.js");
var emailList = require("./emailList.js");
var urlMap = require("./urlMapList.js");

var schedule = require("node-schedule");

var rule = new schedule.RecurrenceRule();

rule.second = 49;
// rule.minute = 0;
// rule.hour = 9;

var j = schedule.scheduleJob(rule, function () {
  emailList.map((i) => {
    console.log("发送邮件");
    sendRaindow({
      user: i.email,
      subject: Object.keys(urlMap).find((it) => urlMap[it] === i.type),
      type: i.type,
    });
  });

  // sendMailTimer({
  //   user:'2512451790@qq.com',
  //   userName:'2512451790',
  //   text:'测试邮件',
  //   subject:'测试邮件主题',
  //   html:'<h1>这是一封测试邮件</h1>'
  // })
});
