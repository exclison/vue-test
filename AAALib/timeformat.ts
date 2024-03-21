// /*
//  * @name:
//  * @description:
//  * @auth:hanyuchen
//  * @date: 2020-12-26 19:23
//  * @params: {String} paramsName: 参数
//  */
// const dateFormat = function (timestamp: number, format: string = "yyyy-MM-DD HH:mm:ss") {
//   const date = new Date(Number(timestamp));
//   const year:string = date.getFullYear().toString();
//   const month = date.getMonth().toString().padStart(2, "0");
//   const day = date.getDate().toString().padStart(2, "0");
//   const hour = date.getHours().toString().padStart(2, "0");
//   const minute = date.getMinutes().toString().padStart(2, "0");
//   const second = date.getSeconds().toString().padStart(2, "0");

//   let str = format;
//   str = str.replace(/yyyy/, year);
//   str = str.replace(/MM/, month);
//   str = str.replace(/DD/, day);
//   str = str.replace(/HH/, hour);
//   str = str.replace(/mm/, minute);
//   str = str.replace(/ss/, second);

//   return str;
// };

// /**
//  * @time: 2020/8/8
//  * @name: timeMillToFormat
//  * @description: 返回含有小时，分钟，秒的对象
//  * @author: Hanyuchen
//  *
//  * value:时间 单位为后边type判断
//  * type:单位 h m s S
//  **/
// const timeFormatToString = function (value = 0, type = "s") {
//   let setValue = 0;
//   switch (type) {
//     case "h":
//       setValue = value * 60 * 60;
//       break;
//     case "m":
//       setValue = value * 60;
//       break;
//     case "s":
//       setValue = value;
//       break;
//     case "S":
//       setValue = value / 1000;
//       break;
//   }

//   let second = Math.floor(String(setValue)); // 需要转换的时间秒

//   let minute = "00"; // 分
//   let hour = "00"; // 小时
//   let day = "00"; // 天
//   if (second > 60) {
//     minute = Math.floor(second / 60);
//     second = Math.floor(second % 60);

//     if (minute > 60) {
//       hour = Math.floor(minute / 60);
//       minute = Math.floor(minute % 60);

//       if (hour > 24) {
//         // 大于24小时
//         day = Math.floor(hour / 24);
//         hour = Math.floor(hour % 24);
//       }
//     }
//   }
//   hour = String(hour).padStart(2, "0");
//   minute = String(minute).padStart(2, "0");
//   second = String(second).padStart(2, "0");
//   return {
//     day,
//     hour,
//     minute,
//     second,
//   };
// };

// /**
//  * @time: 2020/8/8
//  * @name:
//  * @description:
//  * @author: Hanyuchen
//  *
//  * str: hh:mm:ss.S 时间格式字符串 (格式需严格执行)
//  * type: h:小时 m:分钟 s:秒 S:毫秒
//  *
//  **/
// const timeFormatToNum = function (str, type) {
//   console.log(str, type, "getTimeFormat");
//   const hour = str.match(/^\d{2}/).length > 0 ? str.match(/^\d{2}/)[0] : 0;
//   const minutes = str.match(/:\d{2}:/).length > 0 ? str.match(/:\d{2}:/)[0].substring(1, 3) : 0;
//   const second = str.match(/:\d{2}\./).length > 0 ? str.match(/:\d{2}\./)[0].substring(1, 3) : 0;
//   const mill = str.match(/\.\d*$/).length > 0 ? str.match(/\.\d*$/)[0].substring(1, 3) : 0;

//   let time = 0;
//   switch (type) {
//     case "h":
//       time =
//         Number(hour) +
//         Number(minutes) / 60 +
//         Number(second) / 60 / 60 +
//         Number(mill) / 60 / 60 / 60;
//       break;
//     case "m":
//       time = Number(hour) * 60 + Number(minutes) + Number(second) / 60 + Number(mill) / 60 / 60;
//       break;
//     case "s":
//       time = Number(hour) * 60 * 60 + Number(minutes) * 60 + Number(second) + Number(mill) / 60;
//       break;
//     case "S":
//       time =
//         Number(hour) * 60 * 60 * 1000 +
//         Number(minutes) * 60 * 1000 +
//         Number(second) * 1000 +
//         Number(mill);
//       break;
//   }

//   return time;
// };

// 音频时间格式
const formatSeconds = function (value: number, format: string = 'dd:HH:mm:ss') {
  // console.log(value, format, 44444);
  let second = Math.round(value); // 需要转换的时间秒
  let minute = 0; // 分
  let hour = 0; // 小时
  let day = 0; // 天
  if (second > 60) {
    minute = Math.floor(second / 60);
    second = Math.floor(second % 60);
    if (second < 10) {
      // second = "0" + second;
    }
    if (minute > 60) {
      hour = Math.floor(minute / 60);
      minute = Math.floor(minute % 60);
      if (minute < 10) {
        // minute = "0" + minute;
      }
      if (hour > 24) {
        // 大于24小时
        day = Math.floor(hour / 24);
        hour = Math.floor(hour % 24);
      }
    }
  } else {
    if (second < 10) {
      // second = "0" + second;
    }
  }
  const dayString = String(day).padStart(2, '0')
  const hourString = String(hour).padStart(2, "0");
  const minuteString = String(minute).padStart(2, "0");
  const secondString = String(second).padStart(2, "0");
  var str = format.replace(/dd/, dayString);
  str = str.replace(/dd/, dayString);
  str = str.replace(/HH/, hourString);
  str = str.replace(/mm/, minuteString);
  str = str.replace(/ss/, secondString);

  return str;
};

export { formatSeconds };
// export { timeFormatToNum, timeFormatToString, formatSeconds, dateFormat };
