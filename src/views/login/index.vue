<template>
  <div class="login-container">
    <van-nav-bar
      class="app-nav-bar"
      title="登录/注册"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 通过表单验证后才会调用onLogin方法 -->
    <van-form
      @submit="onLogin"
      @failed="onFail"
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref="login-form"
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="icon"
        left-icon="shouji"
        placeholder="请输入手机号"
        name="phoneNumber"
        center
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="icon"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        name="code"
        center
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down
            v-if="iscountdownshow"
            :time="1000 * 60"
            format="ss s"
            @finish="iscountdownshow = false"
          />
          <van-button
            v-else
            class="send-btn"
            size="mini"
            round
            :loading="isSendSmsLoading"
            @click.prevent="onSendSms"
          >
            获取验证码
          </van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" round>
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user";
import { Toast } from "vant";

export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        //手机号和验证码
        mobile: "",
        code: "",
      },
      formRules: {
        mobile: [
          {
            required: true,
            message: "请输入手机号",
          },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: "手机号格式错误",
          },
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ],
      },
      iscountdownshow: false,
      isSendSmsLoading: false,
    };
  },
  methods: {
    async onLogin() {
      // 1.找到数据接口
      // 2.封装请求方法
      // 3.请求调用登录
      // 4.处理响应结果
      Toast.loading({
        message: "登录中...",
        // 禁止背景点击
        forbidClick: true,
        // 持续时间，为0时不会消失
        duration: 0,
      });
      try {
        // 直接将返回数据里的data解构出来
        const { data } = await login(this.user);
        Toast.success("登录成功");
        // 登录成功，将后端返回的用户登录状态(token等数据)放到vuex中
        this.$store.commit("setUser", data.data);
        // 登录成功跳转到my页面
        this.$router.back();
      } catch (error) {
        Toast.fail("登录失败，手机号码或者验证码错误");
      }
    },
    onFail(error) {
      if (error.errors[0]) {
        Toast({
          message: error.errors[0].message,
          position: "top",
        });
      }
    },
    async onSendSms() {
      // 校验手机号码
      // 验证通过 -> 请求发送验证码 -> 用户接收
      try {
        // 校验手机号
        await this.$refs["login-form"].validate("phoneNumber");
        // 为了防止重复点击导致反复发送请求，先禁用按钮
        this.isSendSmsLoading = true;
        // 验证通过发送验证码
        await sendSms(this.user.mobile);
        // 短信已发送，隐藏发送给按钮，显示倒计时
        this.iscountdownshow = true;
        // 倒计时结束再次显示发送按钮 vant-count-down组件自带一个finish事件
      } catch (error) {
        console.log(error);
        let message = "";
        if (error && error.response && error.response.status === 429) {
          // 发送信息太频繁
          message = "发送太频繁，请稍后重试";
        } else if (error.name === "phoneNumber") {
          //表单验证失败
          message = error.message;
        } else {
          message = "未知的错误，请稍后重试";
        }
        Toast({
          message,
          position: "top",
        });
      } finally {
        this.isSendSmsLoading = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666;
    }
  }
}
</style>