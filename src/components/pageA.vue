<template>
  <div>
    <v-card elevation="0" class="d-flex">
      <!--个人信息及自定义展示信息-->
      <div class="pa-3" style="width: 250px;background-color: #fcf9fc">
        <!--个人信息-->
        <div class="pb-5">
          <div class="d-flex align-center" style="background-color: #D5DDF0">
            <span class="mr-2" style="width:3px; height:25px; background-color: #5D7CC5;"></span>
            <div>个人信息</div>
          </div>
          <div class="pl-3">
            <div class="pt-2" v-for="item in perData" :key="item">{{item}}：</div>
          </div>
        </div>
        <!--选择子标题-->
        <div v-if="!isCreated">
          <div class="d-flex align-center" style="background-color: #D5DDF0">
            <span class="mr-2" style="width:3px; height:25px; background-color: #5D7CC5;"></span>
            <v-menu offset-x
                    v-model="isSelectLData"
                    :close-on-content-click="false">
              <template v-slot:activator="{ on, attrs }">
                <div v-bind="attrs" v-on="on" class="pr-2" style="cursor: pointer">选择子标题</div>
              </template>
              <v-card class="d-flex flex-column pa-2" style="max-width:210px">
                <v-text-field
                  v-model="entryList.leftTitle.value"
                  @input="handleSearch('leftTitle')"
                  prepend-inner-icon="mdi-magnify"
                  clearable
                  outlined
                  dense
                  hide-details
                  placeholder="请输入名称"
                />
                <div style="max-height:180px; max-width: 250px; overflow-y:auto;">
                  <div v-for="item in entryList.leftTitle.selected" :key="item.id">
                    <v-checkbox
                      dense
                      hide-details
                      v-model="selectedLData"
                      :value="item"
                    >
                      <template v-slot:label>
                        <div class="generate-name">{{item.title}}</div>
                      </template>
                    </v-checkbox>
                  </div>
                </div>
                <div class="d-flex justify-end">
                  <v-btn color="primary" small text @click="complete(0)">完成</v-btn>
                </div>
              </v-card>
            </v-menu>
          </div>
        </div>
        <!--自定义展示信息-->
        <div v-else>
          <div class="d-flex align-center" style="background-color: #D5DDF0">
            <span class="mr-2" style="width:3px; height:25px; background-color: #5D7CC5;"></span>
            <div>
              <v-menu offset-x
                      v-model="chartSource.leftObj.isMenu">
                <template v-slot:activator="{ on, attrs }">
                  <div class="pr-2" v-bind="attrs" v-on="on"> {{chartSource.leftObj.title}}</div>
                </template>
                <v-card class="d-flex flex-column" elevation="0">
                  <v-btn color="primary" text @click="deleteLTitle">删除子标题</v-btn>
                  <v-menu offset-x
                          v-model="chartSource.leftObj.isEntryMenu"
                          :close-on-content-click="false">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs" v-on="on" color="primary" text @click="addEntry('leftObj')">添加输入项</v-btn>
                    </template>
                    <v-card class="d-flex flex-column pa-2" style="max-width:210px">
                      <v-text-field
                        prepend-inner-icon="mdi-magnify"
                        clearable
                        outlined
                        dense
                        hide-details
                        placeholder="请输入名称"
                        v-model="entryList.leftObj"
                        @input="handleSearch('leftObj')"
                      />
                      <div style="max-height:180px; max-width: 250px; overflow-y:auto;">
                        <div v-for="item in chartSource.leftObj.searchList" :key="item.key">
                          <v-checkbox
                            dense
                            hide-details
                            v-model="chartSource.leftObj.selectedList"
                            :value="item"
                          >
                            <template v-slot:label>
                              <div class="generate-name">{{item.inputName}}</div>
                            </template>
                          </v-checkbox>
                        </div>
                      </div>
                      <div class="d-flex justify-end">
                        <v-btn color="primary" small text @click="complete('leftObj')">完成</v-btn>
                      </div>
                    </v-card>
                  </v-menu>
                  <v-btn color="primary" text @click="clearEntry('leftObj')">清空输入项</v-btn>
                </v-card>
              </v-menu>
            </div>
          </div>
          <div class="pl-3">
            <div class="pt-2" v-for="item in chartSource.leftObj.selectedList" :key="item.key">{{item.inputName}}：</div>
          </div>
        </div>
      </div>
      <!--右边echart相关-->
      <div class="ma-3" :style="{width:`${wrapWidth-250}px`}">
        <div class="d-flex align-center mb-3">
          <span class="mr-2" style="width:3px; height:25px; background-color: #5D7CC5;"></span>
          <div>
            <v-menu offset-x v-model="chartSource.firstChart.isMenu">
              <template v-slot:activator="{ on, attrs }">
                <div class="pr-2" v-bind="attrs" v-on="on">{{chartSource.firstChart.title}}</div>
              </template>
              <v-card class="d-flex flex-column" elevation="0">
                <v-menu offset-x
                        v-model="chartSource.firstChart.isEntryMenu"
                        :close-on-content-click="false">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" color="primary" text @click="addEntry('firstChart')">选择子标题</v-btn>
                  </template>
                  <v-card class="d-flex flex-column pa-2" style="max-width:210px">
                    <v-text-field
                      prepend-inner-icon="mdi-magnify"
                      clearable
                      outlined
                      dense
                      hide-details
                      placeholder="请输入名称"
                      v-model="entryList.firstChart"
                      @input="handleSearch('firstChart')"
                    />
                    <div style="max-height:180px; max-width: 250px; overflow-y:auto;">
                      <div v-for="item in chartSource.firstChart.items" :key="item.key">
                        <v-checkbox
                          dense
                          hide-details
                          v-model="chartSource.firstChart.selectedList"
                          :value="item"
                        >
                          <template v-slot:label>
                            <div class="generate-name">{{item.title}}</div>
                          </template>
                        </v-checkbox>
                      </div>
                    </div>
                    <div class="d-flex justify-end">
                      <v-btn color="primary" small text @click="complete('firstChart','handleFirstChartData')">完成</v-btn>
                    </div>
                  </v-card>
                </v-menu>
                <v-btn color="primary" text @click="clearEntry('firstChart')">清空子标题</v-btn>
              </v-card>
            </v-menu>
          </div>
        </div>
        <div id="firstChartId" class="chartTransition" :style="{height:`${chartHeight.chart1st}px`}"></div>
        <div class="d-flex align-center mb-3">
          <span class="mr-2" style="width:3px; height:25px; background-color: #5D7CC5;"></span>
          <div>
            <v-menu offset-x v-model="chartSource.secondChart.isMenu">
              <template v-slot:activator="{ on, attrs }">
                <div class="pr-2" v-bind="attrs" v-on="on">{{chartSource.secondChart.title}}</div>
              </template>
              <v-card class="d-flex flex-column" elevation="0">
                <v-menu offset-x
                        v-model="chartSource.secondChart.isEntryMenu"
                        :close-on-content-click="false">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" color="primary" text @click="addEntry('secondChart')">选择子标题</v-btn>
                  </template>
                  <v-card class="d-flex flex-column pa-2" style="max-width:210px">
                    <v-text-field
                      prepend-inner-icon="mdi-magnify"
                      clearable
                      outlined
                      dense
                      hide-details
                      placeholder="请输入名称"
                      v-model="entryList.secondChart"
                      @input="handleSearch('secondChart')"
                    />
                    <div style="max-height:180px; max-width: 250px; overflow-y:auto;">
                      <div v-for="item in chartSource.secondChart.items" :key="item.key">
                        <v-checkbox
                          dense
                          hide-details
                          v-model="chartSource.secondChart.selectedList"
                          :value="item"
                        >
                          <template v-slot:label>
                            <div class="generate-name">{{item.title}}</div>
                          </template>
                        </v-checkbox>
                      </div>
                    </div>
                    <div class="d-flex justify-end">
                      <v-btn color="primary" small text @click="complete('secondChart','handleSecondChartData')">完成</v-btn>
                    </div>
                  </v-card>
                </v-menu>
                <v-btn color="primary" text @click="clearEntry('secondChart')">清空子标题</v-btn>
              </v-card>
            </v-menu>
          </div>
        </div>
        <div id="secondChartId" class="chartTransition" :style="{height:`${chartHeight.chart2nd}px`}"></div>
        <div class="d-flex align-center mb-3">
          <span class="mr-2" style="width:3px; height:25px; background-color: #5D7CC5;"></span>
          <div>
            <v-menu offset-x v-model="chartSource.thirdChart.isMenu">
              <template v-slot:activator="{ on, attrs }">
                <div class="pr-2" v-bind="attrs" v-on="on">{{chartSource.thirdChart.title}}</div>
              </template>
              <v-card class="d-flex flex-column" elevation="0">
                <v-menu offset-x
                        v-model="chartSource.thirdChart.isEntryMenu"
                        :close-on-content-click="false">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" color="primary" text @click="addEntry('thirdChart')">选择子标题</v-btn>
                  </template>
                  <v-card class="d-flex flex-column pa-2" style="max-width:210px">
                    <v-text-field
                      prepend-inner-icon="mdi-magnify"
                      clearable
                      outlined
                      dense
                      hide-details
                      placeholder="请输入名称"
                      v-model="entryList.thirdChart"
                      @input="handleSearch('thirdChart')"
                    />
                    <div style="max-height:180px; max-width: 250px; overflow-y:auto;">
                      <div v-for="item in chartSource.thirdChart.items" :key="item.key">
                        <v-checkbox
                          dense
                          hide-details
                          v-model="chartSource.thirdChart.selectedList"
                          :value="item"
                        >
                          <template v-slot:label>
                            <div class="generate-name">{{item.title}}</div>
                          </template>
                        </v-checkbox>
                      </div>
                    </div>
                    <div class="d-flex justify-end">
                      <v-btn color="primary" small text @click="complete('thirdChart','handleThirdChartData')">完成</v-btn>
                    </div>
                  </v-card>
                </v-menu>
                <v-btn color="primary" text @click="clearEntry('thirdChart')">清空子标题</v-btn>
              </v-card>
            </v-menu>
          </div>
        </div>
        <div id="thirdChartId" class="chartTransition" :style="{height:`${chartHeight.chart3rd}px`}"></div>
      </div>
    </v-card>
    <skeleton-modal ref="titleDialog"></skeleton-modal>
  </div>
</template>

<script>
import moment from 'moment'
import * as Echarts from 'echarts'
import skeletonModal from './skeleton-modal'

export default {
  components: { skeletonModal },
  data: () => ({
    perData: ['姓名', '患者编号', '性别', '出生日期', '最近诊断'],
    selectedLData: {
      title: '',
      remarks: ''
    }, // 选中的左边的子标题
    isSelectLData: false,
    isCreated: false, // 是否添加了子标题
    chartHeight: { // echart高度
      chart1st: 210,
      chart2nd: 210,
      chart3rd: 270
    },
    firstChartData: null,
    secondChartData: null,
    thirdChartData: null,
    chartSource: {
      leftObj: {
        id: 0,
        title: '',
        remarks: '',
        isMenu: false,
        isEntryMenu: false,
        items: [], // 全部输入项
        selectedList: [], // 选中的输入项
        allItems: []
      },
      firstChart: {
        id: 1,
        title: '事件记录',
        isMenu: false,
        isEntryMenu: false,
        items: [],
        selectedList: [], // 选中的输入项
        allItems: [],
        option: {
          yAxisData: [],
          tooltip: []
        }
      },
      secondChart: {
        id: 2,
        title: '事件记录',
        items: [], // 全部输入项
        selectedList: [], // 选中的输入项
        allItems: [],
        option: {
          yAxisData: [],
          tooltip: []
        }
      },
      thirdChart: {
        id: 3,
        title: '变化趋势',
        items: [], // 全部输入项
        selectedList: [], // 选中的输入项
        allItems: [],
        option: {
          yAxisData: []
        }
      }
    },
    startDate: '',
    endDate: '',
    firstSeriesData: [],
    secondSeriesData: [],
    thirdSeriesData: [],
    countSelectedList: 0,
    entryList: { // 搜索框内的参数
      leftTitle: {
        value: '',
        allLData: [],
        selected: []
      },
      leftObj: '',
      firstChart: '',
      secondChart: '',
      thirdChart: ''
    },
    isClick: false,
    oldSelectedList: []
  }),
  props: ['wrapWidth', 'wrapHeight'],
  watch: {
    // 选择子标题
    isSelectLData (newVal, oldVal) {
      // 打开弹窗
      console.log(this.entryList.leftTitle.selected)
      if (newVal && !oldVal) {
        this.oldSelectedList = this.selectedLData
      }
      // 关闭弹窗
      if (!newVal && oldVal && !this.isClick) {
        this.selectedLData = this.oldSelectedList
      }
      if (!newVal) {
        setTimeout(() => {
          this.entryList.leftTitle.value = ''
          this.entryList.leftTitle.selected = this.entryList.leftTitle.allLData
        }, 500)
      }
      this.isClick = false
    },
    // 子标题输入项的二级菜单
    'chartSource.leftObj.isEntryMenu' (i, j) {
      this.handleEntryMenu(i, j, 'leftObj')
    },
    // 时间点chart的二级菜单
    'chartSource.firstChart.isEntryMenu' (i, j) {
      this.handleEntryMenu(i, j, 'firstChart')
    },
    // 时间段chart的二级菜单
    'chartSource.secondChart.isEntryMenu' (i, j) {
      this.handleEntryMenu(i, j, 'secondChart')
    },
    // 折线图chart的二级菜单
    'chartSource.thirdChart.isEntryMenu' (i, j) {
      this.handleEntryMenu(i, j, 'thirdChart')
    }
  },
  methods: {
    // 删除子标题
    deleteLTitle () {
      this.selectedLData = {
        title: '',
        remarks: ''
      }
      this.isCreated = false
      this.chartSource.leftObj.isMenu = false
      this.chartSource.leftObj.isEntryMenu = false
      this.chartSource.leftObj.selectedList = []
    },
    // 搜索内容
    handleSearch (value) {
      switch (value) {
        case 'leftTitle':
          if (!this.entryList.leftTitle.value) {
            this.entryList.leftTitle.selected = this.entryList.leftTitle.allLData
            return
          }
          this.entryList.leftTitle.value.trim()
          this.entryList.leftTitle.selected = []
          this.entryList.leftTitle.allLData.forEach(e => {
            if (e.title.includes(this.entryList.leftTitle.value)) {
              this.entryList.leftTitle.selected.push(e)
            }
          })
          break
        case 'leftObj':
          if (!this.entryList.leftObj) {
            this.chartSource.leftObj.searchList = this.chartSource.leftObj.items
            return
          }
          this.entryList.leftObj.trim()
          this.chartSource.leftObj.searchList = []
          this.chartSource.leftObj.items.forEach(e => {
            if (e.inputName.includes(this.entryList.leftObj)) {
              this.chartSource.leftObj.searchList.push(e)
            }
          })
          break
        case 'firstChart':
          if (!this.entryList.firstChart) {
            this.chartSource.firstChart.items = this.chartSource.firstChart.allItems
            return
          }
          this.entryList.firstChart.trim()
          this.chartSource.firstChart.items = []
          this.chartSource.firstChart.allItems.forEach(e => {
            if (e.title.includes(this.entryList.firstChart)) {
              this.chartSource.firstChart.items.push(e)
            }
          })
          break
      }
    },
    // 添加输入项
    addEntry (value) {
      this.chartSource[value].entryDialog = true
    },
    // 点击完成按钮
    complete (value, chart) {
      if (value === 0) {
        if (this.selectedLData && this.selectedLData.title) {
          this.isCreated = true
          this.chartSource.leftObj.title = this.selectedLData.title
          this.chartSource.leftObj.remarks = this.selectedLData.remarks
          this.chartSource.leftObj.items = this.selectedLData.selectedEntryList
          this.chartSource.leftObj.searchList = this.selectedLData.selectedEntryList
        }
      } else {
        if (chart) this[chart](this.chartSource[value].selectedList)
        this.chartSource[value].isMenu = false
        this.chartSource[value].isEntryMenu = false
      }
      this.isClick = true
      this.isSelectLData = false
    },
    // 清空输入项
    clearEntry (value) {
      this.chartSource[value].selectedList = []
    },
    // 二级弹窗事件
    handleEntryMenu (newVal, oldVal, name) {
      // 打开弹窗
      if (newVal && !oldVal) {
        this.oldSelectedList = this.chartSource[name].selectedList
      }
      // 关闭弹窗
      if (!newVal && oldVal && !this.isClick) {
        this.chartSource[name].selectedList = this.oldSelectedList
      }
      if (!newVal) {
        setTimeout(() => {
          this.entryList[name] = ''
          this.chartSource[name].items = this.chartSource[name].allItems
        }, 500)
      }
      this.isClick = false
    },
    // 传入时间点chart的数据
    handleFirstChartData (val) {
      const arr = []
      const contentArr = []
      this.firstSeriesData = []
      val.forEach(e => {
        // 存入标题
        arr.push(e.title)
        // 存入tooltip信息
        const ttArr = []
        e.selectedEntryList.forEach(ele => {
          ttArr.push(ele.inputName)
        })
        contentArr.push(ttArr)
        for (let i = 0; i < 5; i++) {
          const j = Math.ceil(Math.random() * 5 + i * 5)
          this.firstSeriesData.push({
            value: [moment().format(`YYYY-MM-${j > 9 ? '' : 0}${j} 00:00`), e.title],
            tipData: ttArr
          })
        }
      })
      this.chartSource.firstChart.option.yAxisData = arr
      this.chartSource.firstChart.option.tooltip = contentArr
      this.chartHeight.chart1st = val.length > 3 ? 210 + (val.length - 3) * 70 : 210
      this.firstChartData.resize({
        height: this.chartHeight.chart1st
      })
      this.initChart1st()
    },
    // 传入时间段chart的数据
    handleSecondChartData (val) {
      const arr = []
      const contentArr = []
      this.secondSeriesData = []
      val.forEach(e => {
        // 存入标题
        arr.push(e.title)
        // 存入tooltip信息
        const ttArr = []
        e.selectedEntryList.forEach(ele => {
          ttArr.push(ele.inputName)
        })
        contentArr.push(ttArr)
        for (let i = 0; i < 3; i++) {
          const j = Math.ceil(Math.random() * 4 + i * 8)
          this.secondSeriesData.push({
            value: [e.title, moment().format(`YYYY-MM-${j > 9 ? '' : 0}${j} 00:00`), moment().format(`YYYY-MM-${j + 2 > 9 ? '' : 0}${j + 3} 00:00`)],
            tipData: ttArr
          })
        }
      })
      this.chartSource.secondChart.option.yAxisData = arr
      this.chartSource.secondChart.option.tooltip = contentArr
      this.chartHeight.chart2nd = val.length > 3 ? 210 + (val.length - 3) * 70 : 210
      this.secondChartData.resize({
        height: this.chartHeight.chart2nd
      })
      this.initChart2nd()
    },
    // 传入折线图chart的数据
    handleThirdChartData (val) {
      const titleArr = []
      this.thirdSeriesData = []
      val.forEach((e) => {
        titleArr.push(e.title)
        const arr = ['01', '05', '08', '13', '17', '21', '25', '28']
        const dateArr = []
        arr.forEach(t => {
          dateArr.push([moment().format(`YYYY-MM-${t} 00:00`), Math.floor(Math.random() * 97 + 2)])
        })
        this.thirdSeriesData.push({
          name: e.title,
          type: 'line',
          data: dateArr
        })
      })
      this.chartSource.thirdChart.option.yAxisData = titleArr
      if (this.thirdChartData) {
        Echarts.dispose(this.thirdChartData)
        this.thirdChartData = Echarts.init(document.getElementById('thirdChartId'))
      }
      this.initChart3rd()
    },
    initChart1st () {
      const option = {
        xAxis: {
          type: 'time',
          min: this.startDate,
          max: this.endDate,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: { show: false },
          show: true
        },
        yAxis: {
          data: this.chartSource.firstChart.option.yAxisData,
          splitLine: {
            show: true
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          inverse: true
        },
        tooltip: {
          show: true,
          confine: true,
          borderWidth: 0,
          formatter: (params) => {
            const div = document.createElement('div')
            Object.assign(div.style, {
              minWidth: '150px',
              border: 'none'
            })
            params.data.tipData.forEach(e => {
              div.innerHTML += `<div style="padding-bottom: 5px">${e}:</div>`
            })
            return div
          }
        },
        grid: {
          top: '5%',
          left: '4%',
          right: '2%',
          bottom: '10%'
        },
        series: [{
          symbolSize: [7, 25],
          data: this.firstSeriesData,
          type: 'scatter',
          symbol: 'rect',
          colorBy: 'data'
        }]
      }
      this.firstChartData.setOption(option)
    },
    initChart2nd () {
      const renderItem = (params, api) => {
        const rowData = api.value(0)
        const start = api.coord([api.value(1), rowData])
        const end = api.coord([api.value(2), rowData])
        const rectShape = Echarts.graphic.clipRectByRect({
          x: start[0],
          y: start[1] - 25 / 2,
          width: end[0] - start[0],
          height: 25
        }, {
          x: params.coordSys.x,
          y: params.coordSys.y,
          width: params.coordSys.width,
          height: params.coordSys.height
        })
        return (rectShape && { type: 'rect', transition: ['shape'], shape: rectShape, style: api.style() })
      }
      const option = {
        xAxis: {
          type: 'time',
          min: this.startDate,
          max: this.endDate,
          show: false
        },
        yAxis: {
          data: this.chartSource.secondChart.option.yAxisData,
          splitLine: {
            show: true
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          inverse: true
        },
        tooltip: {
          show: true,
          confine: true,
          borderWidth: 0,
          formatter: (params) => {
            const div = document.createElement('div')
            Object.assign(div.style, {
              minWidth: '150px',
              border: 'none'
            })
            params.data.tipData.forEach(e => {
              div.innerHTML += `<div style="padding-bottom: 5px">${e}:</div>`
            })
            return div
          }
        },
        grid: {
          top: '5%',
          left: '4%',
          right: '2%',
          bottom: '10%'
        },
        series: [{
          data: this.secondSeriesData,
          type: 'custom',
          encode: {
            x: [1, 2],
            y: 0
          },
          renderItem: renderItem,
          symbol: 'rect',
          colorBy: 'data'
        }]
      }
      this.secondChartData.setOption(option)
    },
    initChart3rd () {
      const option = {
        xAxis: {
          type: 'time',
          min: this.startDate,
          max: this.endDate,
          show: true,
          axisLabel: {
            formatter: '{yyyy}-{MM}-{dd}'
          }
        },
        yAxis: {
          min: 0,
          max: 100,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          }
        },
        legend: {
          show: true
        },
        grid: {
          top: '10%',
          left: '4%',
          right: '2%',
          bottom: '10%'
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          z: -1
        },
        series: this.thirdSeriesData
      }
      this.thirdChartData.setOption(option)
    }
  },
  created () {
    const templateData = {
      id: 1602228928519495700,
      templateId: 103,
      dataSource: {
        data: [
          {
            title: '基本信息',
            selectedEntryList: [
              {
                key: 'Key07BCDC47EE68981B',
                isPartook: false,
                mdsName: '',
                inputName: '姓名',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: true,
                remark: '',
                switchTime: false,
                timeFormat: '',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: ''
                },
                isClass: false,
                error: ''
              },
              {
                key: 'Key20CA50A1A599C44C',
                isPartook: false,
                mdsName: '',
                inputName: '患者编号',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: true,
                remark: '',
                switchTime: false,
                timeFormat: '',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: ''
                },
                isClass: false,
                error: ''
              },
              {
                key: 'Key55781532510340BB',
                isPartook: false,
                mdsName: '',
                inputName: '性别',
                inputTypeEnum: 'COMBO_BOX',
                isRequire: true,
                remark: '',
                switchTime: false,
                timeFormat: '',
                isBan: false,
                value: '',
                inputComboBOX: {
                  contexts: [
                    {
                      id: 'BF7D87DC',
                      isInput: false,
                      value: '男',
                      label: '',
                      error: false
                    },
                    {
                      id: '2EFB6426',
                      isInput: false,
                      value: '女',
                      label: '',
                      error: false
                    }
                  ],
                  chooseTypeEnum: 'SINGLE',
                  timeType: '',
                  timeFormat: ''
                },
                isClass: false,
                error: ''
              },
              {
                key: 'Key8F55283F0C793873',
                isPartook: false,
                mdsName: '',
                inputName: '出生日期',
                inputTypeEnum: 'DATE',
                isRequire: true,
                remark: '',
                switchTime: false,
                timeFormat: 'date',
                isBan: false,
                value: '',
                isClass: false,
                error: ''
              },
              {
                key: 'Key8236DC8FF782B5E0',
                isPartook: false,
                mdsName: '',
                inputName: '最近诊断',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: true,
                remark: '',
                switchTime: false,
                timeFormat: '',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: ''
                },
                isClass: false,
                error: ''
              }
            ],
            items: [],
            entryValue: '',
            id: 1
          },
          {
            id: 2,
            title: '左子标题1',
            isCreate: false,
            entryValue: '',
            selectedEntryList: [
              {
                key: 'Key80B749DE0EFC409A',
                isPartook: false,
                mdsName: '',
                inputName: '左1内容1',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: true,
                remark: '',
                switchTime: false,
                timeFormat: '',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: ''
                }
              },
              {
                key: 'Key126F2FCA0CD7A270',
                isPartook: false,
                mdsName: '',
                inputName: '左1内容2',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: '',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: ''
                }
              },
              {
                key: 'Key2D0BAC57E2001766',
                isPartook: false,
                mdsName: '',
                inputName: '左1内容3',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: '',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: ''
                }
              }
            ],
            items: []
          },
          {
            id: 3,
            title: '左子标题2',
            isCreate: false,
            entryValue: '',
            selectedEntryList: [
              {
                key: 'KeyF3EEC331010FF903',
                isPartook: false,
                mdsName: '',
                inputName: '左2内容1',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: '',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: ''
                }
              },
              {
                key: 'KeyE3A0C8ED278EC2F5',
                isPartook: false,
                mdsName: '',
                inputName: '左2内容2',
                inputTypeEnum: 'DATE',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: 'date',
                isBan: false,
                value: ''
              },
              {
                key: 'Key073FB2C8E1878400',
                isPartook: false,
                mdsName: '',
                inputName: '左2内容3',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: '',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: ''
                }
              }
            ],
            items: []
          },
          {
            id: 4,
            title: '左子标题3',
            isCreate: false,
            entryValue: '',
            selectedEntryList: [
              {
                key: 'Key8DDC02DDDF7DB5A0',
                isPartook: false,
                mdsName: '',
                inputName: '左3内容1',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: '',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: ''
                }
              },
              {
                key: 'Key874406FCD1E0344F',
                isPartook: false,
                mdsName: '',
                inputName: '左3内容2',
                inputTypeEnum: 'DATE',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: 'date',
                isBan: false,
                value: ''
              },
              {
                key: 'KeyE5CAFDA2281E2B0E',
                isPartook: false,
                mdsName: '',
                inputName: '左3内容3',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: '',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: ''
                }
              }
            ],
            items: []
          },
          {
            id: 5,
            title: '时间点1',
            isCreate: true,
            entryValue: '',
            selectedEntryList: [
              {
                key: 'Key5510877DDD64C175',
                isPartook: false,
                mdsName: '',
                inputName: '时间点1时间',
                inputTypeEnum: 'DATE',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: 'date',
                isBan: false,
                value: ''
              },
              {
                key: 'KeyE7F65A2ABAAC7CF1',
                isPartook: false,
                mdsName: '',
                inputName: '时间点1内容1',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: 'date'
                }
              },
              {
                key: 'Key275DA844FBF1BDDC',
                isPartook: false,
                mdsName: '',
                inputName: '时间点1内容2',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: 'date'
                }
              },
              {
                key: 'Key5A75E4E94880C051',
                isPartook: false,
                mdsName: '',
                inputName: '时间点1内容3',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: 'date'
                }
              }
            ],
            items: []
          },
          {
            id: 6,
            title: '时间点2',
            isCreate: true,
            entryValue: '',
            selectedEntryList: [
              {
                key: 'Key695E0B72911BE164',
                isPartook: false,
                mdsName: '',
                inputName: '时间点2时间',
                inputTypeEnum: 'DATE',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: 'date',
                isBan: false,
                value: ''
              },
              {
                key: 'KeyB5C7345DFFC4E2B0',
                isPartook: false,
                mdsName: '',
                inputName: '时间点2内容1',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: 'date'
                }
              },
              {
                key: 'Key0B9288F4AC2DEFA1',
                isPartook: false,
                mdsName: '',
                inputName: '时间点2内容2',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: 'date'
                }
              },
              {
                key: 'KeyD8BFDDE90452E64E',
                isPartook: false,
                mdsName: '',
                inputName: '时间点2内容3',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: 'date'
                }
              }
            ],
            items: []
          },
          {
            id: 6,
            title: '时间点3',
            isCreate: true,
            entryValue: '',
            selectedEntryList: [
              {
                key: 'Key695E0B72911BE164',
                isPartook: false,
                mdsName: '',
                inputName: '时间点3时间',
                inputTypeEnum: 'DATE',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: 'date',
                isBan: false,
                value: ''
              },
              {
                key: 'KeyB5C7345DFFC4E2B0',
                isPartook: false,
                mdsName: '',
                inputName: '时间点3内容1',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: 'date'
                }
              },
              {
                key: 'Key0B9288F4AC2DEFA1',
                isPartook: false,
                mdsName: '',
                inputName: '时间点3内容2',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: 'date'
                }
              },
              {
                key: 'KeyD8BFDDE90452E64E',
                isPartook: false,
                mdsName: '',
                inputName: '时间点3内容3',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: 'date'
                }
              }
            ],
            items: []
          },
          {
            id: 17,
            title: '时间点4',
            isCreate: true,
            entryValue: '',
            selectedEntryList: [
              {
                key: 'Key695E0B72911BE164',
                isPartook: false,
                mdsName: '',
                inputName: '时间点3时间',
                inputTypeEnum: 'DATE',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: 'date',
                isBan: false,
                value: ''
              },
              {
                key: 'KeyB5C7345DFFC4E2B0',
                isPartook: false,
                mdsName: '',
                inputName: '时间点3内容1',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: 'date'
                }
              },
              {
                key: 'Key0B9288F4AC2DEFA1',
                isPartook: false,
                mdsName: '',
                inputName: '时间点3内容2',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: 'date'
                }
              },
              {
                key: 'KeyD8BFDDE90452E64E',
                isPartook: false,
                mdsName: '',
                inputName: '时间点3内容3',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: 'date'
                }
              }
            ],
            items: []
          },
          {
            id: 18,
            title: '时间点5',
            isCreate: true,
            entryValue: '',
            selectedEntryList: [
              {
                key: 'Key695E0B72911BE164',
                isPartook: false,
                mdsName: '',
                inputName: '时间点3时间',
                inputTypeEnum: 'DATE',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: 'date',
                isBan: false,
                value: ''
              },
              {
                key: 'KeyB5C7345DFFC4E2B0',
                isPartook: false,
                mdsName: '',
                inputName: '时间点3内容1',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: 'date'
                }
              },
              {
                key: 'Key0B9288F4AC2DEFA1',
                isPartook: false,
                mdsName: '',
                inputName: '时间点3内容2',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: 'date'
                }
              },
              {
                key: 'KeyD8BFDDE90452E64E',
                isPartook: false,
                mdsName: '',
                inputName: '时间点3内容3',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: 'date'
                }
              }
            ],
            items: []
          },
          {
            id: 19,
            title: '时间点6',
            isCreate: true,
            entryValue: '',
            selectedEntryList: [
              {
                key: 'Key695E0B72911BE164',
                isPartook: false,
                mdsName: '',
                inputName: '时间点3时间',
                inputTypeEnum: 'DATE',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: 'date',
                isBan: false,
                value: ''
              },
              {
                key: 'KeyB5C7345DFFC4E2B0',
                isPartook: false,
                mdsName: '',
                inputName: '时间点3内容1',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: 'date'
                }
              },
              {
                key: 'Key0B9288F4AC2DEFA1',
                isPartook: false,
                mdsName: '',
                inputName: '时间点3内容2',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: 'date'
                }
              },
              {
                key: 'KeyD8BFDDE90452E64E',
                isPartook: false,
                mdsName: '',
                inputName: '时间点3内容3',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: 'date'
                }
              }
            ],
            items: []
          },
          {
            id: 7,
            title: '时间段1',
            isCreate: true,
            entryValue: '',
            selectedEntryList: [
              {
                key: 'KeyB1EDC8B07D8AF60D',
                isPartook: false,
                mdsName: '',
                inputName: '时间段1时间',
                inputTypeEnum: 'DATE',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: 'daterange',
                isBan: false,
                value: ''
              },
              {
                key: 'KeyD78C2F0E25269391',
                isPartook: false,
                mdsName: '',
                inputName: '时间段1内容1',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'daterange',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: 'daterange'
                }
              },
              {
                key: 'Key00E7F19A53E8C45E',
                isPartook: false,
                mdsName: '',
                inputName: '时间段1内容2',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'daterange',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: 'daterange'
                }
              },
              {
                key: 'KeyE9537B3313A575D7',
                isPartook: false,
                mdsName: '',
                inputName: '时间段1内容3',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'daterange',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: 'daterange'
                }
              }
            ],
            items: []
          },
          {
            id: 8,
            title: '时间段2',
            isCreate: true,
            entryValue: '',
            selectedEntryList: [
              {
                key: 'Key46906585862B9650',
                isPartook: false,
                mdsName: '',
                inputName: '时间段2时间',
                inputTypeEnum: 'DATE',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'daterange',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: 'daterange'
                }
              },
              {
                key: 'Key33AE6DCC339D8074',
                isPartook: false,
                mdsName: '',
                inputName: '时间段2内容1',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: '',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: ''
                }
              },
              {
                key: 'Key1D9C9DFA6400632A',
                isPartook: false,
                mdsName: '',
                inputName: '时间段2内容2',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'daterange',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: 'daterange'
                }
              },
              {
                key: 'Key6954792B6E7F64F3',
                isPartook: false,
                mdsName: '',
                inputName: '时间段2内容3',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'daterange',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: 'daterange'
                }
              }
            ],
            items: []
          },
          {
            id: 14,
            title: '时间段3',
            isCreate: true,
            entryValue: '',
            selectedEntryList: [
              {
                key: 'Key46906585862B9650',
                isPartook: false,
                mdsName: '',
                inputName: '时间段2时间',
                inputTypeEnum: 'DATE',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'daterange',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: 'daterange'
                }
              },
              {
                key: 'Key33AE6DCC339D8074',
                isPartook: false,
                mdsName: '',
                inputName: '时间段2内容1',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: '',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: ''
                }
              },
              {
                key: 'Key1D9C9DFA6400632A',
                isPartook: false,
                mdsName: '',
                inputName: '时间段2内容2',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'daterange',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: 'daterange'
                }
              },
              {
                key: 'Key6954792B6E7F64F3',
                isPartook: false,
                mdsName: '',
                inputName: '时间段2内容3',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'daterange',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: 'daterange'
                }
              }
            ],
            items: []
          },
          {
            id: 15,
            title: '时间段4',
            isCreate: true,
            entryValue: '',
            selectedEntryList: [
              {
                key: 'Key46906585862B9650',
                isPartook: false,
                mdsName: '',
                inputName: '时间段2时间',
                inputTypeEnum: 'DATE',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'daterange',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: 'daterange'
                }
              },
              {
                key: 'Key33AE6DCC339D8074',
                isPartook: false,
                mdsName: '',
                inputName: '时间段2内容1',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: '',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: ''
                }
              },
              {
                key: 'Key1D9C9DFA6400632A',
                isPartook: false,
                mdsName: '',
                inputName: '时间段2内容2',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'daterange',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: 'daterange'
                }
              },
              {
                key: 'Key6954792B6E7F64F3',
                isPartook: false,
                mdsName: '',
                inputName: '时间段2内容3',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'daterange',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: 'daterange'
                }
              }
            ],
            items: []
          },
          {
            id: 16,
            title: '时间段5',
            isCreate: true,
            entryValue: '',
            selectedEntryList: [
              {
                key: 'Key46906585862B9650',
                isPartook: false,
                mdsName: '',
                inputName: '时间段2时间',
                inputTypeEnum: 'DATE',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'daterange',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: 'daterange'
                }
              },
              {
                key: 'Key33AE6DCC339D8074',
                isPartook: false,
                mdsName: '',
                inputName: '时间段2内容1',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: '',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: ''
                }
              },
              {
                key: 'Key1D9C9DFA6400632A',
                isPartook: false,
                mdsName: '',
                inputName: '时间段2内容2',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'daterange',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: 'daterange'
                }
              },
              {
                key: 'Key6954792B6E7F64F3',
                isPartook: false,
                mdsName: '',
                inputName: '时间段2内容3',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'daterange',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: 'daterange'
                }
              }
            ],
            items: []
          },
          {
            id: 9,
            title: '折线图1',
            isCreate: true,
            entryValue: '',
            selectedEntryList: [
              {
                key: 'Key9CEB14643DE68294',
                isPartook: false,
                mdsName: '',
                inputName: '折线图1时间',
                inputTypeEnum: 'DATE',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: 'date',
                isBan: false,
                value: ''
              },
              {
                key: 'Key8CEF74070FED7C1B',
                isPartook: false,
                mdsName: '',
                inputName: '折线图1数据',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: 'date'
                }
              }
            ],
            items: []
          },
          {
            id: 10,
            title: '折线图2',
            isCreate: true,
            entryValue: '',
            selectedEntryList: [
              {
                key: 'Key954C400AAB40EB93',
                isPartook: false,
                mdsName: '',
                inputName: '折线图2时间',
                inputTypeEnum: 'DATE',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: 'date',
                isBan: false,
                value: ''
              },
              {
                key: 'Key929AD28DCA93BAFC',
                isPartook: false,
                mdsName: '',
                inputName: '折线图2数据',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: 'date'
                }
              }
            ],
            items: []
          },
          {
            id: 11,
            title: '折线图3',
            isCreate: true,
            entryValue: '',
            selectedEntryList: [
              {
                key: 'Key641CC03282872DD5',
                isPartook: false,
                mdsName: '',
                inputName: '折线图3时间',
                inputTypeEnum: 'DATE',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: 'date',
                isBan: false,
                value: ''
              },
              {
                key: 'Key28E59F417E3CF373',
                isPartook: false,
                mdsName: '',
                inputName: '折线图3数据',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: 'date'
                }
              }
            ],
            items: []
          },
          {
            id: 12,
            title: '折线图4',
            isCreate: true,
            entryValue: '',
            selectedEntryList: [
              {
                key: 'KeyA8FCFF1FE292F800',
                isPartook: false,
                mdsName: '',
                inputName: '折线图4时间',
                inputTypeEnum: 'DATE',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: 'date',
                isBan: false,
                value: ''
              },
              {
                key: 'KeyAF984022E82A3885',
                isPartook: false,
                mdsName: '',
                inputName: '折线图4数据',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: 'date'
                }
              }
            ],
            items: []
          },
          {
            id: 13,
            title: '折线图5',
            isCreate: true,
            entryValue: '',
            selectedEntryList: [
              {
                key: 'Key9FC75C6FD1E07441',
                isPartook: false,
                mdsName: '',
                inputName: '折线图5时间',
                inputTypeEnum: 'DATE',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: 'date',
                isBan: false,
                value: ''
              },
              {
                key: 'Key570030435E55A8D8',
                isPartook: false,
                mdsName: '',
                inputName: '折线图5数据',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '',
                  inputEnd: '',
                  referencerBegin: '',
                  referencerEnd: '',
                  inputIsShow: false,
                  referencerIsShow: false,
                  timeType: '',
                  timeFormat: 'date'
                }
              }
            ],
            items: []
          }
        ]
      },
      createTime: '2022-12-12T17:08:39.191631',
      updateTime: '2022-12-13T11:36:10.927821'
    }
    templateData.dataSource.data.forEach(e => {
      if (e.isCreate === false) {
        // 筛选不能新增的作为左下角的配置项
        this.entryList.leftTitle.allLData.push(e)
        this.entryList.leftTitle.selected.push(e)
      } else if (e.isCreate === true) {
        // 筛选能新增的作为echart子标题选择项
        const len = e.selectedEntryList.length
        for (let i = 0; i < len; i++) {
          const DATE = e.selectedEntryList[i].inputTypeEnum === 'DATE'
          const NUMBER_INPUT_BOX = e.selectedEntryList[len - i - 1].inputTypeEnum === 'NUMBER_INPUT_BOX'
          const date = e.selectedEntryList[i].timeFormat === 'date'
          const revDate = e.selectedEntryList[len - i - 1].timeFormat === 'date'
          const daterange = e.selectedEntryList[i].timeFormat === 'daterange'
          if (DATE && date) { // 筛选时间点和折线图
            if (NUMBER_INPUT_BOX && revDate && len === 2) {
              this.chartSource.thirdChart.items.push(e)
              this.chartSource.thirdChart.allItems.push(e)
              break
            } else {
              this.chartSource.firstChart.items.push(e)
              this.chartSource.firstChart.allItems.push(e)
              break
            }
          } else if (DATE && daterange) { // 筛选时间段
            this.chartSource.secondChart.items.push(e)
            this.chartSource.secondChart.allItems.push(e)
            break
          }
        }
      }
    })
    this.startDate = moment().format('YYYY-MM-01 00:00')
    this.endDate = moment().format(moment().add(1, 'months').format('YYYY-MM-01 00:00'))
  },
  mounted () {
    this.firstChartData = Echarts.init(document.getElementById('firstChartId'))
    this.secondChartData = Echarts.init(document.getElementById('secondChartId'))
    this.thirdChartData = Echarts.init(document.getElementById('thirdChartId'))
    this.initChart1st()
    this.initChart2nd()
    this.initChart3rd()
    this.handleFirstChartData(this.chartSource.firstChart.selectedList)
    this.handleSecondChartData(this.chartSource.secondChart.selectedList)
    this.handleThirdChartData(this.chartSource.thirdChart.selectedList)
  }
}
</script>

<style scoped>
.chartTransition{
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) 0s, visibility 0s ease 0s
}
</style>
