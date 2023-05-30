<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <template #left>
        <van-icon name="cross" @click="$router.push('/my')" />
      </template>
    </van-nav-bar>
    <!-- 导航栏 -->
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field name="mobile" placeholder="请输入手机号" v-model="user.mobile" :rules="userFormRules.mobile" type="number"
        maxlength="11">
        <template v-slot:left-icon>
          <i class="iconfont icon-shouji"></i>
        </template>
      </van-field>
      <van-field name="code" placeholder="请输入验证码" v-model="user.code" :rules="userFormRules.code" type="number"
        maxlength="6">
        <template v-slot:left-icon>
          <i class="iconfont icon-yanzhengma"></i>
        </template>
        <template #button>
          <van-count-down :time="1000 * 5" format="ss s" v-if="isCountDownShow" @finish="isCountDownShow = false" />
          <van-button round size="small" type="default" class="send-sms-btn" native-type="button" @click="onSendSms"
            v-else>发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit" class="login-btn">登录</van-button>
      </div>
    </van-form>
    <!-- 登录表单 -->

    <!-- 提示 -->
    <div class="toast">
      <p>收不到验证码的可以用下面这个内部验证码</p>
      <span>246810</span>
    </div>
    <!-- /提示 -->
  </div>
</template>
<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',

  data() {
    return {
      user: {
        // 手机号
        mobile: '',
        // 验证码
        code: ''
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        },
        {
          pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        },
        {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false
    }
  },
  computed: {

  },
  watch: {

  },
  mounted() {

  },
  methods: {
    async onSubmit() {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证
      this.$toast.loading({
        message: '登录中...', // 持续时间，默认是200,0表示持续展示
        forbidClick: true, // 禁用背景点击
        duration: 0
      })
      // 3.提交表单请求登录
      try {
        const { data } = await login(user)
        // console.log('登录成功', res);
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        // 登录成功，跳转回原来的页面
        // back的方式不严谨，后面讲功能优化的时候再说
        this.$router.push('my')
      } catch (err) {
        if (err.response.status === 400) {
          console.log('手机号或者验证码错误')
          this.$toast.fail('手机号或者验证码错误')
        } else {
          console.log('登录失败，请稍后重试', err)
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
      // 4.根据请求响应结果处理后续操作
    },
    async onSendSms() {
      // 检验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2.验证通过，显示倒计时
      this.isCountDownShow = true
      // 3.请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后再试')
        } else {
          this.$toast('发送失败，请稍后再试')
        }
      }
    }
  }
}
</script>
<style lang='less' scoped>
.login-container {
  .iconfont {
    font-size: 37px;
  }

  .send-sms-btn {
    // width: 152px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    background-color: #ededed;
    color: #666;
  }

  .login-btn-wrap {
    padding: 53px 33px;

    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }

  .toast {
    margin-top: 60px;
    padding: 10px;
    font-size: 34px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #6d6c6c;
  }
}
</style>
