<template>
  <div>
    <folder-tree
      :folderList="folderList"
      :folderDrop="folderDrop"
      :fileList="fileList"
      :fileDrop="fileDrop"
    ></folder-tree>
    <folder-tree-demo 
    :folderList.sync="folderList"
    :fileList.sync="fileList"
    :folderDrop="folderDrop"
    :fileDrop="fileDrop"
    :beforeDelete="beforeDelete"
    :beforeRename="beforeRename"
       
    >
    </folder-tree-demo>
  </div>
</template>
<script>
import folderTree from "@/components/folder-tree";
import folderTreeDemo from '@/components/folder-tree-demo'
import { getFileList, getFolderList } from "@/api/data";
import { putFileInFolder, transferFolderToTree } from "@/lib/util";
export default {
  components: {
    folderTree,
    folderTreeDemo
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
  methods:{
    beforeDelete(){
      //在组件删除之前，传递删除api
      return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          let error=new Error('error')
          // let error=null
          if(!error){
            resolve()
          }else{
            reject(error)
          }
        },2000)
      })
    },
    beforeRename(){
       return new Promise((resolve,reject)=>{
        setTimeout(()=>{
          let error=new Error('error')
          // let error=null
          if(!error){
            resolve()
          }else{
            reject(error)
          }
        },2000)
      })
    }
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
