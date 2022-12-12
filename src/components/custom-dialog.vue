/* creator: lc time: 2022/2/25 下午5:48 description: 弹窗组件封装 */
<template>
  <div>
    <v-dialog
      v-if="show"
      v-model="show"
      persistent
      :width="ops.width"
    >
      <v-card class="pb-4">
        <div class="px-4 py-3 d-flex justify-space-between align-center" style="width: 100%">
          <div class="pl-2" style="font-size:16px">{{ ops.title }}</div>
          <v-btn small fab text @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <v-card-text class="pb-0 my-3 d-flex justify-center align-center">
          <div class="text-body-1 font-weight-medium">
            {{ ops.text || '' }}
          </div>
          <slot name="content"></slot>
        </v-card-text>
        <v-card-actions class="d-flex justify-start flex-row-reverse">
          <v-btn
            class="mx-2"
            v-if="ops.confirm"
            color="primary"
            @click="confirm"
          >
            确定
          </v-btn>
          <v-btn
            class="mx-2"
            v-if="ops.cancel"
            color="primary"
            outlined
            @click="cancel"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      ops: {
        title: '', // 标题
        text: '', // 提示文本
        width: 400, // 宽度
        type: 'info', // 类型
        confirm: false, // 是否显示确认按钮
        cancel: false, // 是否显示取消按钮
        onConfirm: null, // 确认回调事件
        onCancel: null // 取消回调时间
      },
      show: false,
      colorMap: {
        info: '#2196F3',
        warning: '#FB8C00',
        error: '#FF5252',
        primary: '#1976D2',
        success: '#57B45B'
      }
    }
  },
  methods: {
    showDialog (ops) {
      this.show = true
      this.ops.width = ops.width || 400
      this.ops.title = ops.title || ''
      this.ops.text = ops.text || ''
      this.ops.type = ops.type || 'info'
      this.ops.confirm = ops.confirm || false
      this.ops.cancel = ops.cancel || false
      this.ops.onConfirm = ops.onConfirm
      this.ops.onCancel = ops.onCancel
    },
    closeDialog () {
      this.show = false
    },
    confirm () {
      this.ops.onConfirm
        ? this.ops.onConfirm(this.closeDialog)
        : this.closeDialog()
    },
    cancel () {
      this.ops.onCancel
        ? this.ops.onCancel(this.closeDialog)
        : this.closeDialog()
    }
  }
}
</script>
