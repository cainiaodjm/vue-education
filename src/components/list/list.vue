<template>
   <ul>
    <li v-for="(item,index) in list" :key="`item_${index}`">
        <span v-if="!render"> {{item.name}}</span>
        <render-dom v-else :render-func="render" :name="item.name"></render-dom>
    </li>
   </ul>
</template>
<script>
import RenderDom from './render-dom.js'
export default {
    name:'List',
    data(){
        return{

        }
    },
    components:{
        RenderDom
    },
    props:{
        list:{
            type:Array,
            default:()=>[]
        },
        render:{
            type:Function,
            default:()=>{}
        }
    }
   
}
</script>
<style lang="less">

</style>

