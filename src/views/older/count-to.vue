<template>
    <div class="count-to">
        <count-to ref="countTo" :end-val="endVal" :simplify="true" @on-animation-end="handleEnd">
           <span slot="left">金额:</span>
           <span style="marginLeft:2px" slot="right">元</span>
        </count-to>
        <button @click="getNumber">显示金额</button>
        <button @click="up">更新值</button>
        <span :title="currentVal">鼠标悬停几秒查看当前数字</span>
        <span>{{this.currenNumber}}</span>
    </div>
</template>
<script>
import CountTo from '@/components/count-to'
export default {
   name:'count-to-view',
   components:{
       CountTo
   },
   data(){
       return {
           endVal:100,
           currenNumber:this.currentVal
       }
   },
   methods:{
       getNumber(){
         console.log( this.$refs.countTo.getCount())
       },
       up(){
           this.endVal+=Math.random()*1000
       },
       handleEnd(endVal){
           console.log(endVal)
       }
   },
   computed:{
       currentVal(){
           let $endVal= Math.round(this.endVal)
           return `当前的数值为:${$endVal}`
       }
   }
}
</script>
<style lang="less">

</style>

