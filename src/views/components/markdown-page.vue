<template>
<div class="markdown-wrapper">
    <div id="editor">
        <mavon-editor ref="md" style="height:100%"></mavon-editor>
    </div>
</div>
</template>
<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
    name:'markdown-page',
    components:{
        mavonEditor
    }
};
</script>
<style lang="less">
    .markdown-wrapper{
        margin: auto;
        width: 80%;
        height: 580px;
    }

</style>
