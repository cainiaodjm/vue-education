<template>
    <div>
        <list :list="list" :render="renderFunc"></list>
    </div>
</template>
<script>
import List from '@/components/list'
import CountTo from '@/components/count-to'
export default {
    data(){
        return {
            list:[
                {name:'jack'},
                {name:'tom'}
            ]
        }
    },
    components:{
        List
    },
     methods:{
        renderFunc(h,name){
            // return h('i',{
            //     style:{
            //         color:'pink',
            //     }
            // },name)
            //使用JSX渲染
            return (
                <i on-click={this.handleClick} style={{color:'pink'}}>{name}</i>
            )
        },
        handleClick(){
            console.log('click')
        }
    }
}
</script>
<style lang="less">

</style>
