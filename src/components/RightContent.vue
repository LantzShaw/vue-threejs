<template>
  <div class="right-content-container">
    <Pie title="尖峰谷用电量" />
    <BarAndLine title="总有功/总无功趋势" />
  </div>
</template>

<script setup>
import { watch } from 'vue'

import Pie from '@/components/charts/Pie.vue'
import BarAndLine from '@/components/charts/BarAndLine.vue'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
})

const getData = () => {
  getPowerData()
}

const getPowerData = async () => {
  const url = `${API_BASE_URL}/bigDataScreen/getCabinetInfoCurve?msType=${props.id}&type=P`

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

watch(
  () => props.id,
  (newVal, oldVal) => {
    getData()
  }
)
</script>

<style scoped>
.right-content-container {
  width: 462px;
  height: 916px;
  background: url(@/assets/images/container.png) left top no-repeat;
  background-size: 100% 100%;
  margin-right: 32px;
  margin-top: 30px;
  box-sizing: border-box;
  padding-left: 32px;
  padding-right: 32px;
  padding-top: 26px;
}
</style>
