<template>
    <div>
        <slot name="left"></slot>
        <span ref="number" :class="countClass" :id="eleId"></span>
        <slot name="right"></slot>
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
        },
        countClass(){
            return[
                'count-to-number',
                this.className

            ]
        }
    },
    data(){
        return{
            counter:{}
        }
    },
    props:{
        /**
         * @description 设置动画延迟
         */
        delay:{
            type:Number,
            default:0
        },
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
        },
        /**是否使用变速效果 */
        useEasing:{
            type:Boolean,
            default:false
        },
         /**是否分组 */
        useGrouping:{
             type:Boolean,
            default:true
        },
        /**@description 分组符号 */
        separator:{
            type:String,
            default:','
        },
        /**
         * @description 整数和小数分割的符号
         */
        decimal:{
            type:String,
            default:'.'
        },
        className:{
            type:String,
            default:''
        }
    },
    watch:{
        endVal(newVal,oldVal){
            this.counter.update(newVal)
            setTimeout(()=>{
                //动画结束之后调用on-animation-end方法
                this.$emit('on-animation-end',Number( this.getCount()))
            },this.duration*1000+5)
        }
    },

    mounted(){
        //mounted钩子是在Dom元素已经挂载上了,但是不能确定元素是否渲染完成
        //为了保证元素渲染完成。这边使用了this.$nextTick  当然你也可以使用
        //setTimeOut 20ms
        this.$nextTick(()=>{
            this.counter=new CountUp(this.eleId,this.startVal,this.endVal,this.decimals,this.duration,{
                useEasing:this.useEasing,
                useGrouping:this.useGrouping,
                separator:this.separator,
                decimal:this.decimal
            })
            setTimeout(()=>{
                this.counter.start()
            },this.delay)
        })
    },
    methods:{
        getCount(){
            // console.log(this.$refs.number.innerText) 
            return this.$refs.number.innerText;
        }
    }
}

</script>
<style lang="less">
</style>

