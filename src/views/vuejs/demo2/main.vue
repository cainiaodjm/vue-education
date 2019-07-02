<template>
<div>
  <Card class="mall-wrapper">
    <p slot="title">商城demo</p>
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
    console.log(productData)
    setTimeout(() => {
      this.products=productData
    }, 1000);
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
