export default{
    render(h){
        //获取path对应的component
        let component = null
        const {routeMap,current} = this.$router

        // const route = this.$router.$options.routes.find(route=>route.path === this.$router.current)
        component = routeMap[current].component || null
        // this.$router.$options.routes.forEach(route =>{
        //     if(route.path === this.$router.current){
        //         component = route.component
        //     }
        // })
        return h(component)
    },
}