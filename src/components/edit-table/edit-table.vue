<template>
  <Table :columns="columns" :data="data"></Table>
</template>
<script>
export default {
  name: "EditTable",
  props: {
    columns: {
      type: Array,
      default: () => {
        return []
      }
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mounted() {
    // const insideColumns = this.columns.map(item => {
    //   //需要编辑并且没有传递的render 就要我们自己去render可编辑的render
    //   if (!item.render && item.editable) {
    //     item.render = (h, { row, index, column }) => {
    //       return <div></div>
    //     }
    //     //否则直接返回item
    //   } else {
    //     return item
    //   }
    // })
  }
}
</script>
