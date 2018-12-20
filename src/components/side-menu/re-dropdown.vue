<template>
    <Dropdown  placement="right-start">
        <!-- <Tooltip :content="parent.title" placement="right"> -->
        <span class="drop-menu-span" :style="titleStyle">
            <Icon :size="20" :type="parent.icon" :color="iconColor" />
            <span v-if="showTitle">{{ parent.title }}</span>
        </span>
        <!-- </Tooltip> -->
        
        <DropdownMenu slot="list">
            <template v-for="item in parent.children">
                 <re-dropdown v-if="item.children"  :parent="item" :key="`drop_${item.name}`">
    
                 </re-dropdown>
                    <DropdownItem v-else :key="`drop_${item.name}`" :name="item.name">
                        <Icon :type="item.icon" color="#515a6e" :size="20"></Icon>
                        {{item.title}}
                    </DropdownItem>   
            </template>
        </DropdownMenu>
    </Dropdown>
</template>
<script>
export default {
    name:'ReDropdown',
    props:{
        parent:{
            type:Object,
            default:()=>{
                return {}
            }
        },
        showTitle:{
            type:Boolean,
            default:true
        },
        iconColor:{
            type:String,
            default:'#515a6e'
        }
    },
    computed:{
        titleStyle(){
            return {
                textAlign:this.showTitle ? 'left':"center",
                paddingLeft:this.showTitle ? '16px' : ''
            }
        }
    }
}
</script>
