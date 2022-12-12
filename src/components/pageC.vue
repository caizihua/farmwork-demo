<template>
  <div>
    <v-card elevation="0" class="px-5 py-2" :style="{height:`${wrapHeight}px`}">
      <!--搜索栏-->
      <div class="d-flex align-center pb-5">
        <div
          class="py-0 pr-2"
          v-for="item in inputObj"
          :key="item.value"
        >
          <v-hover>
            <v-tooltip top nudge-left="5">
              <template v-slot:activator="{ on, attrs }">
                <div v-on="on" v-bind="attrs">
                  <div class="mr-2">
                    <v-text-field
                      :label="item.label"
                      v-model="dataInput[item.value]"
                      outlined
                      dense
                      hide-details
                      @keydown.enter="dataSearch"
                    ></v-text-field>
                  </div>
                </div>
              </template>
              <span> {{ dataInput[item.value] ? dataInput[item.value] : item.label }}</span>
            </v-tooltip>
          </v-hover>
        </div>
        <div
          id="dashSearchInpDown"
          class="pa-0 pr-2"
        >
          <v-hover>
            <v-tooltip top nudge-left="5">
              <template v-slot:activator="{ on, attrs }">
                <div v-on="on" v-bind="attrs">
                  <div class="mr-2">
                    <v-menu
                      ref="menu"
                      v-model="dateOpen"
                      :close-on-content-click="false"
                      :return-value.sync="dateOpen"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="dataInput.birthday"
                          label="出生日期"
                          hide-details
                          dense
                          outlined
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        >
                          <template v-slot:prepend-inner>
                            <v-icon style="font-size: 19px; margin-top: 3px">
                              mdi-calendar
                            </v-icon>
                          </template>
                        </v-text-field>
                      </template>
                      <v-date-picker
                        :day-format="(date) => date.split('-')[2]"
                        @input="dateOpen = false"
                        locale="zh-cn"
                        v-model="dataInput.birthday"
                        no-title
                        scrollable
                      >
                      </v-date-picker>
                    </v-menu>
                  </div>
                </div>
              </template>
              <span> {{ dataInput.birthday ? dataInput.birthday : '出生日期' }}</span>
            </v-tooltip>
          </v-hover>
        </div>
        <div class="d-flex">
          <div class="d-flex pa-0 align-center">
            <v-btn id="dashSearchBtn" color="primary" width="70" class="mr-1" @click="dataSearch">
              搜索
            </v-btn>
            <v-btn
              id="dashReload"
              :loading="reLoading"
              :disabled="reLoading"
              outlined
              color="primary"
              width="70"
              class="mx-1"
              @click="reloadInp"
            >
              重置
            </v-btn>
          </div>
        </div>
      </div>
      <!--图表-->
      <div style="overflow: auto">
        <el-table
          :data="table.data"
          stripe
          :height="wrapHeight-150"
          empty-text="暂无数据"
          style="width: 100%">
          <el-table-column width="45"></el-table-column>
          <el-table-column
            v-for="item in table.tableHeader"
            :key="item.patientId"
            :prop="item.prop"
            :label="item.label"
          >
          </el-table-column>
          <el-table-column
            width="450"
            prop="operate"
            align="center"
            label="操作"
          >
            <template  slot-scope="scope">
              <v-btn
                text
                depressed
                small
                color="primary"
                @click="toEleRecord"
              >
                电子档案
              </v-btn>
              <v-btn
                text
                depressed
                small
                color="primary"
                @click="toDiseaseManagement"
              >
                病程管理
              </v-btn>
              <v-btn
                text
                depressed
                small
                color="primary"
                @click="createNewRecord"
              >
                新增记录
              </v-btn>
              <v-btn
                text
                depressed
                small
                color="error"
                @click="deleteRow(scope.row)"
              >
                删除
              </v-btn>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页-->
      <skeleton-pagination
        class="mt-5"
        :current-page="pagination.page"
        :total="pagination.total"
        :pages="pagination.pages"
        :max="pagination.max"
      ></skeleton-pagination>
    </v-card>
    <custom-dialog ref="dialog">
      <template slot="content">
        <v-row class="d-flex justify-center align-center">
          <div class="d-flex justify-end">
            <v-icon style="font-size: 65px;text-align: center;padding:0;margin:0" color="warning">
              mdi-alert-circle
            </v-icon>
          </div>
          <div class="d-flex flex-column">
            <span class="text-h5 mb-2"> 是否删除改患者及所有数据？ </span>
            <span class="text-body-2" style="color:#F44336"> 删除后，将无法恢复！ </span>
          </div>
        </v-row>
      </template>
    </custom-dialog>
  </div>
</template>

<script>
import SkeletonPagination from './skeleton-pagination'
import CustomDialog from './custom-dialog'

export default {
  components: { SkeletonPagination, CustomDialog },
  data () {
    return {
      tableData: [],
      pagination: {
        page: 1, // 当前页数
        pages: 0, // 总共页数
        total: 0, // 全部数据
        max: 0
      },
      dateOpen: false,
      resData: [],
      reLoading: false,
      loader: null,
      inputObj: [
        {
          label: '姓名',
          value: 'name'
        }, {
          label: '患者编号',
          value: 'patientId'
        }, {
          label: '性别',
          value: 'gender'
        }, {
          label: '最近诊断',
          value: 'recentDia'
        }
      ],
      dataInput: {
        name: null,
        patientId: null,
        gender: null,
        recentDia: null,
        birthday: null
      }
    }
  },
  props: ['wrapWidth', 'wrapHeight'],
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]
      setTimeout(() => (this[l] = false), 1000)
      this.loader = null
    }
  },
  computed: {
    table () {
      return {
        tableHeader: [
          { prop: 'name', label: '姓名' },
          { prop: 'patientId', label: '患者编号' },
          { prop: 'recentDia', label: '最近诊断' },
          { prop: 'gender', label: '性别' },
          { prop: 'birthday', label: '出生日期' }
        ],
        data: this.resData
      }
    }
  },
  methods: {
    // 搜索
    dataSearch () {
    },
    // 重置
    reloadInp () {
      this.loader = 'reLoading'
      this.dataInput = {
        name: null,
        patientId: null,
        gender: null,
        recentDia: null
      }
      this.pagination = {
        page: 1,
        pages: 0,
        total: 0,
        max: 0
      }
    },
    // 跳转电子档案
    toEleRecord () {
    },
    // 跳转病程管理
    toDiseaseManagement () {
    },
    // 跳转新增记录
    createNewRecord () {
    },
    // 删除
    deleteRow (row) {
      this.$refs.dialog.showDialog({
        title: ' ',
        width: 500,
        confirm: true,
        cancel: true,
        onConfirm: async next => {
          next()
        },
        onCancel: next => {
          next()
        }
      })
    }
  },
  created () {
    this.resData = [
      {
        name: '张三',
        gender: '女',
        patientId: '001',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '002',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '003',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '002',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '003',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '002',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '003',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '002',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '003',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '002',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '003',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '002',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '003',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '002',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '003',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '002',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '003',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '002',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '003',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '002',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '003',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '002',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '003',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '002',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '003',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '002',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '003',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '002',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }, {
        name: '张三',
        gender: '女',
        patientId: '003',
        birthday: '2022-10-10',
        recentDia: '肺炎'
      }
    ]
  }
}
</script>
