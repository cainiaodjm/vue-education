<template>
    <div>
        <form-group :list="formList"></form-group>
    </div>
</template>
<script>
import formGroup from '@/components/form-group'
export default {
    components:{
        formGroup
    },
    data(){
        return {
            formList:[
                {
                    name:"name",
                    type:'i-input',
                    value:'Jack',
                    label:'姓名'
                },
                 {
                    name:"password",
                    type:'i-input',
                    value:'3423424',
                    label:'密码'
                },
                {
                    name:"range",
                    type:'slider',
                    value:[20,50],
                    range:[20,50],
                    label:'滑动'
                },
                {
                    name:"sex",
                    type:'i-select',
                    value:"",
                    label:'性别',
                    children:{
                        type:'i-option',
                        list:[
                            {value:'man',title:'男'},
                            {value:'woman',title:'女'}
                        ]
                    }
                }
            ]
        }
    }
}
</script>
<style lang="less">

</style>
