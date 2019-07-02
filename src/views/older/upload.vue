<template>
    <div>
        <Upload :action="`${baseURL}/upload_file`">
            <Button type="primary" icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
    </div>
</template>

<script>
import {baseURL} from '@/config'
export default {
    name:'UploadView',
    data(){
        return {
            baseURL
        }
    }
}
</script>
<style lang="less">

</style>
