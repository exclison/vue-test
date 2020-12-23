/**
 * @time: 2020/8/10
 * @name: exChangeArray
 * @description: 交换数组位置
 * @author: Hanyuchen
 * @params: array:需要交换的数组，index1,index2:需要交换的位置
 **/
export function exChangeArray(array, index1, index2) {
  array.splice(index2, 1, ...array.splice(index1, 1, array[index2]))
  return array
}

/**
 * @time: 2020/8/24
 * @name: getFileTimes
 * @description: 获取音视频文件时长
 * @author: Hanyuchen
 * @param: file 文件对象
 **/
export function getFileTimes(file) {
  return new Promise((resolve, reject) => {
    if (
      file &&
      file.type.search(/video\//) < 0 &&
      file.type.search(/audio\//) < 0
    ) {
      throw new Error('文件格式不正确')
    }
    try {
      // 获取录音时长
      const url = URL.createObjectURL(file)
      // 经测试，发现audio也可获取视频的时长
      const audioElement = new Audio(url)

      let duration
      audioElement.addEventListener('loadedmetadata', function(_event) {
        duration = audioElement.duration
        resolve(duration)
        console.log(duration)
      })
    } catch (e) {
      reject(e)
    }
  })
}
