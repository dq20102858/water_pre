<template>
  <div class="login-container">
    <el-form
      class="login-form"
      autocomplete="on"
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">系统登录</h3>
      </div>
      <el-form-item prop="username">
        <el-input
          name="username"
          type="text"
          v-model="loginForm.username"
          placeholder="username"
          autocomplete="off"
          clearable
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          name="password"
          type="password"
          @keyup.enter.native="handleLogin"
          v-model="loginForm.password"
          placeholder="password"
          autocomplete="off"
          clearable
        />
      </el-form-item>
      <el-button
        type="primary"
        style="width:100%;margin-bottom:30px; padding: 15px"
        :loading="loading"
        @click.native.prevent="handleLogin"
      >登录</el-button>
    </el-form>
  </div>
</template>
<script>
// import { isvalidUsername } from '@/utils/validate'
import { loginByUsername } from "@/api/login/login";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          {
            min: 2,
            max: 14,
            message: "请输入用户名长度在2到14个字符",
            trigger: "blur"
          }
        ],
        password: [
          {
            min: 2,
            max: 14,
            message: "请输入密码长度6到14个字符",
            trigger: "blur"
          }
        ]
      },
      passwordType: "password",
      loading: false,
      showDialog: false
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.loginForm.username == "") {
            this.$message({
              type: "error",
              message: "请输入用户名"
            });
            return false;
          }
          if (this.loginForm.password == "") {
            this.$message({
              type: "error",
              message: "请输入密码"
            });
            return false;
          }
          this.loading = true;
          this.$store
            .dispatch("LoginByUsername", this.loginForm)
            .then(() => {
              this.loading = false;
              this.$router.push({ path: "/" });
            })
            .catch(() => {
              this.loading = false;
              return false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style>
.login-container .el-input {
  display: inline-block;
  height: 53px;
  width: 100%;
}
.login-container .el-input input {
  background: none !important;
  border: 0px;
  -webkit-appearance: none;
  border-radius: 0px;
  padding: 12px 5px 12px 15px;
  color: #eee;
  height: 53px;
}
.login-container .el-input input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px #2d3a4b inset !important;
  -webkit-text-fill-color: #fff !important;
}
.login-container .el-form-item {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  color: #454545;
}

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #2d3a4b;
}
.login-container .login-form {
  position: absolute;
  left: 0;
  right: 0;
  width: 480px;
  padding: 35px 35px 15px 35px;
  margin: 120px auto;
}

.login-container .svg-container_login {
  font-size: 20px;
}
.login-container .title-container {
  position: relative;
}
.login-container .title-container .title {
  font-size: 26px;
  font-weight: 400;
  color: #eee;
  margin: 0px auto 40px auto;
  text-align: center;
  font-weight: bold;
}
</style>