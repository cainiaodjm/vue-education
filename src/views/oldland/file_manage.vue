<template>
  <div>
    <Card>
      <Upload
        action="http://localhost:17100/v1/file/upload_file"
        :headers="_headers"
        name="file"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        multiple
      >
        <Button icon="ios-cloud-upload-outline">Upload files</Button>
      </Upload>

      <Table :columns="columns" :data="fileList"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="count" :current="1" 
          @on-page-size-change ="changePageSize"
          @on-change="changePage"
          show-sizer
          :page-size="pageSize"
          :page-size-opts="[5,10,15]"
          ></Page>

        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import { getFileList, getFile, getFileByGet } from "../../api/file";
import { fetch } from "whatwg-fetch";
import { encode, downloadFile, downloadFileByFrame } from "@/lib/util.js";
export default {
  name: "file_page",
  data() {
    return {
      fileList: [],
      _headers: {},
      count:0,
      file: {},
      pageSize:10,

      columns: [
        { title: "文件索引", key: "key" },
        {
          title: "oss链接",
          key: "oss_url",
          render: (h, { row }) => {
            return <span>{row.oss_url ? row.oss_url : "暂无"}</span>;
          }
        },
        { title: "oss路径", key: "oss_name" },
        { title: "文件名", key: "file_name" },
        { title: "文件类型", key: "file_type" },
        { title: "文件大小", key: "file_size" },
        { title: "用户ID", key: "user" },
        { title: "创建时间", key: "created_at" },
        {
          title: "操作",
          key: "handle",
          render: (h, { row }) => {
            return (
              <span>
                <i-button on-click={this.download.bind(this, row.key)}>
                  下载
                </i-button>
              </span>
            );
          }
        }
      ]
    };
  },
  mounted() {
    getFileList(0, 5).then(res => {
      if (res.err_code === 0) {
        console.log(res)
        this.fileList = res.result.fileList;
        this.count=res.result.count
      }
    });
  },
  methods: {
    handleSuccess() {
      this.$Message.success("文件上传成功");
    },
    changePage(e){
      
    },
    changePageSize(e){
      console.log(e)
    },
    beforeUpload(file) {
      this.file = file;
    },
    download(key) {
      const data = {
        key: key,
        type: "download",
        source: "local"
      };
      getFileByGet(data).then(res => {
        let fileName = res.dispositon.split(";")[1].split("=")[1];
        let blob = new Blob([res.data]);
        var downloadElement = document.createElement("a");
        var href = window.URL.createObjectURL(blob); //创建下载的链接
        downloadElement.href = href;
        downloadElement.download = fileName; //下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象
      });
    }
  },
  created() {
    console.log(encode());
    let data = {
      Authorization: encode()
    };

    this._headers = data;
  }
};
</script>
<style lang="less">
</style>
