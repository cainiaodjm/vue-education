<template>
  <a @click="handleChange" :class="['sider-trigger-a',collapsed ? 'collapsed':'']">
    <Icon :type="icon" :size="size"/>
  </a>
</template>
<script>
export default {
  name: "SiderTrigger",
  methods: {
    handleChange() {
        //请求父组件去修改collapsed的值,想修改成什么样的数据 回调给父组件
        this.$emit('on-change',!this.collapsed)
    }
  },
  props: {
    collapsed:Boolean,
    icon: {
      type: String,
      default: "md-menu"
    },
    size: {
      type: Number,
      default: 26
    }
  }
};
</script>
<style lang="less">
@import "./sider-trigger.less";
</style>
