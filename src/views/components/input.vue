<template>
    <Card>
        <g-input></g-input>
        <p>分页组件</p>
         <Tabs size="small">
        <TabPane label="标签一">标签一的内容</TabPane>
        <TabPane label="标签二">标签二的内容</TabPane>
        <TabPane label="标签三">标签三的内容</TabPane>
    </Tabs>
        <Pagination></Pagination>
        <div v-for="(i,)"></div>
    </Card>
</template>
<script>
import clonedeep from 'clonedeep'
    import gInput from '../../components/input'
    import Pagination from '../../components/Pagination'
    import {getFileList,getFolderList} from '@/api/data'
    import{putFileInFolder,transferFolderToTree} from '@/lib/util'
    export default {
        components:{
            gInput,
            Pagination
        },
        data(){
            return{
                
            }
        },
        created(){
           
           
            getFolderList().then(folder=>{
                this.folderList = folder
                getFileList().then(file=>{
                    this.fileList = file
                    this._normalizeTree(this.folderList,this.fileList)
                })
               
               
            })
        },
        mounted(){
         
            
        },
        methods:{
            _normalizeTree(folderList,fileList){
                let folderListClone = clonedeep(folderList)
                let fileListClone = clonedeep(fileList)
                console.log(this._transferFolderToTree(putFileInFolder(folderListClone,fileListClone))  )
             
            },
            _transferFolderToTree(folderList){
                let folderListClone = clonedeep(folderList)

                var handle = (id)=>{
                    folderListClone.forEach((folder))
                }
                return folderListClone

            }
        }
    }
</script>
