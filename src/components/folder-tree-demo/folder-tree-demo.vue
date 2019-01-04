<template>
  <Tree class="folder-demo-wrapper" :data="folderTree" :render="renderFunc"></Tree>
</template>
<script>
/**
 * 1.获取文件夹列表和文件列表
 * 2.将文件放到每个对应的文件夹中
 * 3.将扁平的文件夹列表转化成树状结构
 * 4.根据Tree的自定义节点api来渲染节点。
 *   (1) 每个节点都有一个dropDrown
 *   (2) 文件夹节点 有文件夹图标
 *   (3) dropDrownMenu中渲染 操作按钮
 *   (4) 定义操作列表的数据(数据由父组件中获取)
 *   (5) 渲染操作列表,渲染操作列表是需要根据每个节点对应的节点类型来渲染的
 * 5.点击重命名按钮时,需要将title转换成input 并且在右边需要有确定和取消按钮
 *   (1)如何确定我们点击了哪个重命名呢？
 *      * 在我们渲染每个节点的时候 需要给每个节点都定义一个id
 *      * 利用dropdown的api 我们可以在Dropdown 中定义点击事件,会回调我们点击的按钮的name
 *      * 根据name 我们可以操作相应的操作
 *        当我们点击重命名时,我们就给id赋值
 *   (2)当点击重命名时 当前节点的isRenaming 就为true了 根据这个来显示节点内容]
 *   (3)当输入内容时 需要保存输入的内容
 *      * 保存输入的内容 需要传递事件给父组件
 * 
 *  
 *      
 *    
 *   
 *
 *
 */
import { putFileInFolder, transferFolderToTree,expandSpecifiedFolder } from "@/lib/util-demo";
import clonedeep from 'clonedeep'
export default {
  name: "folder-tree-demo",
  data() {
    return {
      folderTree: [],
      currentRenamingId:'',
      currentRenamingContent:'',
      renderFunc: (h, { root, node, data }) => {
        //当渲染完成以后每个节点都回有一个isRenaming
        //初始状态isRenaming都会false 因为currentRenamingId初始是""
          const isRenaming=this.currentRenamingId===`${data.type==="folder"?"folder":"file"}_${data.id}`
        //根据节点类型渲染不同的操作列表
        
        const dropList=data.type==="folder" ? this.folderDrop :this.fileDrop
        //渲染操作列表  
          //map
        const dropdownRender=dropList.map(item=>{
          //每条item都返回一个dropdownItem 
          return <dropdownItem name={item.name}>{item.title}</dropdownItem>
        })
        // const dropdownRender=
        //使用JSX来渲染
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
              isRenaming ? 
              <span>
                <i-input value={data.title} on-input={this.handleInput} class="tree-rename-input"></i-input>
                <i-button size="small" type="text" on-click={this.saveRename.bind(this,data)} > <icon type="md-checkmark"></icon> </i-button>
                 <i-button size="small" type="text" > <icon type="md-close"></icon> </i-button>
              </span> 
              :
               <span>{data.title}</span>
            }
            {dropList&&!isRenaming ? (
              <dropdown placement="right-start" on-on-click={this.handleDropdownClick.bind(this,data)}>
              <i-button size="small" type="text" class="tree-item-button">
                <icon type="md-more" size={12} />
              </i-button>
              <dropdownMenu slot="list">
              {dropdownRender}
              </dropdownMenu>
            </dropdown>
            ):''}

          </div>
        );
      }
    };
  },
  props: {
    folderList: {
      Type: Array,
      default: () => {
        return [];
      }
    },
    fileList: {
      Type: Array,
      default: () => {
        return [];
      }
    },
    folderDrop: Array,
    fileDrop: Array,
    beforeDelete:Function,
    beforeRename:Function
  },
  methods: {
    transData() {
      this.folderTree = transferFolderToTree(
        putFileInFolder(this.folderList, this.fileList)
      );
    },
    isFolder(type){
      return type==="folder"
    },
    handleDelete(data){
      const folderId = data.folder_id
      const isFolder=this.isFolder(data.type)
      let typeName=isFolder ? "folderList" :"fileList"
      let list=isFolder ? this.folderList :this.fileList
      //过滤没被删除的选项
      list=list.filter(item=>item.id!=data.id)
      this.$emit(`update:${typeName}`,list)
      this.$nextTick(() => {
        expandSpecifiedFolder(this.folderTree, folderId)
      })
    },
    handleDropdownClick(data,name){
      const folderId=data.folder_id
      if(name==="rename"){
        this.currentRenamingId=`${data.type==="folder" ? "folder" : "file"}_${data.id}`
      }else if(name==="delete"){
        this.$Modal.confirm({
          title:'提示',
          content:`您确定要删除${this.isFolder(data.type)?'文件夹':'文件'}《${data.title}》`,
          onOk:()=>{
            //首先判断父组件是否传递了删除api的方法
            this.beforeDelete ? this.beforeDelete().then(()=>{
              this.handleDelete(data)
            }).catch(()=>{
               this.$Message.error('删除失败')
            }):this.handleDelete(data)
           
          }
        })
      }
    },
    handleInput(value){
      this.currentRenamingContent = value
    },
    saveRename(data){
      const id=data.id
      const type=data.type
      //在这边需要判断当前节点是什么节点
      if(type=='folder'){
        //如果是目录节点
        const list=this.updateList(clonedeep(this.folderList),id)
        this.$emit('update:folderList',list)
      }else{
         const list=this.updateList(clonedeep(this.fileList),id)
          this.$emit('update:fileList',list)
      }
      this.currentRenamingId=''
    },
    updateList(list,id){
      //替换数据
      let i=-1
      let len=list.length
      while(++i<len){
        let folderItem=list[i]
        if(folderItem.id === id){
          folderItem.name=this.currentRenamingContent
          list.splice(i,1,folderItem)
          break
        }
      }
      return list
    }
  },
  watch: {
    folderList() {
      this.transData();
    },
    fileList() {
      this.transData();
    }
  },
  mounted() {
    this.transData();
  }
};
</script>

<style lang="less">
.folder-demo-wrapper {
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
