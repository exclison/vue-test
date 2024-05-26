/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2022-09-07 14:52:09
 * @LastEditors: Hanyuchen e-exclison@outlook.ocm
 * @LastEditTime: 2024-03-21 16:56:03
 * @FilePath: \hljkjg_web\src\library\util.ts
 * @Description: 工具库
 */
// import { v4 as uuidv4 } from "uuid";

// export const createUUID = () => {
//   return uuidv4();
// };

/**
 * @name:getImageUrl
 * @description:动态获取图片路径(以assets/img为根路径,参数只需填写img以后的部分)
 * @author: hanyuchen
 * @date 2022-09-02 14:28:00
 * @params {String} path: 相对于assets/img的路径以及文件名 例如 museum/001.png 不要在前面加/
 */
export const getImageUrl = (path: string) => {
  return new URL(`../assets/images/${path}`, import.meta.url).href;
};

export const getToken = () => {
  const local = localStorage.getItem("userInfo");
  const userInfo = local ? JSON.parse(local || "") : {};
  const { token } = userInfo;
  return token;
};

/*
 *@name:getParamsForUrl
 *@description:从URL获取参数列表
 *@author: hanyuchen
 *@date: 2021-04-08 17:09:37
 *@params {String} paramsName: url
 */
export function getParamsForUrl(url: any) {
  const uri = url.split("?")[1];

  const params = uri
    ? uri.split("&").reduce((r: any, c: any) => {
        const paramstr = c.replace(/\?/, "");
        const param = paramstr.split("=");
        if (param[0]) {
          r[param[0]] = param[1];
        }
        return r;
      }, {})
    : {};
  return params;
}

/**
 * @name:group_array
 * @description:按数量分组
 * @author: hanyuchen
 * @date 2023-02-24 10:58:52
 * @params {Number} num: 系数
 * @params {Array} data: 数组
 */
export function group_array(data: any, num: any) {
  let result = [];
  let groupItem: any;
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

/**
 * @name:CurrentStep
 * @description:维护数字递增递减循环
 * @author: hanyuchen
 */
export class CurrentStep {
  private current: number = 0;
  private total: number = 0;
  private loop: boolean = true;
  constructor(current: number = 0, total: number = 0, loop: boolean = true) {
    this.current = current;
    this.total = total;
    this.loop = loop;
  }
  next() {
    this.current = this.current + 1 < this.total ? this.current + 1 : this.loop ? 0 : this.current;
  }
  prev() {
    this.current = this.current - 1 >= 0 ? this.current - 1 : this.loop ? this.total - 1 : 0;
  }
  setCurrent(current: number) {
    this.current = current;
  }
  getCurrent() {
    return this.current;
  }
  setTotal(val: number) {
    this.total = val;
  }
}

/**
 * @name:loop_find
 * @description:循环寻找符合条件的内容
 * @author: hanyuchen
 * @date 2023-03-27 14:28:28
 * @params {String} threshold: 阈值 超出阈值终止循环
 * @params {Boolean} condition: 条件 while条件
 * @params {Function} handler: 副作用 必须返回是否退出循环的条件
 */
export function loop_find(threshold: number, condition: boolean, handler: Function) {
  let count = 0;
  while (condition) {
    count++;
    if (handler()) {
      break;
    }
    if (count > threshold) {
      break;
    }
  }
}

/**
 * @name:handleDataParse
 * @description:递归处理数据,添加自定义属性
 * @author: hanyuchen
 * @date 2024-02-26 11:45:38
 * @params {Array} data: 源数据
 * @params {Function} fn: 数据自定义处理函数
 * @params {String} childKey: 子数据字段名
 */
export function handleDataParse(data: any[], fn: Function, childKey: string | null) {
  // 解析数据,添加id与active,title属性
  const list = data.map((item: any) => {
    let i = fn(item);
    i.active = false;
    if (childKey && i[childKey]) {
      const child = handleDataParse(i[childKey], fn, childKey);
      i[childKey] = child;
    }
    return i;
  });
  return list;
}

/**
 * @name:getDataDeep
 * @description:获取树形数据层级深度
 * @author: hanyuchen
 * @date 2024-02-26 11:48:49
 * @params {Array} data: 源数据
 * @params {String} childKey: 子数据字段名
 */
export function getDataDeep(data: any[], childKey: string) {
  let arr = [];
  let depth = 1;
  arr.push(...data);

  while (arr.length > 0) {
    // 备份arr
    let temp = [];
    for (let i = 0; i < arr.length; i++) {
      temp.push(arr[i]);
    }
    arr = [];
    // 收集这一层级下的所有子集数据
    for (let i = 0; i < temp.length; i++) {
      if (temp[i][childKey] && temp[i][childKey].length > 0) {
        for (let j = 0; j < temp[i][childKey].length; j++) {
          arr.push(temp[i][childKey][j]);
        }
      }
    }

    if (arr.length > 0) {
      depth++;
    }
  }
  return depth;
}

//转意符换成普通字符
function convertIdeogramToNormalCharacter(val: string) {
  const arrEntities: any = { lt: "<", gt: ">", nbsp: " ", amp: "&", quot: '"' };
  return val.replace(/&(lt|gt|nbsp|amp|quot);/gi, function (all, t) {
    return arrEntities[t];
  });
}

// 获取富文本的纯文字内容
export const getPlainText = (richCont: string) => {
  const str = richCont;
  let value = richCont;
  if (richCont) {
    // 方法一：
    value = value.replace(/\s*/g, ""); //去掉空格
    value = value.replace(/<[^>]+>/g, ""); //去掉所有的html标记
    value = value.replace(/↵/g, ""); //去掉所有的↵符号
    value = value.replace(/[\r\n]/g, ""); //去掉回车换行
    value = value.replace(/&nbsp;/g, ""); //去掉空格
    value = convertIdeogramToNormalCharacter(value);
    return value;

    // 方法二：
    // value = value.replace(/(\n)/g, "");
    // value = value.replace(/(\t)/g, "");
    // value = value.replace(/(\r)/g, "");
    // value = value.replace(/<\/?[^>]*>/g, "");
    // value = value.replace(/\s*/g, "");
    // value = convertIdeogramToNormalCharacter(value);
    // return value;
  } else {
    return null;
  }
};

/**
 * @name:handleMergeCell
 * @description:处理合并单元格
 * @author: hanyuchen
 * @date 2024-03-21 15:26:56
 * @params {Array} row: 源数据
 * @params {Object} merge: 依赖关系,键依赖值相等
 * @params {Array} keys: 需要转换的字段
 */
export function handleMergeCell(
  row: any[] = [],
  merge: any = { key1: ["key2"] },
  keys: any[] = ["key1"]
) {
  keys.forEach((key) => {
    const hasMerge = !!merge[key]; //判断合并是否需要依赖关系

    let pos = 0;
    row[pos][`${key}Merge`] = { colspan: 1, rowspan: 1 };
    for (let i = 1; i < row.length; i++) {
      if (!row[i][`${key}Merge`]) row[i][`${key}Merge`] = { colspan: 1, rowspan: 1 };

      const prev_equal = row[i][key] === row[i - 1][key]; //与上一个相等
      const depend_every_equal =
        hasMerge && merge[key].every((item) => row[i][item] === row[i - 1][item]); //依赖上一个也相等
      const dependMerge = hasMerge ? depend_every_equal && prev_equal : prev_equal; // 判断是否需要依赖

      if (dependMerge) {
        row[pos][`${key}Merge`]["rowspan"] += 1;
        row[i][`${key}Merge`] = { colspan: 0, rowspan: 0 };
      } else {
        pos = i;
        row[pos][`${key}Merge`]["rowspan"] = 1;
      }
    }
  });

  return row;
}


/*
 * @name:pxToVw
 * @description:像素转vw
 * @author: hanyuchen
 * @date 2024/5/26
 * @params {Number} value: 像素值
 * @params {Number} unit: 参考单位
 */
export function pxToVw(value, unit = 1920) {
  //   100vw = unit
  //   1vw = unit/100  19.2px
  // vw =  36px / 19.2px
  return value / (unit / 100)
}
