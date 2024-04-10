/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2024-01-30 15:24:55
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2024-01-30 15:43:03
 * @FilePath: \lrx_h5\src\plugins\index.ts
 * @Description: 
 */
const modules = import.meta.glob("./*.ts", { eager: true, import: 'default' });


let moduleList: any = {};

Object.entries(modules).forEach(([k, v]) => {
  const moduleNameRegexp = k.match(/\/\w+\.ts$/);
  const moduleName = moduleNameRegexp
    ? moduleNameRegexp[0].substring(1, moduleNameRegexp[0].length - 3)
    : "";

  moduleList[moduleName] = v;
});

export default moduleList;
