import moduleList from '../api/index'

const mapApi = (namespace:string,methodList:string[])=>{
   
    if(!namespace || !methodList){
        throw new Error('params error')
    }

    const moduleItem = moduleList[namespace].default
    
    const list = methodList.reduce((total:ApiMathods,item)=>{
        const methodItem = moduleItem.apiMethods[item];
        total[item] = methodItem
        return total
    },{})

    return list

}

export default mapApi