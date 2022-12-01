<template>
  <div>
    <div id="echart" style="border:1px #111 solid" :style="{width:`${wrapWidth}px`,height:`${wrapHeight}px`}"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data: () => ({
    myChart: null,
    startDate: '2022-11-01',
    endDate: '2022-11-30',
    chartArr: {
      yAxisName: [
        '手术',
        '化疗',
        '靶向',
        '内分泌',
        '免疫治疗',
        '免疫组化',
        '肿瘤标志物',
        '肿瘤尺寸'
      ],
      yAxisVal: [
        'Operation',
        'Chemotherapy',
        'Targeting',
        'Endocrine',
        'Immunotherapy',
        'IHC',
        'TumorMarks',
        'TumorSize'
      ]
    },
    chartConf: {
      yAxis: [
        {
          value: '手术',
          textStyle: {
            color: '#fff',
            backgroundColor: '#3d95f9',
            padding: [
              10,
              15,
              10,
              15
            ],
            borderRadius: 5
          }
        },
        {
          value: '化疗',
          textStyle: {
            color: '#fff',
            backgroundColor: '#84C5A3',
            padding: [
              10,
              15,
              10,
              15
            ],
            borderRadius: 5
          }
        },
        {
          value: '靶向',
          textStyle: {
            color: '#fff',
            backgroundColor: '#52cc6f',
            padding: [
              10,
              15,
              10,
              15
            ],
            borderRadius: 5
          }
        },
        {
          value: '内分泌',
          textStyle: {
            color: '#fff',
            backgroundColor: '#c465e2',
            padding: [
              10,
              15,
              10,
              15
            ],
            borderRadius: 5
          }
        },
        {
          value: '免疫治疗',
          textStyle: {
            color: '#fff',
            backgroundColor: '#505559',
            padding: [
              10,
              15,
              10,
              15
            ],
            borderRadius: 5
          }
        },
        {
          value: '免疫组化',
          textStyle: {
            color: '#000',
            backgroundColor: '#e8e8e8',
            padding: [
              10,
              15,
              10,
              15
            ],
            borderRadius: 5
          }
        },
        {
          value: '肿瘤标志物',
          textStyle: {
            color: '#000',
            backgroundColor: '#e8e8e8',
            padding: [
              10,
              15,
              10,
              15
            ],
            borderRadius: 5
          }
        },
        {
          value: '肿瘤尺寸',
          textStyle: {
            color: '#000',
            backgroundColor: '#e8e8e8',
            padding: [
              10,
              15,
              10,
              15
            ],
            borderRadius: 5
          }
        }
      ]
    }
  }),
  props: ['wrapWidth', 'wrapHeight'],
  methods: {
    initChart () {
      const option = {
        xAxis: [{
          id: 'date',
          type: 'time',
          gridIndex: 0,
          boundaryGap: false,
          min: this.startDate,
          max: this.endDate
        }],
        yAxis: [{
          id: 'scatter',
          type: 'category',
          axisTick: false,
          axisLine: false,
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ccc',
              width: 1,
              type: 'dashed'
            }
          },
          data: this.chartConf.yAxis
        }, {
          id: 'line',
          type: 'value'
        }],
        grid: [{
          id: 'main',
          top: '30px',
          right: '30px',
          bottom: '30px',
          left: '100px'
        }],
        series: [{
          name: 'scatter',
          type: 'scatter',
          value: 'scatter',
          xAxis: 'date',
          yAxis: 'scatter',
          sampling: 'lttb',
          data: [
            ['2022-11-15', '周一']
          ]
        }
        ]
      }
      this.myChart.setOption(option, true)
    }
  },
  created () {
  },
  mounted () {
    this.myChart = echarts.init(document.getElementById('echart'))
    this.initChart()
  }
}
</script>

<style scoped></style>
