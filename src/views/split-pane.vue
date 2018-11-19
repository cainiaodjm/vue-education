<template>
    <div class="split-pane-con">
        <!-- <split-pane :value="offset" @input="handleInput" ></split-pane> -->
        <!-- <split-pane v-model="offset" ></split-pane> -->
        <split-pane :value.sync="offset"  >
            <div slot="left">
                <span>left</span>
            </div>
            <div slot="right">
                <span>right</span>
            </div>
        </split-pane>
    </div>
</template>
<script>
import SplitPane from '@/components/split-pane'
export default {
    components:{
        SplitPane
    },
    data(){
        return {
            offset:0.8
        }
    },
    methods:{
        // handleInput(value){
        //     this.offset=value
        // }
    }
}
</script>
<style lang="less">
    .split-pane-con{
        width: 400px;
        height: 200px;
        background-color: pink 
    }
</style>
