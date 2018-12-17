<template>
    <div class="layout-wrapper">
         <Layout class="layout-outer">
             <Sider breakpoint="sm" width="225" collapsed-width="90" collapsible hide-trigger v-model="collasped">Sider</Sider>
             <Layout>
                 <Header class="header-wrapper">
                     <Icon :class="triggerClasses" type="md-menu" :size="32" @click.native="handleCollasped"  />
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
export default {
    data(){
        return {
            collasped:false
        }
    },
    computed:{
        triggerClasses(){
            return [
                'trigger-icon',
                this.collasped ? 'rotate' :''
            ]
        }
    },
    methods:{
        handleCollasped(){
            this.collasped=!this.collasped
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
