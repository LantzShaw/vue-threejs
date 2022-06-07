<template>
  <div style="height: 25px; line-height: 25px; color: rgba(255, 255, 255, 0.8); font-size: 18px">
    {{ title }}
  </div>
  <v-chart class="chart" :option="option" />
</template>

<script setup>
import { use, graphic } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'
import { ref, onMounted } from 'vue'

use([CanvasRenderer, LineChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent])

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  unit: {
    type: String,
    default: '',
  },
})

const option = ref('')

const setOption = () => {
  option.value = {
    grid: {
      top: '18%',
      left: '8%',
      right: '4%',
      bottom: '12%',
      containerLabel: true,
    },
    legend: {
      orient: 'horizontal',
      left: 'center',
      data: [
        {
          name: 'A相',
          icon: 'roundRect',
          itemStyle: {
            color: '#E4A779',
          },
        },
        {
          name: 'B相',
          icon: 'roundRect',
          itemStyle: {
            color: '#0096C7',
          },
        },
        {
          name: 'C相',
          icon: 'roundRect',
          itemStyle: {
            color: '#B3D465',
          },
        },
      ],
      textStyle: {
        color: '#7CE8FA',
      },
      itemGap: 30,
      itemHeight: 2,
      itemWidth: 25,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,.6)',
      borderColor: 'rgba(0,0,0,.6)',
      borderWidth: 0,
      formatter: (params, ticket, callback) => {
        const res =
          "<div style='color:#7CE8FA;font-family: PingFang SC;  display: flex;justify-content: center;align-items: center;flex-warp:warp;'>" +
          params[0].axisValue +
          '<br/>' +
          params[0].seriesName +
          ':' +
          params[0].data +
          `${props.unit}<br/>` +
          params[1].seriesName +
          ':' +
          params[1].data +
          `${props.unit}<br/>` +
          params[2].seriesName +
          ':' +
          params[2].data +
          `${props.unit}</div>`

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
        name: `(${props.unit})`,
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
        name: 'A相',
        type: 'line',
        data: [12, 123, 123, 320],
        areaStyle: {
          show: true,
        },
        lineStyle: {
          type: 'dashed',
          color: '#E4A779',
        },
        itemStyle: {
          normal: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(238, 181, 135, 1)',
              },
              {
                offset: 0.8,
                color: 'rgba(16, 34, 53, .8)',
              },
              {
                offset: 1,
                color: 'rgba(16, 34, 53, .9)',
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
        name: 'B相',
        type: 'line',
        data: [120, 113, 103, 32],
        areaStyle: {
          show: true,
        },
        lineStyle: {
          type: 'dashed',
          color: '#0096C7',
        },
        itemStyle: {
          normal: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(186, 210, 116, .3)',
              },
              {
                offset: 0.8,
                color: 'rgba(16, 34, 53, .8)',
              },
              {
                offset: 1,
                color: 'rgba(16, 34, 53, .9)',
              }, //柱图渐变色
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
        name: 'C相',
        type: 'line',
        data: [122, 143, 153, 330],
        areaStyle: {
          show: true,
        },
        lineStyle: {
          type: 'dashed',
          color: '#B3D465',
        },
        itemStyle: {
          normal: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(66, 215, 132, .4)',
              },
              {
                offset: 0.8,
                color: 'rgba(16, 34, 53, .8)',
              },
              {
                offset: 1,
                color: 'rgba(16, 34, 53, .9)',
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
    ],
  }
}

onMounted(() => {
  setOption()
})
</script>

<style scoped>
.chart {
  height: 265px;
}
</style>
