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
            /**
             * 对应表单域 Form 组件 model 里的字段，
             * 用于在校验或重置时访问表单组件绑定的数据，类型为 String。
             */
            type:String,
            default:''
        }
    }
}
</script>
<style lang="less">

</style>
