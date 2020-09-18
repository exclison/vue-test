const path = require('path')

exports.reslove = function  (url){
    return path.resolve(__dirname,`../../${url}`)
}