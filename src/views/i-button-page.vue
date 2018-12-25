<template>
    <div class="i-button-page">
        <div>测试ImButton</div>
        <!-- <im-button size="large" @on-click="handleClick">测试</im-button> -->
        <im-button size="large" @click.native="handleClick">测试</im-button>
    </div>
</template>
<script>
import ImButton from '@/components/im-button'
export default {
    name:'i-button-page',
    components:{
        ImButton
    },
    methods:{
        handleClick(){
            console.log('i-button-page')
        }
    }
}
</script>
<style lang="less">

</style>
