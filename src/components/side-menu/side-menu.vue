<template>
    <div class="side-menu-wrapper">
        <slot></slot>
        <Menu v-show="!collapsed" width="auto" @on-select="handleSelect" theme="dark">
            <template v-for="item in list">
                <re-submenu 
                v-if="item.children" 
                :key="`menu_${item.name}`" 
                :name="item.name"
                :parent="item"
                >
                </re-submenu>
                <menu-item :key="`menu_${item.name}`"  :name="item.name" v-else>
                    <Icon :type="item.icon"/>
                    {{item.meta.title}}
                </menu-item>
            </template>
        </Menu>
        <div v-show="collapsed" class="drop-wrapper">
            <template v-for="item in list">
                <re-dropdown v-if="item.children" :show-title="false" icon-color="#fff" :parent="item" :key="`drop_${item.name}`">

                </re-dropdown>
                <Tooltip v-else transfer :content="item.title" placement="right" :key="`drop_${item.name}`">
                    <span class="drop-menu-span">
                        <Icon :size="20" color="#fff" :type="item.icon" />
                    </span>
                </Tooltip>
            </template>
        </div>
    </div>
</template>
<script>
import ReSubmenu from './re-submenu.vue'
import ReDropdown from './re-dropdown.vue'
export default {
    name:'SideMenu',
    components:{
        ReSubmenu,
        ReDropdown
    },
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
    },
    methods:{
        handleSelect(name){
            this.$emit('on-select',name)
        }
    }
}
</script>

<style lang="less">
    .side-menu-wrapper{
        width: 100%;
        .ivu-tooltip,.drop-menu-span{
            width: 100%;
            display: block; 
            // color: #ffffff;
            text-align: center;
            padding:5px 0px; 
        }
    }
    .drop-wrapper > .ivu-dropdown{
        display: block;
        margin: 0 auto;
        padding: 5px 0px;
    }
</style>
