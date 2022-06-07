// import common from './common'
// import user from './user'

const modules = import.meta.globEager("./[^index]*.ts");

let moduleList: any = {};

Object.entries(modules).forEach(([k, v]) => {
    // console.log(k,v,'kkkkkk')
  const moduleNameRegexp = k.match(/\/\w+\.ts$/);
  const moduleName = moduleNameRegexp
    ? moduleNameRegexp[0].substring(1, moduleNameRegexp[0].length - 3)
    : "";

  moduleList[moduleName] = v;
});

// console.log(moduleList,'list')

export default moduleList;

// console.log(common.apiList,common.apiMethods,'common')