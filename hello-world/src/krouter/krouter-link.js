export default {
    props:{
        to:{
            type:String,
            required:true
        },
    },
    render(h){
        // <a href="#/about">123</a>
        // h(tag,data,children)
        return h('a',{attrs:{href:'#'+this.to}},this.$slots.default)
    }
}