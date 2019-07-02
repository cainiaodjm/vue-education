<template>
<div>
    <!-- <a-input v-model="inputValue"/> -->
     <a-input :value='inputValue' @input="handleInput"/>
    <!-- <p>{{inputValue}}</p> -->
   
    <p> <span>Vuex双向绑定:</span>
    <a-input :value='stateValue' @input="handleaStateValueChange"/> 
     {{stateValue}}
     </p>
     
  
    <p>inputValueLastLetter:{{inputValueLastLetter}}</p>
    <!-- <a-show :content="inputValue"></a-show> -->
    <p><span>Vuex->state->appName:</span>{{appName}}</p>  
    <p><span>user->state->userName:</span>{{userName}}</p>
    <p>getters->appWithVersion->{{appWithVersion}}</p>
    <p>通过接口改变appName: <button @click="changeByAction">changeByAction</button> </p>
    <p>通过mutation来改变appName: <button @click="setAppName">setAppName</button></p>
</div>
    
</template>
<script>
import AInput from "@/components/AInput.vue";
import AShow from '@/components/AShow.vue'
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
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
        userName:state=>state.user.userName,
        stateValue:state=>state.stateValue
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
      handleaStateValueChange(val){
          this.SET_STATA_VALUE(val)
      },
      handleInput(val){
          this.inputValue=val
      },
      ...mapActions({
          changeByAction:'getAppName'
        }
      ),
      ...mapMutations(
        //   {
        //   changeBy   Mutation:'setAppName',
        //   }
      ['setAppName','SET_STATA_VALUE'])

  }
};
</script>
<style lang="less">
</style>
