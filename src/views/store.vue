<template>
<div>
    <!-- <a-input v-model="inputValue"/> -->
     <a-input :value='inputValue' @input="handleInput"/>
    <p>{{inputValue}}</p>
</div>
    
</template>
<script>
import AInput from "@/components/AInput.vue";
export default {
  name: "store",
  data(){
      return {
          inputValue:''
      }
  },
  components: {
    AInput
  },
  methods:{
      handleInput(val){
          this.inputValue=val
      }
  }
};
</script>
<style lang="less">
</style>
