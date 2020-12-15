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


function sendMailTimer(options) { 
    const {user,userName,subject,text,html,arrachments} = options
    var options = {
        from:`"exclison"<2946553665@qq.com>`,
        to:`"${userName || user}"<${user}>`,
        subject:`${subject}`,
        text:`${text}`,
        html:`${html}`,
        attachments:[],
    }
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
