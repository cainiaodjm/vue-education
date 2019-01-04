<template>
    <Form :label-width="labelWidth">
        <FormItem v-for="(item,index) in list" 
        :key="`${_uid}_${index}`"
        :label="item.label"
        label-position="left"
        >
        <component :is="item.type" :value="item.value" :range="item.range" v-model="item.value"></component>
        <!-- <Input v-if="item.type=='input'"></Input> -->
        <!-- <component v-for="(item,i) in item.chidren"></component> -->
        </FormItem>
    </Form>
</template>
<script>
export default {
    name:'FormGroup',
    props:{
        list:{
            type:Array,
            default:()=>{
                return []
            }
        },
        labelWidth:{
            type:Number,
            default:100
        }
    },
}
</script>
