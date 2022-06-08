<template>
  <div style="height: 25px; line-height: 25px; color: rgba(255, 255, 255, 0.8); font-size: 18px">
    {{ title }}
  </div>
  <v-chart class="chart" :option="option" />
</template>

<script setup>
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import VChart from 'vue-echarts'
import { ref } from 'vue'

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent])

const props = defineProps({
  title: { type: String, default: '' },
})

const option = ref({
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}kWh ({d}%)',
  },
  legend: {
    orient: 'horizontal',
    left: 'right',
    top: '10',
    data: ['尖', '峰', '谷'],
    itemHeight: 8,
    itemWidth: 25,
    itemGap: 25,
    textStyle: {
      color: '#7CE8FA',
    },
  },
  color: ['#FF7378', '#FF8900', '#00DCB9'],
  series: [
    {
      name: '尖峰谷用电量',
      type: 'pie',
      radius: '70%',
      center: ['50%', '55%'],
      data: [
        { value: 0, name: '尖' },
        { value: 0, name: '峰' },
        { value: 0, name: '谷' },
      ],
      label: {
        color: '#7CE8FA',
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
  ],
})
</script>

<style scoped>
.chart {
  height: 400px;
  width: 400px;
}
</style>
