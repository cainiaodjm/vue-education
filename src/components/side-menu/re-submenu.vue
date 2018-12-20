<template>
    <Submenu :name="parent.name">
        <template slot="title">
            <Icon :type="parent.icon"/>
            {{parent.title}}
        </template>
        <template v-for="item in parent.children">
                <re-submenu 
                v-if="item.children" 
                :key="`menu_${item.name}`" 
                :name="item.name"
                :parent="item"
                >
                    <!-- 这里需要用到递归组件 -->
                    
                </re-submenu>
                <menu-item :key="`menu_${item.name}`" :name="item.name" v-else>
                    <Icon :type="item.icon"/>
                    {{item.title}}
                </menu-item>
        </template>
    </Submenu>
</template>
<script>
export default {
    name:'ReSubmenu',
    props:{
        parent:{
            type:Object,
            default:()=>{
                return {}
            }
        }
    }

}
</script>
