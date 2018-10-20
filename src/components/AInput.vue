<template>
    <input @input="handleInput" :value="value"/>
</template>

<script>
export default {
    name:'AInput',
    data(){
        return {
            
        }
    },
    props:{
        value:{
            type:[String,Number],
            default:''
        }
    },
    methods:{
        //获取文本框中值 通过event对象  handleInput 绑定的是input 的方法 该方法回调一个event对象
        handleInput(event){
            const value=event.target.value
            this.$emit('input',value)  
        }
    }
}
</script>
