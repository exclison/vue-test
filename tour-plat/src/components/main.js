
const list = require.context("./", true, /\.vue$/);

const components = list.keys().reduce((r,key)=>{
    const component = list(key)
    r[component.default.name] = component.default
    return r
    
},{});
export default components


