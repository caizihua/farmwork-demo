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
    chartSource: {},
    leftData: [],
    myChart: null
  }),
  props: ['wrapWidth', 'wrapHeight'],
  methods: {
    initChart () {
      const option = {}
      this.myChart.setOption(option)
    },
    // 解读记录
    iptRecord () {},
    // 分析解读
    analyseIpt () {}
  },
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
      }
    ]
    this.chartSource = {
      leftObj: {
        id: 0,
        title: '左子标题1',
        items: [
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
        selectedList: [
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
        unSelectedList: []
      },
      firstChart: {
        id: 1,
        title: '事件记录',
        items: [
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
          }
        ],
        selectedList: [
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
          }
        ],
        unSelectedList: [
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
          }
        ],
        option: {
          yAxisData: [
            '时间点1',
            '时间点2',
            '时间点3',
            '时间点4'
          ],
          tooltip: [
            [
              '时间点1时间',
              '时间点1内容1',
              '时间点1内容2',
              '时间点1内容3'
            ],
            [
              '时间点2时间',
              '时间点2内容1',
              '时间点2内容2',
              '时间点2内容3'
            ],
            [
              '时间点3时间',
              '时间点3内容1',
              '时间点3内容2',
              '时间点3内容3'
            ],
            [
              '时间点3时间',
              '时间点3内容1',
              '时间点3内容2',
              '时间点3内容3'
            ]
          ]
        }
      },
      secondChart: {
        id: 2,
        title: '事件记录',
        items: [
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
          }
        ],
        selectedList: [
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
          }
        ],
        unSelectedList: [
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
          }
        ],
        option: {
          yAxisData: [
            '时间段1',
            '时间段2',
            '时间段3',
            '时间段4'
          ],
          tooltip: [
            [
              '时间段1时间',
              '时间段1内容1',
              '时间段1内容2',
              '时间段1内容3'
            ],
            [
              '时间段2时间',
              '时间段2内容1',
              '时间段2内容2',
              '时间段2内容3'
            ],
            [
              '时间段2时间',
              '时间段2内容1',
              '时间段2内容2',
              '时间段2内容3'
            ],
            [
              '时间段2时间',
              '时间段2内容1',
              '时间段2内容2',
              '时间段2内容3'
            ]
          ]
        }
      },
      thirdChart: {
        id: 3,
        title: '变化趋势',
        items: [
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
        ],
        selectedList: [
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
          }
        ],
        unSelectedList: [
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
        ],
        option: {
          yAxisData: [
            '折线图1',
            '折线图2',
            '折线图3'
          ]
        }
      }
    }
  },
  mounted () {
    this.myChart = Echarts.init(document.getElementById('echart'))
    this.initChart()
  }
}
</script>
