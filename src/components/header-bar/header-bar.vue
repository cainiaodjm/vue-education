<template>
    <div class="header-bar">
        <sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange"></sider-trigger>
    </div>
</template>
<script>
import siderTrigger from './sider-trigger'
export default {
    name:'HeaderBar',
    components:{
        siderTrigger
    },
    props:{
        collapsed:Boolean
    },
    methods:{
        handleCollpasedChange(state){
            console.log('header-bar中的collapsed'+state)
            console.log('我是sider-trigger的父组件 我已经接收到了on-change事件并且知道sider-trigger想把collapsed时设置成!collapsed了')
            console.log('因为collapsed也是由我的父组件传递过来的(layout.vue) 再次将改动事件抛出')
            this.$emit('on-coll-change',state)
        }
    }
}
</script>
<style lang="less">
    .header-bar{
        width: 100%;
        height: 100%;
    }
</style>
