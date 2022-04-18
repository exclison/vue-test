/*
 * @name:App
 * @description:
 * @auth:hanyuchen
 * @date: 2022-04-18 10:32
*/
<template>
    <div class="App">
        <h1>这是Vue3+ts</h1>
        <img src="./assets/images/404.png" alt="">
    </div>
</template>

<script lang="ts">
import { ref , onMounted, defineComponent } from "vue";
export default defineComponent({
    name: "App",
    
    setup(props, ctx) {
        
        onMounted(()=>{
            console.log(122)
        })
        
        return {
        };
    },
});
</script>

<style scoped lang="less">

.App{

}
</style>
