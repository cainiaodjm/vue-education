<template>
    <div :class="wrapClasses">
        <input type="text" :class="inputClasses">
    </div>
</template>
<script>
    const prefixCls = 'g-input';
    export default {
        name:'',
        data() {
            return {
                
            }
        },
        computed: {
            wrapClasses(){
                return [
                    `${prefixCls}-wrapper`,
                ]
            },
            inputClasses(){
                return [
                    `${prefixCls}`
                ]
            }
        },
    }
</script>
<style lang="less">
    @css-prefix: g-;
    @input-prefix-cls: ~"@{css-prefix}input";
    @height:32px;
    .@{input-prefix-cls}{
        height: @height;
        &-wrapper{
            display: inline-block;
            width: 100%;
            position: relative;
            vertical-align: middle;

            // #2149 & #2219
            line-height: normal;
        }
    }

</style>
