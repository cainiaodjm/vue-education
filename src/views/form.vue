<template>
    <div class="form-wrapper">
        <Form :label-width="80">
            <FormItem label="姓名">
                <Input v-model="formData.name"></Input>
            </FormItem>
             <FormItem label="年龄">
                <Input v-model="formData.age"></Input>
            </FormItem>
        </Form>
    </div>
</template>
<script>
export default {
    data(){
        return {
            formData:{
                name:'',
                age:18
            }
        }
    }
}
</script>
