<template>
    <div class="side-menu-wrapper">
        <slot></slot>
        <Menu width="auto" theme="dark">
            <template v-for="item in list">
                <SubMenu v-if="item.children" :key="`menu_${item.name}`" :name="item.name">
                    <!-- 这里需要用到递归组件 -->
                </SubMenu>
                <menu-item :key="`menu_${item.name}`" :name="item.name" v-else>
                    {{item.title}}
                </menu-item>
            </template>
        </Menu>

    </div>
</template>
<script>
export default {
    name:'SideMenu',
    props:{
        collapsed:{
            type:Boolean,
            default:false
        },
        list:{
            type:Array,
            default:()=>{
                return []
            }
        }
    }
}
</script>

<style lang="less">
    .side-menu-wrapper{
        width: 100%;
    }
</style>
