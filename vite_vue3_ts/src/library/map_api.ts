import moduleList from '../api/index'

console.log(moduleList, "list");

const mapApi = (namespace:string,methodList:string[])=>{
    console.log(namespace,methodList,'nnnnnn')
    if(!namespace || !methodList){
        throw new Error('params error')
    }

    const moduleItem = moduleList[namespace].default
    
    // interface Total {
    //     [key:string]:()=>{}
    // }
    const list = methodList.reduce((total:ApiMathods,item)=>{
        const methodItem = moduleItem.apiMethods[item];
        total[item] = methodItem
        return total
    },{})

    return list

}

export default mapApi