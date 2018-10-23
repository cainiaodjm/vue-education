<template>
<div>
    <!-- <a-input v-model="inputValue"/> -->
     <a-input :value='inputValue' @input="handleInput"/>
    <!-- <p>{{inputValue}}</p> -->
    <p>inputValueLastLetter:{{inputValueLastLetter}}</p>
    <!-- <a-show :content="inputValue"></a-show> -->
    <p><span>Vuex->state->appName:</span>{{appName}}</p>  
    <p><span>user->state->userName:</span>{{userName}}</p>
    <p>getters->appWithVersion->{{appWithVersion}}</p>
</div>
    
</template>
<script>
import AInput from "@/components/AInput.vue";
import AShow from '@/components/AShow.vue'
import {mapState,mapGetters} from 'vuex'
export default {
  name: "store",
  data(){
      return {
          inputValue:''
      }
  },
  computed:{
    inputValueLastLetter(){
        return this.inputValue.substr(-1,1)
    },
    // appName(){
    //     return this.$store.state.appName
    // },
    // userName(){
    //     return this.$store.state.user.userName
    // }
    //展开操作符 
    // ...mapState([
    //     'appName',
    //     'userName'
    // ])
    ...mapState({
        appName:state=>state.appName,
        userName:state=>state.user.userName
    }),
    appWithVersion(){
        return this.$store.getters.appWithVersion
    }
  },
  components: {
    AInput,
    AShow
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
