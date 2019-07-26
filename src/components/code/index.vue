<template>
  <div class="code-main">
    <slot>
      <el-button type="primary" size="small" @click="getImgCode" :disabled="codeTime != 60">获取验证码{{codeTime == 60 ? '' : codeTime}}</el-button>
    </slot>
    <el-dialog title="发送手机验证码" :visible.sync="getImgSt" width="30%" class="img-dialog">
      <input type="text" placeholder="请输入图片上的字符" class="img-text" v-model="code" />
      <img :src="src" alt="验证码" class="img-yan" @click="getImgCode" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelSend">取 消</el-button>
        <el-button type="primary" @click="confirmSend">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      getImgSt: false,
      src: "",
      type: "1",
      code: "",
      status: ""
    };
  },
  components: {},
  props: {
    memberPhone: {
      type: String
    }
  },
  mounted(){

  },
  computed: mapState({
    codeTime: state => state.login.codeTime
  }),
  methods: {
    cancelSend() {
      this.getImgSt = false;
    },
    confirmSend() {
      this.getImgSt = false;
      this.$api.getCode(
        {
          memberPhone: this.memberPhone,
          code: this.code,
          type: this.type,
          status: this.status
        },
        res => {
          this.$store.dispatch('login/codeTime');
        }
      );
    },

    getImgCode() {
      var date = Number((Math.random() * 10000).toFixed(0));
      this.status = date;
      this.src = `http://api.pingeban.com/api/config/numCaptcha?static=${date}`;
      this.getImgSt = true;
    }
  }
};
</script>

<style scoped lang="scss">
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
</style>
