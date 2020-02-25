<template>
    <div ref="outerWrapper" :class="wrapperClasses">
        <div v-if="isHorizontal" :class="`${prefix}-horizontal`">
            <div class="l-pane" :style="{right:`${anotherOffset}%`}" :class="panelClasses">
                <slot name="left"/>
            </div>
            <div :class="`${prefix}-trigger-con`" :style="{left:`${offset}%`}"
            @mousedown="handleMousedown"
            >
                <slot name="trigger">
                    <trigger mode="vertical"></trigger>
                </slot>
            </div>
            <div class="r-pane" :style="{left:`${offset}%`}" :class="panelClasses">
                <slot name="right"></slot>
            </div>
        </div>
        <div v-else :class="`${prefix}-vertical`">

        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import {oneOf} from "../../lib/util";
    import {on, off} from '../../lib/dom'
    import Trigger from './trigger'
    export default {
        name:"Split",
        data(){
            return {
                prefix:"eva-split",
                offset:50,
                oldOffset:50,
            }
        },
        props:{
            value: {
                type: [Number, String],
                default: 0.5
            },
            mode:{
                validator(value){
                    return oneOf(value,['horizontal'])
                },
                default:"horizontal"
            },
            min:{
                type:[Number,String],
                default:'40px'
            },
            max:{
                type: [Number, String],
                default: '40px'
            }
        },
        components:{
            Trigger
        },
        computed:{
            wrapperClasses(){
                return [
                    `${this.prefix}-wrapper`,

                ]
            },
            isHorizontal(){
                return this.mode==='horizontal'
            },
            panelClasses(){
                return [
                    `${this.prefix}-pane`
                ]
            },
            anotherOffset(){
                return 100-this.offset
            },
            valueIsPx(){
                return typeof this.valueOf === 'String'
            },
            offsetSize(){
                return this.isHorizontal ? 'offsetWidth' : 'offsetHeight'
            },
            computedMin(){
                return this.getComputedThresholdValue('min')
            },
            computedMax(){
                return this.getComputedThresholdValue('max')
            }
        },
        /**
         * Mousemove 事件是当鼠标指针移动时触发的，即使是一个像素。这意味着多个事件在短时间内被触发。如果处理器做任何重大的处理，或者如果该事件存在多个处理函数，这可能造成浏览器的严重的性能问题。因此，优化mousemove处理程序尽可能，这一点很重要，当不再需要他们时应尽快解除绑定。

         一个常见的模式是在mousedown处理器内部绑定mousemove处理器，并在一个相应mouseup处理函数解除绑定。

         */
        methods:{
            getComputedThresholdValue(type){
                console.log(this);
                let size=this.$refs.outerWrapper[this.oldOffset]
                if(this.valueIsPx) return typeof this[type] ==='string' ? this[type] : size * this[type];
                else return typeof this[type] === "string" ? this.px2percent(this[type],size):this[type];

            },

            px2percent(numerator,denominator){
                return parseFloat(numerator)/parseFloat(denominator)
            },
            getAnotherOffset(value){
                let res=0;
                if(this.valueIsPx)res=`${this.$refs.outerWrapper[this.offsetSize]-parseFloat(value)}px`
                else res=1-value
                return res
            },
            handleMousedown(e){
                this.initOffset = this.isHorizontal ? e.pageX : e.pageY;

                this.oldOffset=this.value
                this.isMoving=true
                on(document,'mousemove',this.handleMove)
                on(document,'mouseup',this.handleUp)
                this.$emit('on-move-start')

            },
            handleMove(e){
                // console.log(e,'handleMove');
                let pageOffset=this.isHorizontal ? e.pageX :e.pageY
                console.log(pageOffset);
                let offset=pageOffset-this.initOffset
                console.log(offset);
                let outerWidth=this.$refs.outerWrapper[this.offsetSize];
                let value=this.valueIsPx ? `${parseFloat(this.oldOffset)+offset}px`:
                    (this.px2percent(outerWidth * this.oldOffset + offset, outerWidth));
                let anotherValue=this.getAnotherOffset(value)
                if(parseFloat(value)<=parseFloat(this.computedMin)) value=this.getMax(value,this.computedMin)
                if(parseFloat(anotherValue)<=parseFloat(this.computedMax))
                    value=this.getAnotherOffset(this.getMax(anotherValue,this.computedMax))
                e.atMin=this.value === this.computedMin
                e.atMax=this.valueIsPx ? this.getAnotherOffset(this.value) === this.computedMax:this.getAnotherOffset(this.value).toFixed(5)
                === this.computedMax.toFixed(5)
                this.$emit('input',value)
                this.$emit('on-moving',e)
            },
            handleUp(e){
                console.log(e,'handleUp');
            },
            getMax(value1,value2){
                if(this.valueIsPx) return `${Math.max(parseFloat(value1),parseFloat(value2))}`;
                else return Math.max(value1,value2)
            },
            getMin(value1,value2){
                if(this.valueIsPx) return `${Math.min(parseFloat(value1),parseFloat(value2))}`;
                else return Math.min(value1,value2);
            }
        }
    }
</script>
<style lang="less">
    @box-shadow: 0 0 4px 0 rgba(28, 36, 56, 0.4);
    @trigger-bar-background: rgba(23, 35, 61, 0.25);
    @trigger-background: #f8f8f9;
    @trigger-width: 6px;
    @trigger-bar-width: 4px;
    @trigger-bar-offset:(@trigger-width - @trigger-bar-width) / 2;
    @trigger-bar-interval: 3px;
    @trigger-bar-weight: 1px;
    @css-prefix:"eva-";
    @trigger-bar-con-height: (@trigger-bar-weight + @trigger-bar-interval) * 8;
    @split-prefix-cls: ~"@{css-prefix}split";
    .@{split-prefix-cls}{
        &-wrapper{
            position: relative;
            width: 100%;
            height: 100%;
        }
        &-pane{
            position: absolute;
            &.l-pane,&.r-pane{
                top: 0;
                bottom: 0;
            }
            &.l-pane{
                left: 0;
            }
            &.r-pane{
                right: 0;
            }
            &.t-pane{
                top: 0;
            }
            &.b-pane {
                bottom: 0;
            }
        }
        &-horizontal{

            .@{split-prefix-cls}-trigger-con{
                top:50%;
                height: 100%;
                width: 0;
            }
        }
        &-vertical{
            .@{split-prefix-cls}-trigger-con {
                left: 50%;
                height: 0;
                width: 100%;
            }
        }
        &-trigger{
            border: 1px solid #dcdee2;
            &-con{
                position: absolute;
                transform: translate(-50%, -50%);
                z-index: 10;
            }
            &-bar-con{
                position: absolute;
                overflow: hidden;
                &.vertical{
                    top: 50%;
                    transform:translate(0,-50%);
                }
                &.horizontal{
                    left: 50%;
                    top:@trigger-bar-offset;
                    width: @trigger-bar-con-height;
                    transform: translate(-50%, 0);
                }
            }
            &-horizontal{
                height: 6px;
                width: 100%;
                background-color: #f8f8f9;
                border-left: none;
                border-right: none;
                cursor: row-resize;
                .@{split-prefix-cls}-trigger-bar{
                    width: @trigger-bar-width;
                    height: 1px;
                    background: @trigger-bar-background;
                    float: left;
                    margin-top: @trigger-bar-interval;
                }
            }
            &-vertical {
                width: @trigger-width;
                height: 100%;
                background: @trigger-background;
                border-top: none;
                border-bottom: none;
                cursor: col-resize;
                .@{split-prefix-cls}-trigger-bar {
                    width: @trigger-bar-width;
                    height: 1px;
                    background: @trigger-bar-background;
                    float: left;
                    margin-top: @trigger-bar-interval;
                }
            }



        }
    }
</style>
