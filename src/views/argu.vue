<template>
<div>
    <!-- {{$route.params.name}} -->
    {{name}}
</div>
</template>

<script>
export default {
    props:{
        name:{
            type:String,
            default:'djm'
        }
    },
    beforeRouteUpdate(to,from,next){
        console.log(to.name,from.name)
    },
    beforeRouteLeave (to, from, next) {
        // ...
        next()
    }
}
</script>
<style lang="less">

</style>
