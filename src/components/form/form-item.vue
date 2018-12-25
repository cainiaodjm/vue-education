<template>
    <div>
        <label v-if="label">{{ label }}</label>
        <div>
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name:'form-item',
    props:{
        label:{
            //单个表单组件的标签文本
            type:String,
            default:''
        },
        prop:{
            //对应表单域 Form 组件 model 里的字段
            type:String,
            default:''
        }
    }
}
</script>
<style lang="less">

</style>
