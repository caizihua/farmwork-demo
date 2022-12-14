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
                  prepend-inner-icon="mdi-magnify"
                  clearable
                  outlined
                  dense
                  hide-details
                  placeholder="请输入名称"
                />
                <div style="max-height:180px; max-width: 250px; overflow-y:auto;">
                  <div v-for="item in allLData" :key="item.id">
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
                      />
                      <div style="max-height:180px; max-width: 250px; overflow-y:auto;">
                        <div v-for="item in chartSource.leftObj.items" :key="item.key">
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
                  <v-btn color="primary" text @click="clearLEntry('leftObj')">清空输入项</v-btn>
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
                    />
                    <div style="max-height:180px; max-width: 250px; overflow-y:auto;">
                      <div v-for="item in chartSource.firstChart.items" :key="item.key">
                        <v-checkbox
                          dense
                          hide-details
                          v-model="firstObj.selectedItems"
                          :value="item"
                        >
                          <template v-slot:label>
                            <div class="generate-name">{{item.inputName}}</div>
                          </template>
                        </v-checkbox>
                      </div>
                    </div>
                    <div class="d-flex justify-end">
                      <v-btn color="primary" small text @click="complete('firstChart')">完成</v-btn>
                    </div>
                  </v-card>
                </v-menu>
                <v-btn color="primary" text @click="clearLEntry('firstChart')">清空子标题</v-btn>
              </v-card>
            </v-menu>
          </div>
        </div>
        <div id="firstChart" :style="{height:`${chartHeight.chart1st}px`}"></div>
        <div class="d-flex align-center mb-3">
          <span class="mr-2" style="width:3px; height:25px; background-color: #5D7CC5;"></span>
          <div>
            <v-menu offset-x>
              <template v-slot:activator="{ on, attrs }">
                <div class="pr-2" v-bind="attrs" v-on="on">{{secondObj.title}}</div>
              </template>
              <v-card class="d-flex flex-column" elevation="0">
                <v-menu offset-x
                        :close-on-content-click="false">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" color="primary" text @click="addEntry('secondObj')">添加输入项</v-btn>
                  </template>
                  <v-card class="d-flex flex-column pa-2" style="max-width:210px">
                    <v-text-field
                      v-model="secondObj.entryValue"
                      prepend-inner-icon="mdi-magnify"
                      clearable
                      outlined
                      dense
                      hide-details
                      placeholder="请输入名称"
                    />
                    <div style="max-height:180px; max-width: 250px; overflow-y:auto;">
                      <div v-for="item in secondObj.items" :key="item.key">
                        <v-checkbox
                          dense
                          hide-details
                          v-model="secondObj.selectedItems"
                          :value="item"
                        >
                          <template v-slot:label>
                            <div class="generate-name">{{item.inputName}}</div>
                          </template>
                        </v-checkbox>
                      </div>
                    </div>
                    <div class="d-flex justify-end">
                      <v-btn color="primary" small text @click="complete('secondObj')">完成</v-btn>
                    </div>
                  </v-card>
                </v-menu>
                <v-btn color="primary" text @click="clearLEntry('secondObj')">清空输入项</v-btn>
              </v-card>
            </v-menu>
          </div>
        </div>
        <div id="secondChart" :style="{height:`${chartHeight.chart2nd}px`}"></div>
        <div class="d-flex align-center mb-3">
          <span class="mr-2" style="width:3px; height:25px; background-color: #5D7CC5;"></span>
          <div>
            <v-menu offset-x>
              <template v-slot:activator="{ on, attrs }">
                <div class="pr-2" v-bind="attrs" v-on="on">{{thirdObj.title}}</div>
              </template>
              <v-card class="d-flex flex-column" elevation="0">
                <v-menu offset-x
                        :close-on-content-click="false">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" color="primary" text @click="addEntry('thirdObj')">添加输入项</v-btn>
                  </template>
                  <v-card class="d-flex flex-column pa-2" style="max-width:210px">
                    <v-text-field
                      v-model="thirdObj.entryValue"
                      prepend-inner-icon="mdi-magnify"
                      clearable
                      outlined
                      dense
                      hide-details
                      placeholder="请输入名称"
                    />
                    <div style="max-height:180px; max-width: 250px; overflow-y:auto;">
                      <div v-for="item in thirdObj.items" :key="item.key">
                        <v-checkbox
                          dense
                          hide-details
                          v-model="thirdObj.selectedItems"
                          :value="item"
                        >
                          <template v-slot:label>
                            <div class="generate-name">{{item.inputName}}</div>
                          </template>
                        </v-checkbox>
                      </div>
                    </div>
                    <div class="d-flex justify-end">
                      <v-btn color="primary" small text @click="complete('thirdObj')">完成</v-btn>
                    </div>
                  </v-card>
                </v-menu>
                <v-btn color="primary" text @click="clearLEntry('thirdObj')">清空输入项</v-btn>
              </v-card>
            </v-menu>
          </div>
        </div>
        <div id="thirdChart" :style="{height:`${chartHeight.chart3rd}px`}"></div>
      </div>
    </v-card>
    <skeleton-modal ref="titleDialog">
    </skeleton-modal>
  </div>
</template>

<script>
import * as Echarts from 'echarts'
import skeletonModal from './skeleton-modal'

export default {
  components: { skeletonModal },
  data: () => ({
    perData: ['姓名', '患者编号', '性别', '出生日期', '最近诊断'],
    allLData: [],
    selectedLData: {
      title: '',
      remarks: ''
    }, // 选中的左边的子标题
    isSelectLData: false,
    isCreated: false, // 是否添加了子标题
    chartHeight: { // echart高度
      chart1st: 200,
      chart2nd: 200,
      chart3rd: 270
    },
    firstObj: {
      title: '事件记录1',
      menuDialog: false,
      entryDialog: false,
      entryValue: null,
      items: [],
      selectedItems: []
    },
    secondObj: {
      title: '事件记录2',
      menuDialog: false,
      entryDialog: false,
      entryValue: null,
      items: [],
      selectedItems: []
    },
    thirdObj: {
      title: '变化趋势',
      menuDialog: false,
      entryDialog: false,
      entryValue: null,
      items: [],
      selectedItems: []
    },
    firstChart: null,
    secondChart: null,
    thirdChart: null,
    chartSource: {
      leftObj: {
        id: 0,
        title: '',
        remarks: '',
        isMenu: false,
        isEntryMenu: false,
        items: [], // 全部输入项
        selectedList: [] // 选中的输入项
      },
      firstChart: {
        id: 1,
        title: '事件记录',
        isMenu: false,
        isEntryMenu: false,
        items: [],
        selectedList: []
      },
      secondChart: {
        id: 2,
        title: '事件记录2',
        items: [], // 全部输入项
        selectedList: [] // 选中的输入项
      },
      thirdChart: {
        id: 3,
        title: '变化趋势',
        items: [], // 全部输入项
        selectedList: [] // 选中的输入项
      }
    }
  }),
  props: ['wrapWidth', 'wrapHeight'],
  watch: {
    selectedLData (val) {
      this.chartSource.leftObj.title = val.title || ''
      this.chartSource.leftObj.remarks = val.remarks || ''
      this.chartSource.leftObj.items = val.selectedEntryList || []
    }
  },
  methods: {
    deleteLTitle () {
      this.selectedLData = {
        title: '',
        remarks: ''
      }
      this.isCreated = false
      this.chartSource.leftObj.isMenu = false
      this.chartSource.leftObj.isEntryMenu = false
    },
    addEntry (value) {
      this.chartSource[value].entryDialog = true
    },
    complete (value) {
      if (value === 0) {
        if (this.selectedLData.title) {
          this.isCreated = true
          this.chartSource.leftObj.title = this.selectedLData.title
          this.chartSource.leftObj.remarks = this.selectedLData.remarks
          this.chartSource.leftObj.items = this.selectedLData.selectedEntryList
        }
      } else {
        this.chartSource[value].isMenu = false
        this.chartSource[value].isEntryMenu = false
      }
      this.isSelectLData = false
    },
    clearLEntry (value) {
      this.chartSource[value].selectedList = []
    },
    initChart1st () {
      const option = {
        xAxis: {
          type: 'time',
          min: '2022-12-01',
          max: '2022-12-31',
          axisLine: {
            show: true
          },
          axisTick: {
            show: true
          },
          axisLabel: {
            formatter: '{yyyy}-{MM}-{dd}'
          }
        },
        yAxis: {
          data: ['b', 'c'],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          inverse: true
        },
        grid: {
          top: '5%',
          left: '2%',
          right: '2%',
          bottom: '5%',
          containLabel: true
        },
        series: [{
          symbolSize: 10,
          data: [
            {
              value: ['2022-12-02', 'b']
            },
            {
              value: ['2022-12-03', 'b']
            },
            {
              value: ['2022-12-04', 'c']
            },
            {
              value: ['2022-12-05', 'c']
            },
            {
              value: ['2022-12-06', 'c']
            },
            {
              value: ['2022-12-07', 'b']
            },
            {
              value: ['2022-12-08', 'b']
            },
            {
              value: ['2022-12-09', 'b']
            },
            {
              value: ['2022-12-10', 'b']
            }
          ],
          type: 'scatter',
          symbol: 'rect',
          colorBy: 'data'
        }]
      }
      this.firstChart.setOption(option)
    },
    initChart2nd () {
      const option = {
        xAxis: {
          type: 'time',
          min: '2022-12-01',
          max: '2022-12-31',
          axisLine: {
            show: true
          },
          axisTick: {
            show: true
          },
          axisLabel: {
            formatter: '{yyyy}-{MM}-{dd}'
          }
        },
        yAxis: {
          data: ['b', 'c'],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          inverse: true
        },
        grid: {
          top: '5%',
          left: '2%',
          right: '2%',
          bottom: '5%',
          containLabel: true
        },
        series: [{
          symbolSize: 10,
          data: [
            {
              value: ['2022-12-02', 'b']
            },
            {
              value: ['2022-12-03', 'b']
            },
            {
              value: ['2022-12-04', 'c']
            },
            {
              value: ['2022-12-05', 'c']
            },
            {
              value: ['2022-12-06', 'c']
            },
            {
              value: ['2022-12-07', 'b']
            },
            {
              value: ['2022-12-08', 'b']
            },
            {
              value: ['2022-12-09', 'b']
            },
            {
              value: ['2022-12-10', 'b']
            }
          ],
          type: 'scatter',
          symbol: 'rect',
          colorBy: 'data'
        }]
      }
      this.secondChart.setOption(option)
    }
  },
  created () {
    this.firstObj.items = [
      { inputName: '时间点事件1', key: 0 },
      { inputName: '时间点事件2', key: 1 },
      { inputName: '时间点事件3', key: 2 },
      { inputName: '时间点事件4', key: 3 }
    ]
    this.secondObj.items = [
      { inputName: '时间段事件1', key: 0 },
      { inputName: '时间段事件2', key: 1 },
      { inputName: '时间段事件3', key: 2 },
      { inputName: '时间段事件4', key: 3 }
    ]
    this.thirdObj.items = [
      { inputName: '折线图事件1', key: 0 },
      { inputName: '折线图事件2', key: 1 },
      { inputName: '折线图事件3', key: 2 },
      { inputName: '折线图事件4', key: 3 }
    ]
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
            entryList: [
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
            id: 1,
            isAddRecord: false,
            isMenu: false,
            isEntryMenu: false
          },
          {
            id: 2,
            title: '事件记录1',
            remarks: '',
            isAddRecord: true,
            isCreate: true,
            isMenu: false,
            isEntryMenu: false,
            entryValue: '',
            selectedEntryList: [
              {
                key: 'Key3FC9596903F031EC',
                isPartook: false,
                mdsName: '',
                inputName: '试验名称1',
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
                key: 'Key1F4A92BB85ACFD93',
                isPartook: false,
                mdsName: '',
                inputName: '试验时间1',
                inputTypeEnum: 'DATE',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: 'date',
                isBan: false,
                value: ''
              },
              {
                key: 'KeyC10A70DAD42C5CEE',
                isPartook: false,
                mdsName: '',
                inputName: '试验1子项1',
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
                key: 'Key6F0427CC9A48AF9D',
                isPartook: false,
                mdsName: '',
                inputName: '试验1子项2',
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
                key: 'Key7188086EE83C8050',
                isPartook: false,
                mdsName: '',
                inputName: '试验1子项3',
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
            items: [],
            entryList: [
              {
                key: 'Key3FC9596903F031EC',
                isPartook: false,
                mdsName: '',
                inputName: '试验名称1',
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
                },
                isClass: false,
                error: ''
              },
              {
                key: 'Key1F4A92BB85ACFD93',
                isPartook: false,
                mdsName: '',
                inputName: '试验时间1',
                inputTypeEnum: 'DATE',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: 'date',
                isBan: false,
                value: '',
                isClass: false,
                error: ''
              },
              {
                key: 'KeyC10A70DAD42C5CEE',
                isPartook: false,
                mdsName: '',
                inputName: '试验1子项1',
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
                },
                isClass: false,
                error: ''
              },
              {
                key: 'Key6F0427CC9A48AF9D',
                isPartook: false,
                mdsName: '',
                inputName: '试验1子项2',
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
                },
                isClass: false,
                error: ''
              },
              {
                key: 'Key7188086EE83C8050',
                isPartook: false,
                mdsName: '',
                inputName: '试验1子项3',
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
                },
                isClass: false,
                error: ''
              }
            ]
          },
          {
            id: 3,
            title: '左子标题',
            remarks: null,
            isMenu: false,
            isCreate: false,
            isEntryMenu: false,
            entryValue: '',
            selectedEntryList: [
              {
                key: 'Key3170019DBF95D722',
                isPartook: false,
                mdsName: '',
                inputName: '外伤史',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: '',
                isBan: true,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: ''
                }
              },
              {
                key: 'Key580FF26A3F22620B',
                isPartook: false,
                mdsName: '',
                inputName: '过敏史',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: '',
                isBan: true,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: ''
                }
              },
              {
                key: 'KeyE153EBA963222B49',
                isPartook: false,
                mdsName: '',
                inputName: '手术史',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: '',
                isBan: true,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: ''
                }
              }
            ],
            items: [],
            entryList: [
              {
                key: 'Key3170019DBF95D722',
                isPartook: false,
                mdsName: '',
                inputName: '外伤史',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: '',
                isBan: true,
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
                key: 'Key580FF26A3F22620B',
                isPartook: false,
                mdsName: '',
                inputName: '过敏史',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: '',
                isBan: true,
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
                key: 'KeyE153EBA963222B49',
                isPartook: false,
                mdsName: '',
                inputName: '手术史',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: '',
                isBan: true,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: ''
                },
                isClass: false,
                error: ''
              }
            ]
          },
          {
            id: 4,
            title: '事件记录2',
            remarks: null,
            isMenu: false,
            isCreate: true,
            isEntryMenu: false,
            entryValue: '',
            selectedEntryList: [
              {
                key: 'KeyE909B9762E78CE16',
                isPartook: false,
                mdsName: '',
                inputName: '事件记录2名称',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: true,
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
                key: 'Key0A07024DBD0D65D8',
                isPartook: false,
                mdsName: '',
                inputName: '事件记录2时间',
                inputTypeEnum: 'DATE',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: 'daterange',
                isBan: false,
                value: ''
              },
              {
                key: 'Key229D344009F1D117',
                isPartook: false,
                mdsName: '',
                inputName: '事件记录2数据',
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
            items: [
              {
                key: 'Key5D8059434DA1C144',
                isPartook: false,
                mdsName: '',
                inputName: '多于的',
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
              },
              {
                key: 'Key77343892762E6B62',
                isPartook: true,
                mdsName: '判断条件',
                inputName: '正常票',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: '',
                isBan: true,
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
                key: 'Key447D2F2844E9A132',
                isPartook: false,
                mdsName: '',
                inputName: '输血史',
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
              },
              {
                key: 'KeyE909B9762E78CE16',
                isPartook: false,
                mdsName: '',
                inputName: '事件记录2名称',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: true,
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
                key: 'Key0A07024DBD0D65D8',
                isPartook: false,
                mdsName: '',
                inputName: '事件记录2时间',
                inputTypeEnum: 'DATE',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: 'daterange',
                isBan: false,
                value: ''
              },
              {
                key: 'Key229D344009F1D117',
                isPartook: false,
                mdsName: '',
                inputName: '事件记录2数据',
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
                key: 'Key92F0F55DA6ADDBF1',
                isPartook: false,
                mdsName: '',
                inputName: 'tsh',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '0',
                  inputEnd: '100',
                  referencerBegin: '0',
                  referencerEnd: '100',
                  inputIsShow: true,
                  referencerIsShow: true,
                  timeType: '',
                  timeFormat: 'date'
                }
              },
              {
                key: 'Key3DA241E7F9301FAD',
                isPartook: false,
                mdsName: '',
                inputName: 'th',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '0',
                  inputEnd: '100',
                  referencerBegin: '0',
                  referencerEnd: '100',
                  inputIsShow: true,
                  referencerIsShow: true,
                  timeType: '',
                  timeFormat: 'date'
                }
              }
            ],
            entryList: [
              {
                key: 'KeyE909B9762E78CE16',
                isPartook: false,
                mdsName: '',
                inputName: '事件记录2名称',
                inputTypeEnum: 'TEXT_INPUT_BOX',
                isRequire: true,
                remark: '',
                switchTime: true,
                timeFormat: 'daterange',
                isBan: false,
                value: '',
                inputText: {
                  context: '',
                  timeType: '',
                  timeFormat: 'daterange'
                },
                isClass: false,
                error: ''
              },
              {
                key: 'Key0A07024DBD0D65D8',
                isPartook: false,
                mdsName: '',
                inputName: '事件记录2时间',
                inputTypeEnum: 'DATE',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: 'daterange',
                isBan: false,
                value: '',
                isClass: false,
                error: ''
              },
              {
                key: 'Key229D344009F1D117',
                isPartook: false,
                mdsName: '',
                inputName: '事件记录2数据',
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
                },
                isClass: false,
                error: ''
              }
            ]
          },
          {
            id: 5,
            title: '变化趋势',
            remarks: null,
            isMenu: false,
            isCreate: true,
            isEntryMenu: false,
            entryValue: '',
            selectedEntryList: [
              {
                key: 'Key92F0F55DA6ADDBF1',
                isPartook: false,
                mdsName: '',
                inputName: 'tsh',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '0',
                  inputEnd: '100',
                  referencerBegin: '0',
                  referencerEnd: '100',
                  inputIsShow: true,
                  referencerIsShow: true,
                  timeType: '',
                  timeFormat: 'date'
                }
              },
              {
                key: 'Key3DA241E7F9301FAD',
                isPartook: false,
                mdsName: '',
                inputName: 'th',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '0',
                  inputEnd: '100',
                  referencerBegin: '0',
                  referencerEnd: '100',
                  inputIsShow: true,
                  referencerIsShow: true,
                  timeType: '',
                  timeFormat: 'date'
                }
              }
            ],
            items: [
              {
                key: 'Key5D8059434DA1C144',
                isPartook: false,
                mdsName: '',
                inputName: '多于的',
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
              },
              {
                key: 'Key77343892762E6B62',
                isPartook: true,
                mdsName: '判断条件',
                inputName: '正常票',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: false,
                timeFormat: '',
                isBan: true,
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
                key: 'Key447D2F2844E9A132',
                isPartook: false,
                mdsName: '',
                inputName: '输血史',
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
              },
              {
                key: 'Key92F0F55DA6ADDBF1',
                isPartook: false,
                mdsName: '',
                inputName: 'tsh',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '0',
                  inputEnd: '100',
                  referencerBegin: '0',
                  referencerEnd: '100',
                  inputIsShow: true,
                  referencerIsShow: true,
                  timeType: '',
                  timeFormat: 'date'
                }
              },
              {
                key: 'Key3DA241E7F9301FAD',
                isPartook: false,
                mdsName: '',
                inputName: 'th',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '0',
                  inputEnd: '100',
                  referencerBegin: '0',
                  referencerEnd: '100',
                  inputIsShow: true,
                  referencerIsShow: true,
                  timeType: '',
                  timeFormat: 'date'
                }
              }
            ],
            entryList: [
              {
                key: 'Key92F0F55DA6ADDBF1',
                isPartook: false,
                mdsName: '',
                inputName: 'tsh',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '0',
                  inputEnd: '100',
                  referencerBegin: '0',
                  referencerEnd: '100',
                  inputIsShow: true,
                  referencerIsShow: true,
                  timeType: '',
                  timeFormat: 'date'
                },
                isClass: false,
                error: ''
              },
              {
                key: 'Key3DA241E7F9301FAD',
                isPartook: false,
                mdsName: '',
                inputName: 'th',
                inputTypeEnum: 'NUMBER_INPUT_BOX',
                isRequire: false,
                remark: '',
                switchTime: true,
                timeFormat: 'date',
                isBan: false,
                value: '',
                inputNumber: {
                  inputBegin: '0',
                  inputEnd: '100',
                  referencerBegin: '0',
                  referencerEnd: '100',
                  inputIsShow: true,
                  referencerIsShow: true,
                  timeType: '',
                  timeFormat: 'date'
                },
                isClass: false,
                error: ''
              }
            ]
          }
        ]
      },
      createTime: '2022-12-12T17:08:39.191631',
      updateTime: '2022-12-13T11:36:10.927821'
    }
    templateData.dataSource.data.forEach(e => {
      if (e.isCreate === false) {
        // 筛选不能新增的作为左下角的配置项
        this.allLData.push(e)
      } else if (e.isCreate === true) {
        // 筛选能新增的作为echart子标题选择项
        const len = e.selectedEntryList.length
        for (let i = 0; i < len; i++) {
          const DATE = e.selectedEntryList[i].inputTypeEnum === 'DATE'
          const NUMBER_INPUT_BOX = e.selectedEntryList[i].inputTypeEnum === 'NUMBER_INPUT_BOX'
          const date = e.selectedEntryList[i].timeFormat === 'date'
          const daterange = e.selectedEntryList[i].timeFormat === 'daterange'
          if (DATE && date) { // 筛选时间点
            this.chartSource.firstChart.items.push(e)
            break
          } else if (DATE && daterange) { // 筛选时间段
            this.chartSource.secondChart.items.push(e)
            break
          } else if (NUMBER_INPUT_BOX && date) { // 筛选时间点加数值
            this.chartSource.thirdChart.items.push(e)
            break
          }
        }
      }
    })
  },
  mounted () {
    this.firstChart = Echarts.init(document.getElementById('firstChart'))
    this.secondChart = Echarts.init(document.getElementById('secondChart'))
    this.initChart1st()
    this.initChart2nd()
  }
}
</script>

<style scoped>

</style>
