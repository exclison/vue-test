import {$get,$post}  from '../library/ajax'

export default {
    install:(app:any)=>{
        Object.assign(app.config.globalProperties,{
            $get,
            $post
        })
    }
}