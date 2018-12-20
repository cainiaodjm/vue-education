<template>
    <div class="layout-wrapper">
         <Layout class="layout-outer">
             <Sider breakpoint="sm" width="225" collapsed-width="70" collapsible hide-trigger v-model="collapsed">
                 <side-menu :list="menuList" :collapsed="this.collapsed">
                      
                 </side-menu>
             </Sider>
             <Layout>
                 <Header class="header-wrapper">
                     <!-- <Icon :class="triggerClasses" type="md-menu" :size="32" @click.native="handleCollasped"  /> -->
                     <header-bar :collapsed="this.collapsed"  @on-coll-change="handleCollapsedChange"></header-bar>
                 </Header>
                 <Content class="content-card">
                     <Card shadow class="page-card">
                         <router-view></router-view>
                     </Card>
                 </Content>
             </Layout>
         </Layout>
    </div>
</template>
<script>
import SideMenu from '@/components/side-menu'
import HeaderBar from '@/components/header-bar'
export default {
    components:{
        SideMenu,
        HeaderBar
    },
    data(){
        return {
            collapsed:false,
            menuList:[
                {
                    title:'内容管理',
                    icon:'ios-albums',
                    name:'content-manage',
                    children:[
                        {
                            title:'添加文章',
                            icon:'ios-albums',
                            name:'add-title'
                        }
                    ]
                },
                {
                    title:'仓库管理',
                    icon:'ios-albums',
                    name:'wh-manage'
                },
                 {
                    title:'财务管理',
                    icon:'ios-albums',
                    name:'finance-manage',
                    children:[
                        {
                            title:'账单管理',
                            icon:'ios-albums',
                            name:'bill-manage',
                            children:[
                                {
                                    name:'bill-create',
                                    title:'账单生成',
                                    icon:'ios-albums'
                                },
                                {
                                    name:'bill-table',
                                    title:'账单报表',
                                    icon:'ios-albums'
                                },
                            ]
                        },
                        {
                            name:'tax-manage',
                            title:'税务管理',
                            icon:'ios-albums'
                        }
                    ]
                }
            ]
        }
    },
    computed:{
        triggerClasses(){
            return [
                'trigger-icon',
                this.collapsed ? 'rotate' :''
            ]
        },
       
    },
    methods:{
         handleCollapsedChange(state){
            console.log('layout中的collapsed为'+state)
            console.log('我是调用header-bar的组件 我已经接收到了修改事件 并将修改后的值传给header-bar了')
            this.collapsed=state
        }
    }
}
</script>
<style lang="less">
    .layout-wrapper,.layout-outer{
        height: 100%;
        .header-wrapper{
            background-color: #ffffff;
            box-shadow: 0 1px 1px 1px rgba(0, 0, 0,.1);
            padding: 0 25px;
            .trigger-icon{
                cursor: pointer;
                transition: transform .3s ease;
                &.rotate{
                    transform: rotateZ(-90deg);
                    transition: transform .3s ease
                }
            }
        }
        .content-card{
            padding: 10px;
        }
        .page-card{
            min-height:~"calc(100vh - 84px)";
        }
    }
</style>
