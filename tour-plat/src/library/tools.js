/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2022-05-17 15:07:21
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2023-02-24 10:58:24
 * @FilePath: \vue-test\tour-plat\src\library\tools.js
 * @Description: 
 */
/**
 * @time: 2020/8/10
 * @name: exChangeArray
 * @description: 交换数组位置
 * @author: Hanyuchen
 * @params: array:需要交换的数组，index1,index2:需要交换的位置
 **/
export function exChangeArray(array, index1, index2) {
  array.splice(index2, 1, ...array.splice(index1, 1, array[index2]));
  return array;
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
      throw new Error("文件格式不正确");
    }
    try {
      // 获取录音时长
      const url = URL.createObjectURL(file);
      // 经测试，发现audio也可获取视频的时长
      const audioElement = new Audio(url);

      let duration;
      audioElement.addEventListener("loadedmetadata", function (_event) {
        duration = audioElement.duration;
        resolve(duration);
        console.log(duration);
      });
    } catch (e) {
      reject(e);
    }
  });
}
/*
 *@name:getParamsForUrl
 *@description:从URL获取参数列表
 *@author: hanyuchen
 *@date: 2021-04-08 17:09:37
 *@params {String} paramsName: url
 */
export function getParamsForUrl(url) {
  const params = url.split("&").reduce((r, c) => {
    const paramstr = c.replace(/\?/, "");
    const param = paramstr.split("=");
    if (param[0]) {
      r[param[0]] = param[1];
    }
    return r;
  }, {});
  return params;
}


//数据分组函数（每组num条）
export function group_array(data, num) {
  let result = [];
  let groupItem;
  for (let i = 0; i < data.length; i++) {
    if (i % num == 0) {
      groupItem != null && result.push(groupItem);
      groupItem = [];
    }
    groupItem.push(data[i]);
  }
  result.push(groupItem);
  return result;
}
