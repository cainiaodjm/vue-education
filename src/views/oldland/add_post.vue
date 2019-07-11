<template>
  <div>
    <div class="form-item">
      <span class="item-label">标题 *</span>
      <input  class="item-input"  placeholder="请输入标题"/>
      <div class="number-count">8/128</div>
    </div>
    <markdown-editor v-model="content"/>
    <div class="form-item">
      <span class="item-label">标签</span>
      <input  class="item-input"  placeholder="请输入标题"/>
      <div class="number-count">8/128</div>
    </div>
  </div>
</template>

<script>
import MarkdownEditor from '../../components/markdown'
export default {
  name: 'markdown_page',
  components: {
    MarkdownEditor
  },
  data () {
    return {
      content: ''
    }
  }
}
</script>

<style lang="less">
  .form-item{
    display: flex;
    flex-direction:column;
    margin-bottom: 8px;
    .item-label{
      color: #ccc;
      margin-bottom: 4px;
    }
    .item-input{
      border: none;
      background-color: #f5f7f9;
      outline: none;
      border-bottom: 1px solid #c3c3c3;
    }
    .number-count{
      text-align: right;
      font-size: 12px;
      color:#c3c3c3;

    }
  }
</style>
