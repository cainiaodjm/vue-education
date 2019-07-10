<template>
  <div class="form-wrapper">
    <Form ref="formValidate" :rules="rules" :model="formData" :label-width="80">
      <FormItem label="姓名" prop="name">
        <Input v-model="formData.name"/>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input v-model="formData.password" type="password"/>
      </FormItem>
      <FormItem>
        <Button @click="handleSubmit">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { addUser } from "@/api/data";
export default {
  /**
   * 1.首先需要给当前form定义验证规则 给item设置prop 对应规则中的键
   * 2.提交表单 需要重新验证
   * 3.给表单绑定modal 将数据对象传入
   */
  data() {
    return {
      formData: {
        name: "",
        password: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "The password cannot be empty",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.formValidate.validate(valid => {
        if (valid) {
          addUser(this.formData).then(res => {
            
          });
        }
      });
    }
  }
};
</script>
