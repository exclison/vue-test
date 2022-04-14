//100万个数里取前100个最大的值
const arr = []

const arrlength = 1000000
const maxvalue = 1000000
const maxlength = 100
for (let i = 0; i < arrlength; i++) {
    const value = Math.floor(Math.random() * maxvalue)
    arr.push(value)
}

const maxList = []

const startTime = Date.now()

for (let i = 0; i < maxlength; i++) {
    let maxIndex = 0
    let maxItem = arr[0]

    for (let j = 0; j < arr.length; j++) {
        debugger
        const element = arr[j];
        if (element > maxItem) {
            maxItem = element
            maxIndex = j
        }
    }
    maxList.push(maxItem)
    arr.splice(maxIndex, 1)

}
const endTime = Date.now()



console.log(arr)
console.log(maxList, 'sort')
console.log(endTime - startTime, 'time')