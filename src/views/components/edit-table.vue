<template>
  <Card>
    <edit-table :columns="columns" :data="tableData"></edit-table>
  </Card>
</template>
<script>
import EditTable from '../../components/edit-table'
import {getUserList} from '../../api/user'
export default {
  name:"edit-table-view",
  data() {
    return {
      tableData:[],
      columns:[
        {key:"name",title:"姓名",editable:true},
        {key:"old",title:"年龄",editable:true},
        {key:"status",title:"状态"},
        {key:"created",title:"创建时间"},
      ]
    }
  },
  components:{
    EditTable
  },
  mounted() {
    getUserList().then((res)=>{
      if(res.err_code===0){
        this.tableData= res.result
      }
    })
  },
}
</script>