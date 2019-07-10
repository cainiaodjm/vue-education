<template>
    <div class="header-bar">
        <sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange"></sider-trigger>
        <custom-bread-crumb style="marginLeft:30px" :list="breadCrumbList"></custom-bread-crumb>
    </div>
</template>
<script>
import siderTrigger from './sider-trigger'
import customBreadCrumb from './custom-bread-crumb'
export default {
    name:'HeaderBar',
    components:{
        siderTrigger,
        customBreadCrumb
    },
    props:{
        collapsed:Boolean
    },
    methods:{
        handleCollpasedChange(state){
            this.$emit('on-coll-change',state)
        }
    },
    computed:{
        breadCrumbList(){
            return [
                {
                    icon:"md-home",
                    meta:{
                        hideInMenu:true,
                        icon:"md-home",
                        notCache:true,
                        title:"首页"
                    },
                    name: "home",
                    path: "/home",
                    to: "/home"
                },
                {
                    icon: "logo-buffer",
                    meta:{
                        icon: "logo-buffer",
                        title: "组件"
                    },
                    name: "components"
                },
                 {
                    icon: "_bear",
                    meta:{
                        icon: "_bear",
                       title: "自定义图标"
                    },
                    name: "icons_page"
                }
            ]
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
