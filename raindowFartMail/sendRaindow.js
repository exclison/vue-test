
const axios = require('axios')
const sendmail = require('./sendmail')

function sendRaindow({user,userName,text,subject}){
    getRaindowFart().then(res=>{
        sendmail({
            user,
            userName,
            text:text || '',
            subject:subject || `${res.data.substr(0,10)}`,
            html:`<h1>${res.data}</h1>`
          })
    })
}
function getRaindowFart(){
    const url = 'https://chp.shadiao.app/api.php'

    return axios.get(url)

}
module.exports = sendRaindow