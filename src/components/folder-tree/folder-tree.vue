<template>
  <Tree class="folder-wrapper" :data="folderTree" :render="renderFunc"></Tree>
</template>
<script>
import { getFileList, getFolderList } from "@/api/data";
import { putFileInFolder, transferFolderToTree } from "@/lib/util";
export default {
  name: "folder-tree",
  props: {
    folderList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    fileList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    folderDrop: Array,
    fileDrop: Array
  },
  methods: {
    transData() {
      this.folderTree = transferFolderToTree(
        putFileInFolder(this.folderList, this.fileList)
      );
    },
    handleDropdownClick(data,name){
      if(name==='rename'){
        this.currentRenamingId=`${data.type==="folder" ? "folder" : "file"}_${data.id}`
      }
    },
    handleInput(value){
      this.currentRenamingContent = value
    }
  },
  data() {
    return {
      folderTree: [],
      currentRenamingId:'',
      currentRenamingContent:'',
      renderFunc: (h, { root, node, data }) => {
        const dropList = data.type === "folder" ? this.folderDrop : this.fileDrop;
        //当前正在重命名的id === 当前节点的id
        const isRenaming= this.currentRenamingId === `${data.type==="folder" ? "folder" : "file"}_${data.id}`
        const dropdownRender = dropList.map(item => {
          return <dropdownItem name={item.name}>{item.title}</dropdownItem>;
        });
        /**
         * JSX渲染每个tree节点
         */
        return (
          <div class="tree-item">
            {data.type === "folder" ? (
              <icon
                type="ios-folder"
                color="#2d8cf0"
                style="marginRight:10px"
              />
            ) : (
              ""
            )}
            {
              /**如果正在重命名 显示输入框和两个按钮 */
             isRenaming
              ? 
              <span>
                <i-input value={data.title} on-input={this.handleInput} class="tree-rename-input"></i-input>
                <i-button size="small" type="text" > <icon type="md-checkmark"></icon> </i-button>
                 <i-button size="small" type="text" > <icon type="md-close"></icon> </i-button>
              </span>
            /** 否则显示当前节点名称**/
              : <span>{data.title}</span>
            }
            {dropList && !isRenaming ? (
              <dropdown placement="right-start" on-on-click={this.handleDropdownClick.bind(this,data)}>
                <i-button size="small" type="text" class="tree-item-button">
                  <icon type="md-more" size={12} />
                </i-button>
                <dropdownMenu slot="list">{dropdownRender}</dropdownMenu>
              </dropdown>
            ) : (
              ""
            )}
          </div>
        );
      }
    };
  },
  watch: {
    folderList() {
      this.transData();
    },
  },
  mounted() {
    this.transData();
  }
};
</script>
<style lang="less">
.folder-wrapper {
  width: 300px;
  .tree-item {
    display: inline-block;
    width: ~"calc(100% - 50px)";
    height: 30px;
    line-height: 30px;
    & > .ivu-dropdown {
      float: right;
    }
    ul.ivu-dropdown-menu {
      padding-left: 0;
    }
    li.ivu-dropdown-item {
      margin: 0;
      padding: 7px 16px;
    }
  }
}
</style>
