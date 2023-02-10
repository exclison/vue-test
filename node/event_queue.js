/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2023-02-08 13:41:21
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2023-02-08 15:57:23
 * @FilePath: \vue-test\node\event_queue.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
setTimeout(function () {
    console.log(1)
}, 0);
new Promise(function (resolve, reject) {
    console.log(2);
    resolve()
}).then(function () {
    console.log(3)
});
process.nextTick(function () {
    console.log(4)
})
console.log(5)

Array.prototype.map = function (callback) {
    console.log(this, 'this')
    const res = []
    for (let i = 0; i < this.length; i++) {
        res.push(callback(this[i]))
    }
    return res
}
Array.prototype.reduce = function (callback, initvalue) {
    let total = initvalue
    for (let i = 0; i < this.length; i++) {
        total = callback(total, this[i])
    }
    return total
}
let arr = [1, 2, 3]
arr = arr.map(item => item + 1)
const num = arr.reduce((total,current)=>{
    total += current
    return total
},0)
console.log(num, 'num')

