
/**
 * @description:自动同步文件夹下的vue单文件组件
 * @rule : 以组件name选项为组件名
 * @author: hanyuchen
 * @date 2022-08-10 09:14:28
 */
const modules = import.meta.glob("./*/*.vue", { eager: true, import: 'default' });


let moduleList: any = {};

Object.entries(modules).forEach(([k, v]: any[]) => {
  const moduleName = v.name

  moduleList[moduleName] = v;
});

export default moduleList;
