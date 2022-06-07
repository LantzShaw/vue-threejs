<template>
  <div style="height: 25px; line-height: 25px; color: rgba(255, 255, 255, 0.8); font-size: 18px">
    {{ title }}
  </div>
  <v-chart class="chart" :option="option" />
</template>

<script setup>
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart, BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import { ref } from 'vue'

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
])

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})

const option = ref({
  grid: {
    top: '18%',
    left: '8%',
    right: '4%',
    bottom: '5%',
    containerLabel: true,
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)',
  },
  legend: {
    orient: 'horizontal',
    left: 'right',
    top: '5%',
    data: [
      { name: '有功', icon: 'roundRect' },
      { name: '无功', icon: 'roundRect' },
    ],
    itemGap: 25,
    itemHeight: 2,
    textStyle: {
      color: '#7CE8FA',
    },
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0,0,0,.6)',
    borderColor: 'rgba(0,0,0,.6)',
    borderWidth: 0,
    formatter: function (params, ticket, callback) {
      var res =
        "<div style='color:#7CE8FA;font-family: PingFang SC;  display: flex;justify-content: center;align-items: center;flex-warp:warp;'>" +
        params[0].axisValue +
        '<br/>' +
        params[0].seriesName +
        ':' +
        params[0].data +
        'kW<br/>' +
        params[1].seriesName +
        ':' +
        params[1].data +
        'kW</div>'

      return res
    },
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisLine: {
      lineStyle: {
        color: '#005582',
      },
    },
    axisLabel: {
      color: '#7CE8FA',
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: [
    {
      type: 'value',
      name: '(kW)',
      axisLine: {
        lineStyle: {
          color: '#7CE8FA',
        },
      },
      splitLine: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: '有功',
      type: 'bar',
      data: [12, 123, 123, 320],
      barWidth: 20,
      itemStyle: {
        normal: {
          barBorderRadius: 80,

          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(0, 222, 255, 1)',
            },
            {
              offset: 1,
              color: 'rgba(5, 37, 56, 1)',
            },
          ]),
        },
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
    },
    {
      name: '无功',
      type: 'line',
      data: [12, 123, 123, 320],
      lineStyle: {
        type: 'dashed',
      },
      itemStyle: {
        color: '#FF7378',
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
}
</style>
