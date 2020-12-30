const axios = require("axios");
const sendmail = require("./sendmail");
const urlMap = require("./urlMapList");

//发送请求后发送邮件
function sendRaindow({ user, userName, text, subject, type }) {
  getRaindowFart(type).then((res) => {
    sendmail({
      user,
      userName,
      text: text || "",
      subject: subject || `${res.data.substr(0, 10)}`,
      html: `<h1>${res.data}</h1>`,
    });
  });
}
//发送请求
function getRaindowFart(type = "1") {
  const url = urlMap[type];

  return axios.get(url);
}
module.exports = sendRaindow;
