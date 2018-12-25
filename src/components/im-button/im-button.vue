<template>
    <button :class="`im-button-size-`+size" @click="handleClick"  :disabled="disabled">
        <slot></slot>
    </button>
</template>
<script>
function oneOf (value, validList) {
    for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
        return true;
      }
    }
    return false;
  }
export default {
    
    name:'im-button',
    props:{
        size:{
            validator(value){
                
                return oneOf(value,['large','small','default'])
            },
            default:'default'
        },
        disabled:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        oneOf(value,validList){
            for(let i=0;i<validList.length;i++){
                if(value===validList[i]){
                    return true
                }
            }
            return false
        },
        handleClick(event){
            this.$emit('on-click', event);
        }
    }
}
</script>
<style lang="less">
    .im-button-size-small{
        width: 16px;
    }
    .im-button-size-large{
        width: 32px;
    }
    .im-button-size-default{
        width:  24px;
    }
</style>

