<template>
    <div class="input-option">
        <span class="name">{{name}}</span>
        <input type="text" v-model="inputValue">
    </div>
</template>
<script>
export default {
    name:'input-option',
    props:{
        name:{
            type:String,
        },
        value:null
    },
    data(){
        return {
            inputValue:this.value
        }  
    },
    watch:{
        inputValue(newValue){

            this.$emit('update:value',newValue)
        }
    }
}
</script>
<style lang="less">
    .input-option{
        display: flex;
        width: 100%;
        height: 100%;
        justify-content:space-between;
        align-items: stretch;
        padding-left: 15px;
        .name{
            flex: 1 1 auto;
            display: inline-flex;
            align-items: center
        }
        input{
            flex: 0 1 auto;
            width: 10rem;
            padding-left: 0.8rem;
            background-color:#ffffff;
            border-left: 1px solid rgba(0, 0, 0, .1);
            box-shadow: 0 0 1px 1px #eee inset;
            outline: none;
            &:focus{
                border: 1px solid  #3b99fc;
            }
        }
    }
</style>
