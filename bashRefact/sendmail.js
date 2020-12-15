var nodemailer = require("nodemailer")
var user = '2946553665@qq.com'
var pass = 'shglqbhzkjncdgha'

var smtpTransport = nodemailer.createTransport({
    host:'smtp.qq.com',
    secureConnection:true,
    auth:{
        user:user,
        pass:pass,
    }
})

var options = {
    from:`"exclison"<${user}>`,
    to:`"2512451790"<2512451790@qq.com>`,
    subject:'一封来自nodemailer的邮件',
    text:'一封来自nodemailer的邮件',
    html:`<h1>你好这是一封来自nodemailer的邮件</h1>`,
    attachments:[],
}
function sendMailTimer() { 
    smtpTransport.sendMail(options,function (err,msg) { 
        if(err){
            console.error(err)
        }
        else{
            console.log('邮件发送成功')
        }
     })
 }

module.exports = sendMailTimer
