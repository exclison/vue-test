/* *@description: login *@author: hanyuchen *@date: 2020-12-18 16:19:46 */
<template>
  <div class="login flex flex-hc flex-vc">
    <div class="login-main flex flex-hc flex-vc">
      <div class="login-main-form">
        <Form
          ref="formLogin"
          :model="formLogin"
          :rules="ruleLogin"
          :label-width="80"
        >
          <FormItem label="账号" prop="phone">
            <Input
              type="text"
              v-model="formLogin.phone"
              placeholder="请输入手机号"
            />
          </FormItem>
          <FormItem label="密码" prop="password">
            <Input
              type="password"
              v-model="formLogin.password"
              placeholder="请输入密码"
            />
          </FormItem>
        </Form>
        <div class="flex flex-hc flex-vc">
            <Button type="primary" @click="onLogin">登录</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: "login",

  components: {},

  data() {
    return {
      formLogin: {
        phone: "",
        password: "",
      },
      ruleLogin: {
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur",
          },
          // {
          //   required: true,
          //   message: "手机号格式不正确",
          //   trigger: "blur",
          //   validator: (rule, value) => /^1[3|4|5|6|7|8|9](\d){9}$/.test(value)
          // },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },

  computed: {},

  props: {},

  methods: {
    ...mapMutations(['login']),
    onLogin(){
      this.$post('login-auth',this.formLogin).then(res=>{
        this.login(res)
        this.$router.push('/')
        console.log(res,'gg')
      })
    },
    // // 音频初始化
    // audioInit() {
    //   const audio = document.getElementById('videoPlayer')
    //   console.log(audio, 99999999)
    //   audio.addEventListener('ended', () => {
    //     this.audioCon.isPause = true
    //   })
    //   audio.addEventListener('play', () => {
    //     this.audioCon.isPause = false
    //   })
    //   audio.addEventListener('pause', () => {
    //     this.audioCon.isPause = true
    //   })
    //   audio.addEventListener('canplay', () => {
    //     this.audioCon.audioAllTime = this.formatSeconds(
    //       document.getElementById('audio').duration,
    //       'mm:ss'
    //     )
    //   })
    //   audio.currentTime = 0
    //   const tim = this.formatSeconds(audio.currentTime, 'mm:ss')

    //   this.audioCon.audioPlayTime = tim
    //   const progress = (audio.currentTime / audio.duration) * 100
    //   this.$set(this.audioCon, 'audioProgress', progress)
    //   this.$forceUpdate()
    // },
    // // 音频快进
    // audioTimeChange(e) {
    //   const audio = document.getElementById('audio')

    //   const playTime = audio.duration * (e / 100)
    //   audio.currentTime = playTime

    //   const tim = this.formatSeconds(playTime, 'mm:ss')

    //   this.audioCon.audioPlayTime = tim
    //   // this.audioPlayTime = tim;
    // },
    // // 音频控制播放
    // audiocontrol() {
    //   const audio = document.getElementById('audio')
    //   console.log(audio, 9999999)
    //   if (audio.paused) {
    //     this.audioCon.isPause = false
    //     audio.play()

    //     this.audioPlay = setInterval(() => {
    //       const tim = this.formatSeconds(audio.currentTime, 'mm:ss')

    //       this.audioCon.audioPlayTime = tim

    //       const progress = (audio.currentTime / audio.duration) * 100
    //       this.$set(this.audioCon, 'audioProgress', progress)
    //       this.$forceUpdate()

    //       if (audio.ended) {
    //         this.audioPlay = clearInterval(this.audioPlay)
    //       }
    //     }, 500)
    //   } else {
    //     this.audioCon.isPause = true
    //     this.audioPlay = clearInterval(this.audioPlay)

    //     audio.pause()
    //   }
    //   this.$forceUpdate()
    // },
  },

  mounted() {},
};
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-color: rgba(22, 138, 244, 1);
  .login-main {
    width: 800px;
    height: 400px;
    background-color: #fff;
    border-radius: 30px;
  }
  .login-main-form{
      width: 400px;
  }
}
</style>
