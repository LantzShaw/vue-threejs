<template>
  <div class="left-content-container">
    <DisplayBox />
    <Line title="电压趋势" unit="kV" />
    <Line title="电流趋势" unit="A" />
  </div>
</template>

<script setup>
import { watch } from 'vue'

import DisplayBox from './DisplayBox.vue'
import Line from '@/components/charts/Line.vue'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
})

/**
 * 获取数据
 * 电流、电压
 */
const getCurrentAndVoltage = async () => {
  const url = `${API_BASE_URL}/bigDataScreen/getCabinetInfoCurve?msType=${props.id}&type=NULL`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    })

    if (response.code == 200) {
      console.log('---------response----------', response)
    }
  } catch (error) {
    console.log('Request Failed: ' + error)
  }
}

/**
 * 实时数据
 */
const getRealTimeData = async () => {
  const url = `${API_BASE_URL}/bigDataScreen/getCabinetInfoR?msType=${props.id}`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    })

    if (response.code == 200) {
      console.log('---------response----------', response)
    }
  } catch (error) {
    console.log('Request Failed: ' + error)
  }
}

const getData = async () => {
  getRealTimeData()

  getCurrentAndVoltage()
}

watch(
  () => props.id,
  (newVal, oldVal) => {
    getData()
  }
)
</script>

<style scoped>
.left-content-container {
  width: 462px;
  height: 916px;
  background: url(@/assets/images/container.png) left top no-repeat;
  background-size: 100% 100%;
  margin-left: 32px;
  margin-top: 30px;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 18px;
  box-sizing: border-box;
}
</style>
