<template>
  <div class="custom-bread-crumb">
    <Breadcrumb :style="{fontSize:`${fontSize}px`}">
      <BreadcrumbItem to="/" v-for="item in list" :to="item.to" :key="`bread-crumb-${item.name}`">
        <common-icon style="margin-right:4px" :type="item.icon"></common-icon>
        <!-- 后续这里需要判断是什么语言的来进行切换 -->
        {{item.meta.title}}
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>
<script>
import CommonIcon from '@/components/common-icon'

export default {
  name: "customBreadCrumb",
  components:{
      CommonIcon
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    fontSize: {
      type: Number,
      default: 14
    },
    showIcon: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style lang="less">
.custom-bread-crumb {
  display: inline-block;
  vertical-align: top;
}
</style>
