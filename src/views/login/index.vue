<template>
    <div class="login-container">
        <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
            <div class="title-container">
                <h3 class="title">系统登录</h3>
            </div>
            <el-form-item prop="username">
                <span class="svg-container svg-container_login">
                    <i class="iconfont icon-zhanghu"></i>
                </span>
                <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <i class="iconfont icon-mima password"></i>
                </span>
                <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="password" />
                <span class="show-pwd" @click="showPwd">
                    <i class="iconfont icon-yincangmima"></i>
                </span>
            </el-form-item>
            <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
        </el-form>
        <el-dialog title="第三方登录" :visible.sync="showDialog" append-to-body></el-dialog>
    </div>
</template>
<script>
    // import { isvalidUsername } from '@/utils/validate'
    import { loginByUsername } from "@/api/login/login";
    export default {
      name: "Login",
      data() {
        const validatePassword = (rule, value, callback) => {
          if (value.length < 6) {
            callback(new Error("密码长度大于6个字符"));
          } else {
            callback();
          }
        };
        return {
          loginForm: {
            username: "",
            password: ""
          },
          loginRules: {
            //username: [{ required: true, trigger: 'blur', validator: validateUsername }],
            password: [
              { required: true, trigger: "blur", validator: validatePassword }
            ]
          },
          passwordType: "password",
          loading: false,
          showDialog: false
        };
      },
      methods: {
        showPwd() {
          if (this.passwordType === "password") {
            this.passwordType = "";
          } else {
            this.passwordType = "password";
          }
        },
        handleLogin() {
          this.$refs.loginForm.validate(valid => {
            if (valid) {
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
      },
      created() {
        // window.addEventListener('hashchange', this.afterQRScan)
      },
      destroyed() {
        // window.removeEventListener('hashchange', this.afterQRScan)
      }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
    $bg: #2d3a4b;
    $light_gray: #eee;
    /* reset element-ui css */
    .login-container {
      .menu-icon {
        display: inline-block;
        width: 14px;
        height: 14px;
        background: url(../../assets/image/user.png) center no-repeat;
        background-size: 100% 100%;
      }
      .el-input {
        display: inline-block;
        height: 53px;
        width: 85%;
        input {
          background: none;
          border: 0px;
          -webkit-appearance: none;
          border-radius: 0px;
          padding: 12px 5px 12px 15px;
          color: $light_gray;
          height: 53px;
          &:-webkit-autofill {
            -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
            -webkit-text-fill-color: #fff !important;
          }
        }
      }
      .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
      }
    }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;

    .login-container {
      position: fixed;
      height: 100%;
      width: 100%;
      background-color: $bg;
      .login-form {
        position: absolute;
        left: 0;
        right: 0;
        width: 520px;
        padding: 35px 35px 15px 35px;
        margin: 120px auto;
      }
      .tips {
        font-size: 14px;
        color: #fff;
        margin-bottom: 10px;
        span {
          &:first-of-type {
            margin-right: 16px;
          }
        }
      }
      .svg-container {
        padding: 5px 5px 6px 10px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
        &_login {
          font-size: 20px;
        }
      }
      .title-container {
        position: relative;
        .title {
          font-size: 26px;
          font-weight: 400;
          color: $light_gray;
          margin: 0px auto 40px auto;
          text-align: center;
          font-weight: bold;
        }
        .set-language {
          color: #fff;
          position: absolute;
          top: 5px;
          right: 0px;
        }
      }
      .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
      }
      .thirdparty-button {
        position: absolute;
        right: 35px;
        bottom: 28px;
      }
    }
</style>
