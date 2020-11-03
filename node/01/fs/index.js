
const fs = require('fs')

function get(key){
    fs.readFile('./db.json',(err,data)=>{
        const json = JSON.parse(data)
        console.log(json,json[key])
    })
}

function set(key,value){
    fs.readFile('./db.json',(err,data)=>{
        //判断空文件
        const json =  data ? JSON.parse(data) : {}
        console.log(json,'kkk')
        json[key] = value
        console.log(json,'bbb')

        //重新写入文件
        fs.writeFile('./db.json',JSON.stringify(json),err => {
            if(err){
                console.error(err)
            }
            else{
                console.log('写入成功')
            }
        })
    })
}

//命令行接口
const readline = require('readline')
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

rl.on('line',function (input) { 
    const [op,key,value] = input.split(' ')
    if(op === 'get'){
        get(key)
    }
    else if(op === 'set'){
        set(key,value)
    }
    else if(op ==='quit'){
        rl.close()
    }
 })

 rl.on('close',function () { 
     process.exit(0)
  })