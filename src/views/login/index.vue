<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">请登录后台</h3>
      </div>
      <div class="check-login">
        <span :class="{active : checkLogin}" @click="zhLogin">手机号登录</span>
        <span :class="{active : !checkLogin}" @click="smLogin">二维码登录</span>
      </div>
      <div v-show="checkLogin">
        <el-form-item prop="memberPhone">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="memberPhone"
            v-model="loginForm.memberPhone"
            placeholder="手机号"
            name="memberPhone"
            type="text"
            tabindex="1"
          />
        </el-form-item>
        <el-form-item prop="code">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            ref="code"
            v-model="loginForm.code"
            placeholder="验证码"
            name="yan"
            type="text"
            tabindex="3"
            class="yan-input"
          />
          <imgCode ref="imgCode" :memberPhone="loginForm.memberPhone" class="img-code"></imgCode>
        </el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="handleLogin"
        >登录</el-button>

        <div class="tips">
          <span style="margin-right:20px;">用户名:admin || editor</span>
          <span>密码: 最少6位</span>
        </div>
      </div>
    </el-form>
    
  </div>
</template>

<script>
	
import imgCode from "@/components/code/index";



export default {
  components: {
    imgCode
  },
  data() {
    return {
      loginForm: {
        memberPhone: "15037983727",
        code: "",
        type: "1"
      },

      loading: false,
      checkLogin: true,
      passwordType: "password",
      redirect: undefined,
      getImgSt: false,
      imgText: "",
      src: "",
      loginRules
    };
  },
  created() {

  },
  mounted() {
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    // handleLogin() {
    //   var sendObj = this.loginForm;
    //   this.$store.dispatch('user/login',{
    //     ...this.loginForm
    //   }).then(()=>{
    //     this.$router.push('/');
    //   })
    //   // this.$api.doLogin({...sendObj},res=>{
    //   //   setToken(res.sign);
    //   // })
    // },
		handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$api.dispatch('user/login')({
            ...this.loginForm
          },(res)=>{
						if(res){
						        this.loading = false;
						        this.$message({
						          message: '登录成功',
						          type: 'success'
						        })
						          setToken (res);
						          this.$router.push({name:'Home'});
						      }else{
						        this.loading = false;
						        this.$message.error('登录失败!');
						      }
						    })
						    .catch(() => {
						      this.loading = false;
						    });
						} else {
						  console.log("error submit!!");
						  return false;
						}
					});
    },
    cancelSend() {
      this.getImgSt = false;
    },
    confirmSend() {
      this.getImgSt = false;
    },
    zhLogin() {
      this.checklogin = true;
    },
    smLogin() {
      this.checklogin = false;
    },
    getImg() {}
  }
};
const loginRules = {
  memberPhone: [
    { required: true, message: "请输入正确的手机号", trigger: "blur" },
    { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" }
  ]
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
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

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
    .check-login {
      display: flex;
      span {
        width: 50%;
        text-align: center;
        cursor: pointer;
        box-sizing: border-box;
        padding: 12px 0;
        font-size: 20px;
        color: #fff;
      }
      .active {
        color: red;
      }
    }
    .yan-input {
      width: calc(85% - 100px);
    }
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
  .img-code{
    display: inline-block;
  }
  .img-dialog {
    .img-text {
      width: 70%;
      padding: 10px 0;
    }
    .img-yan {
      width: 50%;
      height: 50px;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
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
}
</style>
