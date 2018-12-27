<template>
  <div>
    <folder-tree
      :folderList="folderList"
      :folderDrop="folderDrop"
      :fileList="fileList"
      :fileDrop="fileDrop"
    ></folder-tree>
  </div>
</template>
<script>
import folderTree from "@/components/folder-tree";
import { getFileList, getFolderList } from "@/api/data";
import { putFileInFolder, transferFolderToTree } from "@/lib/util";
export default {
  components: {
    folderTree
  },
  data() {
    return {
      folderTree: [],
      folderList: [],
      fileList: [],
      folderDrop: [
        {
          name: "rename",
          title: "重命名"
        },
        {
          name: "delete",
          title: "删除文件夹"
        }
      ],
      fileDrop: [
        {
          name: "rename",
          title: "重命名"
        },
        {
          name: "delete",
          title: "删除文件"
        }
      ]
    };
  },
  mounted() {
    //一次性请求多个
    Promise.all([getFileList(), getFolderList()]).then(res => {
      this.fileList = res[0].data;
      this.folderList = res[1].data;
    });
  }
};
</script>
