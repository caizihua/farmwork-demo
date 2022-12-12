<template>
  <div class="d-flex justify-center">
      <!--左侧基础信息栏-->
      <v-card elevation="0" style="width: 250px;height: 90vh" class="pa-5">
        <div class="d-flex flex-column" v-for="item in leftData" :key="item.id">
          <div class="my-2">
            {{item.title}}
          </div>
          <div v-for="val in item.selectedEntryList" :key="val.inputName" class="d-flex">
            <div style="color:#424242;font-size: 13px"> {{val.inputName}}： </div>
            <div  style="color:#424242;font-size: 13px" class="ml-2">{{val.value}}</div>
          </div>
          <v-divider class=" my-2"></v-divider>
        </div>
      </v-card>
      <!--右侧echart展示-->
      <v-card elevation="0" class="mx-3">
        <div class="d-flex justify-space-between align-center ma-5">
          <div style="font-size: 23px">可视化病程管理</div>
          <div>
            <v-btn color="primary" class="mr-2" outlined @click="iptRecord">解读记录</v-btn>
            <v-btn color="primary" @click="analyseIpt">分析解读</v-btn>
          </div>
        </div>
        <div id="echart" :style="{width:`${wrapWidth-250}px`,height:`${wrapHeight-100}px`}">1</div>
      </v-card>
  </div>
</template>

<script>
import * as Echarts from 'echarts'
export default {
  data: () => ({
    leftData: [],
    myChart: null
  }),
  props: ['wrapWidth', 'wrapHeight'],
  created () {
    this.leftData = [
      {
        id: 1,
        title: '基本信息',
        isCreateRecord: 0,
        selectedEntryList: [
          {
            inputName: '姓名',
            inputTypeEnum: 'TEXT_INPUT_BOX',
            value: 'aaa'
          },
          {
            inputName: '性别',
            value: '男'
          },
          {
            inputName: '年龄',
            inputTypeEnum: 'TEXT_INPUT_BOX',
            value: '18'
          },
          {
            inputName: '诊断',
            inputTypeEnum: 'TEXT_INPUT_BOX',
            value: '甲状腺功能减退'
          }
        ]
      },
      {
        id: 2,
        title: '既往病史',
        isCreateRecord: 0,
        selectedEntryList: [
          {
            inputName: '外伤史',
            inputTypeEnum: 'TEXT_INPUT_BOX',
            value: '有'
          },
          {
            inputName: '过敏史',
            inputTypeEnum: 'TEXT_INPUT_BOX',
            value: '有'
          },
          {
            inputName: '肾病',
            inputTypeEnum: 'TEXT_INPUT_BOX',
            value: '无'
          }
        ]
      },
      {
        id: 3,
        title: '诊断',
        isCreateRecord: 0,
        selectedEntryList: [
          {
            inputName: '诊断时间',
            value: '2022-06-02'
          },
          {
            inputName: '肿瘤部位',
            value: '左侧'
          },
          {
            inputName: '癌种',
            value: '淋巴转移'
          }
        ]
      }
    ]
  },
  methods: {
    initChart () {
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          bottom: 10,
          data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        grid: {
          top: '2%',
          left: '2%',
          right: '2%',
          bottom: '9%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Email',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ads',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Direct',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Search Engine',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
      this.myChart.setOption(option)
    },
    // 解读记录
    iptRecord () {},
    // 分析解读
    analyseIpt () {}
  },
  mounted () {
    this.myChart = Echarts.init(document.getElementById('echart'))
    this.initChart()
  }
}
</script>
