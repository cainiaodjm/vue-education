<template>
    <div class="email">
        <button @click="handleClick">按我</button>
        email@djm.com

    </div>
</template>
<script>
export default {
    mounted(){
       
    },
    methods:{
        handleClick(){
            // console.log('hello')
            //触发当前实例上的一些事件
            this.$bus.$emit('on-click','hello')
        }
    },
    mounted(){
        this.$bus.$on('on-click',mes=>{
            console.log(mes)
        })
    }
}
</script>
<style lang="less">
    .email{
        border: 1px solid green;
    }
</style>

