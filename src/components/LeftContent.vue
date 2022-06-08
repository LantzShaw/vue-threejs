<template>
  <div class="left-content-container">
    <DisplayBox :displayList="displayList" :displayName="displayName" />
    <Line title="电压趋势" unit="kV" :chartData="voltageChartData" />
    <Line title="电流趋势" unit="A" :chartData="currentChartData" />
  </div>
</template>

<script setup>
import { watch, ref, onMounted } from 'vue'

import DisplayBox from './DisplayBox.vue'
import Line from '@/components/charts/Line.vue'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
})

const voltageChartData = ref({
  xaxis: [],
  data: [],
})
const currentChartData = ref({
  xaxis: [],
  data: [],
})

const displayName = ref('')
const displayList = ref([
  {
    name: '日发电量(kWh)',
    value: 306.88,
  },
  {
    name: '有功功率(kW)',
    value: 307.22,
  },
  {
    name: '无功功率(kVar)',
    value: 40.22,
  },
  {
    name: '电压(V)',
    value: 220,
  },
  {
    name: '电流(A)',
    value: 25,
  },
  {
    name: '功率因数',
    value: 0.73,
  },
  {
    name: '尖(kWh)',
    value: 67.89,
  },
  {
    name: '峰(kWh)',
    value: 106.23,
  },
  {
    name: '谷(kWh)',
    value: 20.08,
  },
])

/**
 * 获取数据
 * 电流、电压
 */
const getCurrentAndVoltage = async () => {
  const url = `${API_BASE_URL}/bigDataScreen/getCabinetInfoCurve?msType=${props.id}&type=NULL`
  // const url = `${API_BASE_URL}/bigDataScreen/getCabinetInfoCurve?msType=ZC_A_SBR_1&type=NULL`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    })

    const json = await response.json()

    if (json.code === 200) {
      console.log('---------response----------', json)

      const { xaxis, ia, ib, ic, ua, ub, uc } = json.result

      voltageChartData.value.xaxis = xaxis
      voltageChartData.value.data = [ua, ub, uc]

      currentChartData.value.xaxis = xaxis
      currentChartData.value.data = [ia, ib, ic]
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
  // const url = `${API_BASE_URL}/bigDataScreen/getCabinetInfoR?msType=ZC_A_SBR_1`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    })

    const json = await response.json()

    if (json.code === 200) {
      const { name, e, i, ip, ap, low, peak, pf, sharp, u } = json.result

      displayName.value = name

      displayList.value[0].value = e
      displayList.value[1].value = ap
      displayList.value[2].value = ip
      displayList.value[3].value = u
      displayList.value[4].value = i
      displayList.value[5].value = pf
      displayList.value[6].value = sharp
      displayList.value[7].value = peak
      displayList.value[8].value = low

      console.log('---------infor response----------', json)
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
    if (newVal) {
      getData()
    }
  }
)

onMounted(() => {
  // getData()
})
</script>

<style scoped>
.left-content-container {
  width: 462px;
  height: 916px;
  background: rgba(13, 29, 47, 0.5) url(@/assets/images/container.png) left top no-repeat;
  background-size: 100% 100%;
  margin-left: 32px;
  margin-top: 30px;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 18px;
  box-sizing: border-box;
  backdrop-filter: blur(1px);
  --webkit-backdrop-filter: blur(1px);
}
</style>
