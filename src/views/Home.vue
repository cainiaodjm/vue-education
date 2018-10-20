<template>
  <div class="home">
    <span>{{food}}</span>
    <button @click="handleClick('back')">返回上一页</button>
    <button @click="handleClick('push')">跳转到argu</button>
     <button @click="handleClick('replace')">替换到parent</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  props:{
    food:{
      type:String,
      default:'apple'
    }
  },
  components: {
    HelloWorld
  },
  beforeRouteEnter (to, from, next) {
    //this
 // next(vm=>{
    //   console.log(vm)
    // })
    // console.log(this)
    next()
  },
  methods:{
    handleClick(type){
      if(type==='back'){
        this.$router.back()
      }else if (type==="push"){
        this.$router.push({
          name:'argu',
          params:{
            name:'djm'
          }
        })
      }else if(type==="replace"){
        this.$router.replace({
           name:'parent'
        })
      }
    }
  }
}
</script>
