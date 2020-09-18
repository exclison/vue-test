export default {
    //解构上下文
    add({commit}){
        setTimeout(() => {
            commit('add')
        }, 1000);
    }
}