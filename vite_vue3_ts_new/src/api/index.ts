
const modules = import.meta.glob("./[^index]*.ts", { eager: true, import: 'default' });


let moduleList: any = {};

Object.entries(modules).forEach(([k, v]) => {
  
  const moduleNameRegexp = k.match(/\/\w+\.ts$/);
  const moduleName = moduleNameRegexp
    ? moduleNameRegexp[0].substring(1, moduleNameRegexp[0].length - 3)
    : "";

  moduleList[moduleName] = v;
});

export default moduleList;