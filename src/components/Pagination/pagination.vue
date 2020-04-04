<template>
    <div class="ro-pagination">
        <Button  type="text">
            <Icon type="ios-arrow-back" />
        </Button>
        <Button v-for="(page,index) in pages" :key="index" type="text">{{page}}</Button>
         <Button  type="text">
            <Icon type="ios-arrow-forward" />
        </Button>
    </div>
</template>
<script>
export default {
    name:"Pagination",
    data(){

        let pages =this._unique(
            [1,this.pageSize,
            this.current,this.current+1,
            this.current+2,this.current-1,
            this.current-2].sort((a,b)=>{
            return a-b
        })).reduce((pre,cur,index,array)=>{
            pre.push(cur)
            array[index+1]-array[index]>1 && array[index] && pre.push('...')
            return pre
        },[])
      
        return {
            pages
        }
    },
    props:{
        total:{
            type:Number,
            default:1
        },
        pageSize:{
            type:Number,
            default:10
        },
        current:{
            type:Number,
            default:3
        },
        hideOnSinglePage:{
            type:Boolean,
            default:true
        }
    },
    methods:{
        _unique(array){
           
            let obj ={}
            array.map(item=>{
                obj[item]=true
            })
            return Object.keys(obj).map((item)=>{
               return parseInt(item)
            })
        }
    },
    computed:{
        _pageSize(){
            let ret=[]
            for(let i=1;i<=this.pageSize;i++){
                ret.push(i)
            }
            return ret
        }
    }
}
</script>
.<style lang="less">
    .el-pagination{
        white-space: nowrap;
        padding: 2px 5px;
        color: #303133;
        font-weight: 700;
    }
</style>