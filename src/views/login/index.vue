<template>
  <div class="login-container">
    <div
      class="mod-new-reg-bg"
      :style="{backgroundImage:'url('+require('@/assets/image/icon-login-bg.png')+')'}"
    ></div>
    <div class="login-form">
      <div class="title-container">
        <img :src="require('@/assets/image/logo.png')" />
      </div>
      <div class="corpname">南通智能污水处理站监控系统</div>
      <el-form autocomplete="off" :model="loginForm" :rules="loginRules" ref="loginForm">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
            autocomplete="new-password"
            clearable  maxlength="20"
          >
            <template slot="prepend">
              <img :src="require('@/assets/image/icon-login1.png')" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="登录密码"
            autocomplete="new-password" maxlength="20"
            clearable
          >
            <template slot="prepend">
              <img :src="require('@/assets/image/icon-login2.png')" />
            </template>
          </el-input>
        </el-form-item>
        <el-button
          type="primary"
          style="width:100%;margin-bottom:30px; padding: 15px"
          :loading="loading"
          @click.native.prevent="handleLogin"
        >登录</el-button>
      </el-form>
    </div>
  </div>
</template>
<script>
// import { isvalidUsername } from '@/utils/validate'
import { loginByUsername } from "@/api/login/login";
export default {
  name: "login",
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
            message: "请输入用户名",
            trigger: "blur"
          }
          //,
          // {
          //   pattern: /^[\u4e00-\u9fa5A-Za-z0-9\_]*$/,
          //   message: "请输入正确的用户名",
          //   trigger: "blur"
          // }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },
      passwordType: "password",
      loading: false,
      showDialog: false
    };
  },
  created() {},
  methods: {
    handleLoginBlur(id, val) {
      this.disabled = !this.disabled;
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          if (this.loginForm.username.trim().length == "") {
            this.$message({
              type: "error",
              message: "用户名或密码错误"
            });
            return false;
          }
          if (this.loginForm.password.trim().length  == "") {
            this.$message({
              type: "error",
              message: "用户名或密码错误"
            });
            return false;
          }
          this.loading = true;
          this.$store
            .dispatch("LoginByUsername", this.loginForm)
            .then(() => {
              this.loading = false;
              this.$router.push({ path: "/sitemanage" });
              sessionStorage.setItem("activeMenu", "/sitemanage");
            })
            .catch(() => {
              this.loading = false;
              return false;
            });
        } else {
          console.log("error submit");
          return false;
        }
      });
    }
  }
};
</script>
<style>
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: #2d3a4b;
}
.mod-new-reg-bg {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-size: cover;
  background: none\9;
  *background: 0 0;
}

.login-container .login-form {
  position: absolute;
  left: 0;
  right: 0;
  width: 500px;
  padding: 35px 50px 30px 50px;
  margin: 200px auto;
  background: #fff;
  border-radius: 12px;
}
.login-container .corpname {
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  color: #777;
  margin-bottom: 30px;
}
.login-container .title-container {
  text-align: center;
  margin-bottom: 35px;
}
.login-container .title-container img {
  margin: 0 auto;
  width: 88px;
}
.login-container .el-form-item {
  margin-bottom: 40px;
}
.login-container .el-input-group__prepend {
  border: 1px #338ff6 solid;
  background: #fff;
  padding: 0 5px;
  border-right: 0;
}
.login-container .el-input-group__prepend img {
  width: 32px;
}
.login-container .is-error .el-input-group__prepend {
  border: 1px #f56c6c solid;
  border-right: 0;
}
.login-container .el-input__inner {
  background: #fff !important;
  border: 6px;
  padding: 0 5px 0 1px;
  color: #338ff6;
  height: 45px;
  border: 1px #338ff6 solid;
  border-left: 0;
}
.login-container input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px white inset !important;
}
.login-container .el-form-item__error {
  padding-top: 5px;
}
.login-container .el-button {
  font-size: 18px;
}
.login-container .el-button:hover {
  background: #338ff6;
  border-color: #338ff6;
}
.login-container .el-button:focus {
  background: #338ff6;
  border-color: #338ff6;
}
</style>