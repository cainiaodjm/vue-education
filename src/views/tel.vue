<template>
    <div class="tel">
        tel:15068593795
        {{message}}
    </div>
</template>
<script>
export default {
    data(){
        return{
            message:''
        }
    },
    mounted(){
        //$on 给on-click绑定一个事件监听
        this.$bus.$on('on-click',mes=>{
            console.log(mes)
            this.message=mes
        })
    }
}
</script>
<style lang="less">
    .tel{
        border: 1px solid red;
    }
</style>
