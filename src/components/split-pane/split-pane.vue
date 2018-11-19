<template>
    <div class="split-pane-wrapper" ref="outer">
        <div class="pane pane-left" :style="{width:leftOffsetPrecent}">
            <slot name="left"></slot>
        </div>
        <div class="pane-trigger-con" @mousedown="handleMousedown" :style="{left:triggerLeft,width:`${triggerWidth}px`}"></div>
        <div class="pane pane-right" :style="{left:leftOffsetPrecent}">
           <slot name="right"></slot>
        </div>
      
    </div>

</template>
<script>
export default {
    name:'SplitPane',
    data(){
        return {
            // leftOffset:0.3,
            canMove:false,
            initOffset:0
        }
    },
    computed:{
        leftOffsetPrecent(){
            return `${this.value*100}%`
        },
        triggerLeft(){
            // console.log(`calc(${this.value*100}% - ${this.triggerWidth/2}px)`)
                // return `calc(${this.leftOffset*100}%-${this.triggerWidth/2}px)`
                return `calc(${this.value*100}% - ${this.triggerWidth/2}px)`
        }
    },
    props:{
        triggerWidth:{
            type:Number,
            default:8
        },
        min:{
            type:Number,
            default:0.1
        },
        max:{
            type:Number,
            default:0.9
        },
        value:{
            type:Number,
            default:0.5
        }
    },
    methods:{
        handleClick(){
            this.leftOffset-=0.1
        },
        handleMousedown(event){
            //在trigger按下鼠标时,给document绑定事件
            document.addEventListener('mousemove',this.handleMousemove)
            document.addEventListener('mouseup',this.handeleMouseup)
            this.initOffset=event.pageX-event.srcElement.getBoundingClientRect().left
            this.canMove=true

        },
        handeleMouseup(){
            this.canMove=false
        },
        handleMousemove(event){
            //event.pageX 当前鼠标距离页面左侧的距离
            if(!this.canMove)return 
            const outerReact=this.$refs.outer.getBoundingClientRect()
            let offsetPercent=(event.pageX-this.initOffset+this.triggerWidth/2- outerReact.left)/outerReact.width
            if(offsetPercent<this.min){
                offsetPercent=this.min
            }
            if(offsetPercent>this.max){
                offsetPercent=this.max
            }
            // this.value=offsetPercent
            // this.$emit('input',offsetPercent)
            this.$emit('update:value',offsetPercent)
        }
    },

}
</script>
<style lang="less">
    .split-pane-wrapper{
        height: 100%;
        width: 100%;
        position: relative;
        .pane{
            height: 100%;
            position: absolute;
           
            top:0;
            // width: 50%;
            // float: left;
            &-left{
                // width: 30%;
                background-color: goldenrod;
            }
            &-right{
                // left: 30%;
                right: 0;
                bottom: 0;
                background-color: yellowgreen;
            }
        &-trigger-con{
            width: 8px;
            height: 100%;
            background-color: red;
            position: absolute;
            top: 0;
            z-index: 10;
            // user-select: none;
            cursor: col-resize;
        }
        }

    }
</style>

