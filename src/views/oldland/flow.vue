<template>
  <div>
    <Card class="handle-con" style="marginBottom:16px;">
      <Button type="primary" @click="addFlowModal=true">添加期刊</Button>
      <Modal v-model="addFlowModal" width="960">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>Delete confirmation</span>
        </p>
        <div style="text-align:center">
          <p>After this task is deleted, the downstream 10 tasks will not be implemented.</p>
          <p>Will you delete it?</p>
        </div>
        <div slot="footer">
          <Button type="success" size="large" long :loading="modal_loading" @click="addFlow">添加期刊</Button>
        </div>
      </Modal>
      <div class="search-con">
        <Select v-model="searchKey" style class="search-col">
          <Option
            v-for="item in column"
            v-if="item.key !== 'handle'"
            :value="item.key"
            :key="`search-col-${item.key}`"
          >{{ item.title }}</Option>
        </Select>
        <Input
          @on-change="handleClear"
          clearable
          placeholder="输入关键字搜索"
          class="search-input"
          v-model="searchValue"
        />
        <Button @click="handleSearch" class="search-btn" type="primary">
          <Icon type="search" />&nbsp;&nbsp;搜索
        </Button>
      </div>
    </Card>

    <Card>
      <Table :columns="column" :data="data"></Table>
    </Card>
  </div>
</template>
<script>
import { getFlowList } from "../../api/flow";
export default {
  name: "flow-page",
  data() {
    return {
      addFlowModal: false,
      modal_loading: false,
      column: [
        {
          title: "期刊号",
          key: "index"
        },
        {
          title: "标题",
          key: "title"
        },
        {
          title: "内容",
          key: "content"
        },
        {
          title: "图片",
          key: "image",
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  alignItem: "center",
                  padding: "8px"
                }
              },
              [
                h("img", {
                  attrs: {
                    src: `http://localhost:17100/${params.row.image}`
                  },
                  style: {
                    width: "50px",
                    height: "50px"
                  }
                })
                // h('strong', params.row.image)
              ]
            );
          }
        },
        {
          title: "喜欢人数",
          key: "fav_nums"
        },
        {
          title: "类型",
          key: "type",
          render: (h, params) => {
            let typeText = "";
            switch (params.row.type) {
              case 100:
                typeText = "电影";
                break;
              case 200:
                typeText = "音乐";
                break;
              case 300:
                typeText = "句子";
                break;
              default:
                break;
            }
            return h("div", {}, typeText);
          }
        },
        {
          title: "发布日期",
          key: "pubdate"
        }
      ],
      data: []
    };
  },
  methods: {
    addFlow() {
      this.modal_loading = true;
      setTimeout(() => {
        this.modal_loading = false;
        this.addFlowModal = false;
        this.$Message.success("添加成功");
      }, 1000);
    }
  },
  async mounted() {
    let res = await getFlowList();
    this.data = res.result;
    console.log(res.result);
    console.log(this.data);
  }
};
</script>
<style lang="less">
.search-con {
  padding: 10px 0;
  .search-col {
    width: 200px;
  }
  .search-input {
    width: 200px;
    margin-left: 4px;
  }
  .search-btn {
    margin-left: 4px;
  }
}
</style>

