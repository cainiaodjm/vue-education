<template>
  <div>
    <tables :columns="columns"></tables>
  </div>
</template>
<script>
import { getTableData } from "@/api/data";
import Tables from "@/components/tables";
export default {
  name: "tables-page",
  components: {
    Tables
  },
  data(){
      return{
          columns:[
              {
                  title:'Name',
                  key:'name'
              },
              {
                  title:'Email',
                  key:'email'
              },
              {
                  title:'createTime',
                  key:'createTime'
              }
          ],
          tableData:[]
      }
  },
  mounted() {
    getTableData().then(res => {
      
    });
  }
};
</script>
