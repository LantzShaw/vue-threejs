<template>
  <div class="display-box-title">
    <span style="color: #54ebfd; font-size: 20px">当前柜子:</span>
    <span style="margin-left: 14px; color: #fff; font-size: 28px; font-weight: bold">1A08</span>
  </div>
  <div style="display: flex; flex-wrap: wrap; justify-content: space-between">
    <div
      style="width: 120px; height: 60px; text-align: center; margin: 12px 0"
      v-for="(item, index) in displayList"
      :key="index"
    >
      <div
        style="height: 30px; line-height: 20px; color: rgba(255, 255, 255, 0.8); font-size: 14px"
      >
        {{ item.name }}
      </div>
      <div style="height: 40px; color: #7ce8fa; font-size: 28px; font-weight: bold">
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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
</script>

<style scoped>
.display-box-title {
  height: 50px;
  line-height: 50px;
}
</style>
