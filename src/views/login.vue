<template>
  <div class="login">
    <div class="login-con">
      <Card>
        <p slot="title">欢迎登录</p>
        <div class="form-con">
          <Form ref="loginForm" :model="loginForm" :rules="loginRules">
            <FormItem prop="username">
              <Input type="text" v-model="loginForm.username" placeholder="Username" />
              <Icon size="16" type="ios-person-outline" slot="prepend"></Icon>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="loginForm.password" placeholder="Password" />
              <Icon size="16" type="ios-lock-outline" slot="prepend"></Icon>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="loginSubmit('loginForm')">Sign In</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>

import { mapActions } from "vuex";
export default {
  name: "login-view",
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "The password length cannot be less than 6 bits",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["login"]),
    loginSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.login({
            userName: this.loginForm.username,
            password: this.loginForm.password
          }).then(() => {
            this.$Message.success("Success");
            this.$router.push({
              name: "home"
            });
          });
        } else {
          this.$Message.error("Fail");
        }
      });
    }
  }
};
</script>

<style lang="less">
.login {
  width: 100%;
  height: 100%;
  position: relative;
  .login-con {
    width: 300px;
    position: absolute;
    right: 160px;
    top: 50%;
    background-color: pink;
    transform: translateY(-60%);
  }
}
</style>
