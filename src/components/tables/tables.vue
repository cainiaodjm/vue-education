<template>
    <div class="tabels">
        <Table :columns="columns">

        </Table>
    </div>
</template>
<script>
export default {
    name:'Tables',
    props:{
        columns:{
            type:Array,
            default:()=>{
                return []
            }
        }
    }
}
</script>
<style lang="less">

</style>

