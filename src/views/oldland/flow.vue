<template>
  <div>
    <Card class="handle-con" style="marginBottom:16px;">
      <Button type="primary" @click="addFlowModal=true">添加期刊</Button>
      <Modal v-model="addFlowModal" width="960">
        <p slot="header" style="color:#f60;text-align:center">
          <span>添加期刊</span>
        </p>
        <Form ref="flowForm" :model="formItem" :label-width="80">
          <FormItem label="期刊标题">
            <Input v-model="formItem.title" placeholder="Enter something..." />
          </FormItem>
          <FormItem label="期刊类型">
            <Select v-model="formItem.flowType" @on-change="changeType">
              <Option value="100">电影</Option>
              <Option value="200">音乐</Option>
              <Option value="300">句子</Option>
            </Select>
          </FormItem>
          <FormItem label="发布日期">
            <Row>
              <Col span="11">
                <DatePicker
                  type="date"
                  placeholder="Select date"
                  @on-change="getPubdate"
                  v-model="formItem.date"
                ></DatePicker>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="期刊图片">
            <Upload
              ref="uploadImage"
              action="http://localhost:17000/v1/file/upload_file"
              :headers="_headers"
              name="file"
              :on-progress="handleProgress"
              :before-upload="beforeUploadImage"
              :on-success="handleSuccessImage"
              :show-upload-list="false"
              multiple
            >
              <Button icon="ios-cloud-upload-outline">上传图片</Button>
            </Upload>
            <div
              class="upload-img-item"
              v-for="(item,index) in defaultImageList"
              :key="`img_${index}`"
            >
              <img :src="item.url" />
              <div class="upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
            </div>
          </FormItem>
          <FormItem label="音乐链接" v-show="formItem.flowType == 200">
            <Upload
              action="http://localhost:17000/v1/file/upload_file"
              :headers="_headers"
              name="file"
              :on-progress="handleProgress"
              :before-upload="beforeUploadMusic"
              :on-success="handleSuccessMusic"
              multiple
            >
              <Button icon="ios-cloud-upload-outline">上传音乐(mp3格式)</Button>
            </Upload>
          </FormItem>
          <FormItem label="期刊内容">
            <Input
              v-model="formItem.content"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="Enter something..."
            />
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="success" size="large" long :loading="modal_loading" @click="addFlow">确认</Button>
        </div>
      </Modal>
        <div class="search-con">
        <Select v-model="searchKey" style class="search-col">
          <Option
            v-for="item in column"
            v-if="item.key === 'title' || item.key === 'content'"
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
import {
  getFlowList,
  addFlowMoveAndSentence,
  addFlowMusic
} from "../../api/flow";
import { encode } from "@/lib/util.js";
export default {
  name: "flow-page",
  data() {
    return {
      searchKey: "",
      music_url: "",
      defaultImageList: [],
      image_url: "",
      formItem: {
        flowType: "",
        title: "",
        select: "",
        radio: "male",
        checkbox: [],
        switch: true,
        date: "",
        time: "",
        slider: [20, 50],
        content: ""
      },
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
                    src: `${params.row.image}`
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
    changeType(type) {
      this.formItem.flowType = type;
      console.log(this.formItem.flowType);
    },
    beforeUploadMusic(file) {
      if (file.type !== "audio/mp3") {
        this.$Message.error("文件格式不对,需要为mp3格式的哦");
        return false;
      }
    },
    handleRemove() {},
    handleView() {},
    beforeUploadImage(file) {
      let regex = /\/(gif|jpg|jpeg|png|GIF|JPG|PNG)$/;
      if (!regex.test(file.type)) {
        this.$Message.error("文件格式不对,需要为图片格式的哦");
        return false;
      }
    },

    handleProgress(event, file, fileList) {
      console.log(event, file, fileList);
    },
    handleSuccessMusic(res, file, fileList) {
      if (res.err_code === 0) {
        this.music_url = res.result.oss_url;
        this.$Message.success("文件上传成功");
      }
    },
    handleSuccessImage(res, file, fileList) {
      if (res.err_code === 0) {
        this.image_url = res.result.oss_url;
        this.$Message.success("文件上传成功");

        let obj = {
          url: res.result.oss_url
        };
        if (this.defaultImageList.length > 0) {
          this.defaultImageList = [obj];
        } else {
          this.defaultImageList.push(obj);
        }
      }
    },
    handleClear() {},
    getPubdate(date) {
      this.formItem.date = date;
    },
    addFlow() {
      this.modal_loading = true;
      if (this.formItem.flowType == 200) {
        addFlowMusic({
          title: this.formItem.title,
          content: this.formItem.content,
          type: this.formItem.flowType,
          image: this.image_url,
          musicUrl: this.music_url,
          pubdate: this.formItem.date
        }).then(res => {
          if (res.err_code === 0) {
            this.modal_loading = false;
            this.addFlowModal = false;

            this.$Message.success("添加成功");
            this.$refs['flowForm'].resetFields()
            this.
            getFlowList().then(res => {
              if (res.err_code === 0) {
                this.data = res.result;
              }
            });
          }
        });
      } else {
        addFlowMoveAndSentence({
          title: this.formItem.title,
          content: this.formItem.content,
          type: this.formItem.flowType,
          image: this.image_url,
          pubdate: this.formItem.date
        }).then(res => {
          if (res.err_code === 0) {
            this.modal_loading = false;
            this.addFlowModal = false;

            this.$Message.success("添加成功");
            getFlowList().then(res => {
              if (res.err_code === 0) {
                this.data = res.result;
              }
            });
          }
        });
      }
    }
  },
  created() {
    let data = {
      Authorization: encode()
    };

    this._headers = data;
  },
  async mounted() {
    let res = await getFlowList();
    this.data = res.result;
    console.log(res.result);
    console.log(this.data);
  }
};
/**
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






 */
</script>
<style lang="less">
.upload-img-item:hover .upload-list-cover {
  display: block;
}
.upload-img-item {
  .upload-list-cover {
    position: absolute;
    width: 100%;
    height: 100%;
    display: none;
    background: rgba(0, 0, 0, 0.6);
    left: 0;
    top: 0;
    i {
      color: #fff;
      font-size: 20px;
      cursor: pointer;
      margin: 0 2px;
    }
  }
  display: inline-block;
  width: 60px;
  height: 60px;
  margin-top: 4px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
  img {
    width: 100%;
    height: 100%;
  }
}
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

