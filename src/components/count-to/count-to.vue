<template>
    <div>
        <span :id="eleId"></span>
    </div>
</template>
<script>
import CountUp,{ options } from 'countup'
export default {
    name:'CountTo',
    computed:{
        //为了保证每个count-up组件的id值唯一这里使用了vue中自带的_uid 会返回一个唯一值
        //
        eleId(){
            return `count_up_${this._uid}`
        }
    },
    props:{
        /**起始值 */
        startVal:{
            type:Number,
            default:0
        },
        /**结束值 */
         endVal:{
            type:Number,
            required:true,
            default:0
        },
        /**表示小数点后保留几位小数 */
        decimals:{
            type:Number,
            default:0
        },
        /**渐变时常 */
        duration:{
            type:Number,
            default:1
        }
    },
    mounted(){
        //mounted钩子是在Dom元素已经挂载上了,但是不能确定元素是否渲染完成
        //为了保证元素渲染完成。这边使用了this.$nextTick  当然你也可以使用
        //setTimeOut 20ms
        this.$nextTick(()=>{
            const counter=new CountUp(this.eleId,this.startVal,this.endVal,this.decimals,this.duration,{
                
            })
        })
    }
}

</script>
<style lang="less">
</style>

