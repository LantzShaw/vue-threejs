<template>
  <div class="header-container">
    <div class="header-left">
      <span class="digit">{{ year }}</span>
      <span style="margin: 0 8px">年</span>
      <span class="digit">{{ month }}</span>
      <span style="margin: 0 8px">月</span>
      <span class="digit">{{ day }}</span>
      <span style="margin: 0 8px">日</span>

      <span style="margin-left: 32px">星期</span>
      <span class="digit">{{ week }}</span>

      <span class="digit" style="margin-left: 32px; font-size: 20px">{{ time }}</span>
    </div>
    <div class="header-cneter">中驰能源管理平台</div>
    <div class="header-right">
      <span style="cursor: pointer" @click="navigateHandler">
        <img
          src="../assets/images/home.png"
          style="width: 18px; height: 18px; vertical-align: middle"
        />
      </span>
      <span style="margin: 0 10px; color: rgba(255, 255, 255, 0.8); vertical-align: middle">
        {{ weather }}
      </span>
      <span style="color: #7ce8fa; vertical-align: middle">{{ temperature }}℃</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { encode } from 'js-base64'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

const year = ref(dayjs().year())
const month = ref(dayjs().month())
const day = ref(dayjs().date())
const week = ref(dayjs().locale('zh-cn').format('dddd').substring(2, 3))
const time = ref(dayjs().format('HH:mm:ss'))
const temperature = ref('')
const weather = ref('')

let timer = null

const getWeather = () => {
  const url = 'http://www.yiketianqi.com/api?version=v9&appid=62646242&appsecret=N0FdA3vk'

  fetch(url)
    .then(res => {
      return res.json()
    })
    .then(res => {
      console.log('----weather----', res)
      const { wea, tem1, tem2 } = res.data[0]

      temperature.value = `${tem2}-${tem1}`

      weather.value = wea
    })
}

const navigateHandler = () => {
  // window.open('http://115.231.168.146:8001/user/login?username=Lantz')
  window.open(`http://localhost:3001/user/login?red=${encode('mysecret')}`)
  // window.location.href = 'http://192.168.5.19:8081/'
}

onMounted(() => {
  getWeather()
  if (timer) {
    clearInterval(timer)
  }
  timer = setInterval(() => {
    time.value = dayjs().format('HH:mm:ss')
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.header-container {
  width: 100%;
  height: 87px;
  background: rgba(9, 21, 45, 1) url(@/assets/images/header.png) left top no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
}

.header-left {
  width: 40%;
  height: 100%;
  padding-top: 8px;
  padding-left: 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
}

.digit {
  color: #7ce8fa;
  font-family: Leslie;
}

.header-cneter {
  height: 100%;
  width: 20%;
  line-height: 87px;
  text-align: center;
  font-size: 36px;
  font-family: FZShangKuS-R-GB;
  font-weight: bold;
  color: #7ce8fa;
}

.header-right {
  height: 100%;
  width: 40%;
  padding-top: 8px;
  padding-right: 20px;
  text-align: right;
  vertical-align: middle;
}
</style>
