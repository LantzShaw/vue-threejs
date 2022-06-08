<template>
  <div class="right-content-container">
    <Pie title="尖峰谷用电量" :chartData="electricityChartData" />
    <BarAndLine title="总有功/总无功趋势" :chartData="powerChartData" />
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'

import Pie from '@/components/charts/Pie.vue'
import BarAndLine from '@/components/charts/BarAndLine.vue'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
})

const electricityChartData = ref({
  xaxis: [],
  data: [],
})

const powerChartData = ref({
  xaxis: [],
  data: [],
})

const getData = () => {
  getPowerData()
}

const getPowerData = async () => {
  const url = `${API_BASE_URL}/bigDataScreen/getCabinetInfoCurve?msType=${props.id}&type=P`
  // const url = `${API_BASE_URL}/bigDataScreen/getCabinetInfoCurve?msType=ZC_A_SBR_1&type=P`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    })

    const json = await response.json()

    if (json.code == 200) {
      const { xaxis, ap, ip } = json.result

      powerChartData.value.xaxis = xaxis
      powerChartData.value.data = [ap, ip]

      console.log('---------power data----------', json)
    }
  } catch (error) {
    console.log('Request Failed: ' + error)
  }
}

watch(
  () => props.id,
  (newVal, oldVal) => {
    if (newVal) {
      getData()
    }
  }
)
</script>

<style scoped>
.right-content-container {
  width: 462px;
  height: 916px;
  background: rgba(13, 29, 47, 0.5) url(@/assets/images/container.png) left top no-repeat;
  background-size: 100% 100%;
  margin-right: 32px;
  margin-top: 30px;
  box-sizing: border-box;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 26px;
  backdrop-filter: blur(1px);
  --webkit-backdrop-filter: blur(1px);
}
</style>
