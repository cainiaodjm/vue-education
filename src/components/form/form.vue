<template>
  <form>
      <slot></slot>
  </form>
</template>
<script>
export default {
  name: "form",
  props: {
    model: {
      /**
       * 表单控件绑定的数据对象，
       * 在校验或重置时会访问该数据对象下对应的表单数据，类型为 Object。
       */
      type: Object,
      default: () => {
        return {};
      }
    },
    rules: {
      //表单验证规则
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>
<style lang="less">
</style>
