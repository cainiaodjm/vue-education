<template>
    <div :class="classes">
        <div :class="barClasses">
            <i :class="`${prefix}-bar`" v-once
            v-for="i in 8" :key="`trigger-${i}`"
            ></i>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        name:"Trigger",
        props:{
            mode:String
        },
        data(){

            return {
                prefix:"eva-split-trigger"
            }
        },
        computed:{
            isVertical(){
                return this.mode === "vertical"
            },
            classes(){
               return [
                   this.prefix,
                   this.isVertical ? `${this.prefix}-vertical`:
                       `${this.prefix}-horizontal`
               ]
            },
            barClasses(){
                return [
                    `${this.prefix}-bar-con`,
                    this.isVertical ? 'vertical' :'horizontal'
                ]
            }
        }
    }
</script>
<style lang="less">

</style>
