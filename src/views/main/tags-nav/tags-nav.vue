<template>
  <div class="tags-nav">
    <div class="close-con">关闭按钮</div>
    <div class="btn-con left-btn">
      <Button type="text">
        <Icon :size="18" type="ios-arrow-back" />
      </Button>
    </div>
    <div class="btn-con right-btn">
      <Button type="text">
        <Icon :size="18" type="ios-arrow-forward" />
      </Button>
    </div>
    <div class="scroll-outer">
      <div class="scroll-body">
        <Tag 
        type="dot"
        v-for="(item,index) in list"
        :key="`tag_nav-${index}`"
        :name="item.name"
        @on-close="handleClose(item)"
        >
        {{item.meta.title}}</Tag>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'TagNav',
  props:{
    value:Object,
    list:{
      type:Array,
      default:()=>{
        return []
      }
    }
  },
  methods: {
    handleClose(item){
      console.log(item)
    },
    showTitleInside(item){
        console.log(item)
      return 
    }
  },
};
</script>
<style lang="less">
@import './tags-nav.less';
</style>
