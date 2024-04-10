/*
 * @Author: Hanyuchen e-exclison@outlook.com
 * @Date: 2024-01-30 15:24:55
 * @LastEditors: Hanyuchen e-exclison@outlook.com
 * @LastEditTime: 2024-01-30 15:46:44
 * @FilePath: \lrx_h5\src\library\map_api.ts
 * @Description: 
 */
import moduleList from '../api/index'

const mapApi = (namespace:string,methodList:string[])=>{
   
    if(!namespace || !methodList){
        throw new Error('params error')
    }

    const moduleItem = moduleList[namespace]
    
    const list = methodList.reduce((total:ApiMathods,item)=>{

        const methodItem = moduleItem.apiMethods[item];
        total[item] = methodItem
        return total
    },{})

    return list

}

export default mapApi