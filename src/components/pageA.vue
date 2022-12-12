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
        <!--添加子标题-->
        <div v-if="!isCreated">
          <div class="d-flex align-center" style="background-color: #D5DDF0">
            <span class="mr-2" style="width:3px; height:25px; background-color: #5D7CC5;"></span>
            <div>
              <div class="pr-2" style="cursor: pointer" @click="createLTitle">添加子标题</div>
            </div>
          </div>
        </div>
        <!--自定义展示信息-->
        <div v-else>
          <div class="d-flex align-center" style="background-color: #D5DDF0">
            <span class="mr-2" style="width:3px; height:25px; background-color: #5D7CC5;"></span>
            <div>
              <v-menu offset-x
                      v-model="LDObj.menuDialog">
                <template v-slot:activator="{ on, attrs }">
                  <div class="pr-2" v-bind="attrs" v-on="on"> {{oldTitle.title}}</div>
                </template>
                <v-card class="d-flex flex-column" elevation="0">
                  <v-btn color="primary" text @click="editLTitle(oldTitle)">编辑子标题</v-btn>
                  <v-btn color="primary" text @click="deleteLEntry">删除子标题</v-btn>
                  <v-menu offset-x
                          v-model="LDObj.entryDialog"
                          :close-on-content-click="false">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs" v-on="on" color="primary" text @click="addEntry('LDObj')">添加输入项</v-btn>
                    </template>
                    <v-card class="d-flex flex-column pa-2" style="max-width:210px">
                      <v-text-field
                        v-model="LDObj.entryValue"
                        prepend-inner-icon="mdi-magnify"
                        clearable
                        outlined
                        dense
                        hide-details
                        placeholder="请输入名称"
                      />
                      <div style="max-height:180px; max-width: 250px; overflow-y:auto;">
                        <div v-for="item in LDObj.items" :key="item.key">
                          <v-checkbox
                            dense
                            hide-details
                            v-model="LDObj.selectedItems"
                            :value="item"
                          >
                            <template v-slot:label>
                              <div class="generate-name">{{item.inputName}}</div>
                            </template>
                          </v-checkbox>
                        </div>
                      </div>
                      <div class="d-flex justify-end">
                        <v-btn color="primary" small text @click="complete('LDObj')">完成</v-btn>
                      </div>
                    </v-card>
                  </v-menu>
                  <v-btn color="primary" text @click="clearLEntry('LDObj')">清空输入项</v-btn>
                </v-card>
              </v-menu>
            </div>
          </div>
          <div class="pl-3">
            <div class="pt-2" v-for="item in LDObj.selectedItems" :key="item.key">{{item.inputName}}：</div>
          </div>
        </div>
      </div>
      <!--右边echart相关-->
      <div class="ma-3" :style="{width:`${wrapWidth-250}px`}">
        <div class="d-flex align-center mb-3">
          <span class="mr-2" style="width:3px; height:25px; background-color: #5D7CC5;"></span>
          <div>
            <v-menu offset-x>
              <template v-slot:activator="{ on, attrs }">
                <div class="pr-2" v-bind="attrs" v-on="on">{{firstObj.title}}</div>
              </template>
              <v-card class="d-flex flex-column" elevation="0">
                <v-menu offset-x
                        :close-on-content-click="false">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" color="primary" text @click="addEntry('firstObj')">添加输入项</v-btn>
                  </template>
                  <v-card class="d-flex flex-column pa-2" style="max-width:210px">
                    <v-text-field
                      v-model="firstObj.entryValue"
                      prepend-inner-icon="mdi-magnify"
                      clearable
                      outlined
                      dense
                      hide-details
                      placeholder="请输入名称"
                    />
                    <div style="max-height:180px; max-width: 250px; overflow-y:auto;">
                      <div v-for="item in firstObj.items" :key="item.key">
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
                      <v-btn color="primary" small text @click="complete('firstObj')">完成</v-btn>
                    </div>
                  </v-card>
                </v-menu>
                <v-btn color="primary" text @click="clearLEntry('firstObj')">清空输入项</v-btn>
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
      <el-form :model="titleForm" ref="titleForm" label-width="70px">
        <el-form-item label="名称" prop="title" :rules="[{ required: true, message: '请输入标题名称', trigger: 'blur' },
                { max: 10, message: '请输入1~10个字符', trigger:['change', 'blur'] }]">
          <el-input v-model="titleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remarks"
                      :rules="[{ max: 20, message: '请输入1~20个字符', trigger:['change', 'blur'] }]">
          <el-input v-model="titleForm.remarks"></el-input>
        </el-form-item>
      </el-form>
    </skeleton-modal>
  </div>
</template>

<script>
import * as Echarts from 'echarts'
import skeletonModal from './skeleton-modal'

export default {
  data: () => ({
    perData: ['姓名', '患者编号', '性别', '出生日期', '最近诊断'],
    titleForm: {
      title: '',
      remarks: ''
    },
    oldTitle: {
      title: '',
      remarks: ''
    },
    isCreated: false, // 是否添加了子标题
    chartHeight: { // echart高度
      chart1st: 200,
      chart2nd: 200,
      chart3rd: 270
    },
    LDObj: { // 个人信息下方子标题的Data
      menuDialog: false,
      entryDialog: false,
      entryValue: null,
      items: [],
      selectedItems: []
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
    thirdChart: null
  }),
  components: { skeletonModal },
  props: ['wrapWidth', 'wrapHeight'],
  methods: {
    createLTitle () {
      this.$refs.titleDialog.showModal({
        title: '新增标题',
        height: 0,
        onOk: () => {
          this.$refs.titleForm.validate(valid => {
            if (valid) {
              this.oldTitle.title = this.titleForm.title
              this.oldTitle.remarks = this.titleForm.remarks
              this.$refs.titleDialog.open = false
            }
          })
          this.isCreated = true
          this.LDObj.menuDialog = false
        },
        onCancel: () => {
          this.titleForm.title = ''
          this.titleForm.remarks = ''
          this.$refs.titleForm.clearValidate()
        }
      })
    },
    editLTitle (item) {
      this.titleForm = this.oldTitle
      this.$refs.titleDialog.showModal({
        title: '编辑标题',
        height: 0,
        onOk: () => {
          this.$refs.titleForm.validate(valid => {
            if (valid) {
              item.title = this.titleForm.title
              item.remarks = this.titleForm.remarks
              this.$refs.titleDialog.open = false
            }
          })
        },
        onCancel: () => {
          this.titleForm.title = item.title
          this.titleForm.remarks = item.remarks
          this.$refs.titleForm.clearValidate()
        }
      })
    },
    deleteLEntry () {
      this.titleForm = {
        title: '',
        remarks: ''
      }
      this.oldTitle = {
        title: '',
        remarks: ''
      }
      this.isCreated = false
    },
    addEntry (value) {
      this[value].entryDialog = true
    },
    complete (value) {
      this[value].entryDialog = false
      this[value].menuDialog = false
    },
    clearLEntry (value) {
      this[value].selectedItems = []
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
          }
        },
        grid: {
          top: '5%',
          left: '2%',
          right: '2%',
          bottom: '5%',
          containLabel: true
        },
        visualMap: [{
          type: 'piecewise',
          categories: [0, 1, 2, 3],
          show: false
        }],
        series: [{
          symbolSize: 10,
          data: [
            ['2022-12-02', 'b'],
            ['2022-12-03', 'b'],
            ['2022-12-04', 'c'],
            ['2022-12-05', 'c'],
            ['2022-12-06', 'c'],
            ['2022-12-07', 'b'],
            ['2022-12-08', 'b'],
            ['2022-12-09', 'b'],
            ['2022-12-10', 'b']
          ],
          type: 'scatter'
        }]
      }
      this.firstChart.setOption(option)
    }
  },
  created () {
    this.LDObj.items = [
      { inputName: '外伤史', key: 0 },
      { inputName: '过敏史', key: 1 },
      { inputName: '手术史', key: 2 },
      { inputName: '输血史', key: 3 }
    ]
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
  },
  mounted () {
    this.firstChart = Echarts.init(document.getElementById('firstChart'))
    this.initChart1st()
  }
}
</script>

<style scoped>

</style>
