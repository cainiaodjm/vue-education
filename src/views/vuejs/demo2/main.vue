<template>
<div>
  <Card class="mall-wrapper">
    <p slot="title">商城demo</p>
    <Button @click="turnToCar">跳转到购物车页面</Button>
   <div class="product-list"> 
      <product class="product"  :info="product" v-for="(product,index) in products" :key="index"></product>
    </div>
  </Card>
</div>
</template>
<script>
import productData from './product'
import Product from './components/product'
export default {
  data(){
    return {
      products:[]
    }
  },
  components:{
    Product
  },
  mounted(){
    // console.log(productData)
    setTimeout(() => {
      this.products=productData
    }, 1000);
  },
  methods:{
    turnToCar(){
      let id = 'params' +(Math.random()*100).toFixed(0)
      this.$router.push({
        name:"demo2-cart",
        params:{
          id
        }
      })
    }
  }
}
</script>
<style lang="less">
  .product{
    width:  20%;
    display: flex;
    flex-direction: column;
    
  }
  .product-list{
    display: flex;
    flex-wrap: wrap;
  }
</style>
