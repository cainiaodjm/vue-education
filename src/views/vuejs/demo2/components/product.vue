'<template>
  <div class="product-main" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <img :src="info.image" alt />
    <h4 :class="nameClasses" >{{info.name}}</h4>
    <div class="product-color" :style="{backgroundColor:colors[info.color]}"></div>
    <div class="product-price">
      {{info.cost}}
    </div>
    <div class="prodcut-add-cart" v-show="showCart">
      <Button size="small" to="/vuejs/demo2-cart" type="primary">加入购物车</Button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      colors: {
        '白色': "#ffffff",
        '金色': "#dac272",
        '蓝色': "#233472",
        '红色': "#f2352e"
      },
      showCart:false
    };
  },
  props: {
    info: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods:{
    handleMouseEnter(){
      
      this.showCart=true
    },
    handleMouseLeave(){
       this.showCart=false
    }
  },
  computed: {
    nameClasses(){
      return [
        'product-name',
        {
          ['hover-name']:this.showCart
        }
      ]
    }
  }
};
</script>
<style lang="less">

.product-main {
  display: block;
  margin: 16px;
  padding: 16px;
  cursor: pointer;
  border: 1px solid #dddee1;
  border-radius: 6px;
  overflow: hidden;
  background-color: #ffffff;
  text-align: center;
  position: relative;
  h4{
        color: #222;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  img{
    width: 100%;
    
  }
  .hover-name{
    color: #0070c9;
  }
  .product-color {
    display: block;
    width: 16px;
    height: 16px;
    border: 1px solid #dddee1;
    border-radius: 50%;
    margin: 6px auto;
  }
  .product-price{
        color: #de4037;
    margin-top: 6px;
  }
  .prodcut-add-cart{
    position: absolute;
    top: 4px;
    right: 4px;
  }
}
</style>

