<template>
  <div :class="classes">
    <div :class="barConClasses">
      
    </div>
  </div>
</template>
<script>
export default {
  name: "Trigger",
  data() {
    return {
      prefix: "ivu-split-trigger"
    };
  },
  props: {
    mode: String
  },
  computed: {
    isVertical() {
      return this.mode === "vertical";
    },
    classes() {
      return [
        this.prefix,
        this.isVertical ? `${this.prefix}-vertical` : `${this.prefix}-horizonal`
      ];
    },
    barConClasses() {
      return [
        `${this.prefix}-bar-con`,
        this.isVertical ? "vertical" : "horizontal"
      ];
    }
  }
};
</script>
