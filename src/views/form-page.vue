<template>
    <div>
        <i-form :model="formValidate" :rules="rulesValidate">
            <i-form-item>

            </i-form-item>
        </i-form>
    </div>
</template>
<script>
import iForm from '@/components/form/form.vue'
import iFormItem from '@/components/form/form-item.vue'
export default {
    name:'form-page',
    components:{
        iForm,
        iFormItem
    },
    data(){
        return{
            formValidate:{
                name:'',
                mail:''
            },
            ruleValidate:{
                name:[
                    {require:true,message:'用户名不能为空',trigger:'blur'}
                ],
                mail:[
                    {require:true,message:'邮箱不能为空',trigger:'blur'},
                    {type:'email',message:'邮箱格式不正确',trigger:'blur'}
                ]
            }
        }
    }
}
</script>
