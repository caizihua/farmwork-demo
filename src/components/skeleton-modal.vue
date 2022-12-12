<template>
    <div>
      <v-dialog
        v-model="open"
        :width="config.width"
        :max-width="config.maxWidth"
        :persistent="persistent"
        :attach="config.isAttach"
      >
        <v-card>
          <!-- 模态框 Header -->
          <v-card-title class="px-4 d-flex" style="font-size: 1rem">
            <v-hover v-slot:default="{hover}">
              <div style="width: 90%">
                <v-tooltip
                  top
                  :disabled="hover && !handleIsNeedTooltip(config.title, num, `skeleton-modal`)">
                  <template v-slot:activator="{on, attrs}">
                    <div
                      v-on="on"
                      v-bind="attrs"
                      :id="`skeleton-modal-${num}`"
                      class="ellipsisText"
                    >
                      <span :class="`skeleton-modal-span-${num}`">
                        {{ config.title }}
                      </span>
                    </div>
                  </template>
                  <span>{{ config.title }}</span>
                </v-tooltip>
              </div>
            </v-hover>
            <v-spacer />
            <v-icon id="TitleCancelModal" color="#7f7f7f" @click="handleCancelClick">mdi-close</v-icon>
          </v-card-title>
          <!-- 模态框 Content -->
          <v-card-text
            class="pt-1"
            :class="{'pb-0': showFooter, 'pa-0': isPadding}"
            :style="{minHeight: config.height + 'px'}"
          >
            <slot />
          </v-card-text>
          <!-- 模态框 Footer -->
          <v-card-actions class="py-6" v-if="showFooter">
            <slot name="footer" />
            <v-spacer />
            <!-- 取消 -->
            <v-btn
              id="footerCancelModal"
              depressed
              outlined
              color="primary"
              class="mr-6"
              @click="handleCancelClick"
            >取消</v-btn>
            <!-- 确认 -->
            <v-btn
              id="footerOkModal"
              v-if="showOK"
              depressed color="primary"
              @click="handleConfirmClick"
            >确认</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
</template>

<script>
const isNeedTooltip = ({ text = '', id = null, suffix = '' }) => {
  if (!text || !id) {
    console.warn('缺少ID')
    return false
  }
  if (!suffix) {
    console.warn('缺少前缀')
    return false
  }

  const parentDOM = document.getElementById(`${suffix}-${id}`)
  if (!parentDOM) {
    console.warn('parentDOM 不存在')
    return false
  }
  const childDOM = document.getElementsByClassName(`${suffix}-span-${id}`)
  if (!childDOM.length) {
    console.warn('childDOM 不存在')
    return false
  }

  const { offsetWidth: parentWidth } = parentDOM
  const { offsetWidth: childWidth } = childDOM[0]
  return childWidth > parentWidth
}

export default {
  name: 'skeleton-modal',
  props: {
    showFooter: {
      type: Boolean,
      default: true
    },
    // 禁止点击外部关闭
    persistent: {
      type: Boolean,
      default: true
    },
    // 是否显示确认按钮
    showOK: {
      type: Boolean,
      default: true
    },
    // 是否去除边距
    isPadding: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      open: false,
      config: {
        width: 600,
        maxWidth: 1000,
        title: 'Base Modal Title',
        height: 150,
        cancelText: 'message.cancel', // 取消文本（当前项目需要的是双语参数）
        okText: 'message.confirm', // 确认文本（当前项目需要的是双语参数）
        isAttach: false, // 是否脱离当前节点,为true指向V-app
        onCancel: () => {
          // onCancel
        },
        onOk: () => {
          // onOK
        }
      },
      num: 0
    }
  },
  watch: {
    open (val) {
      if (!val) {
        const { onCancel } = this.config
        if (onCancel) onCancel()
        this.initConfig()
      }
    }
  },
  methods: {
    // 初始化模态框参数
    initConfig () {
      this.config = {
        width: 600,
        maxWidth: 1000,
        title: '',
        height: 150,
        isAttach: '',
        cancelText: 'message.cancel',
        okText: 'message.confirm',
        onCancel: () => {
          // onCancel
        },
        onOk: () => {
          // onOK
        }
      }
    },

    /**
     * 打开模态框
     * @param config
                     width: 600,
                     maxWidth: 1000,
                     title: 'Base Modal Title',
                     height: 150,
                     cancelText: 'message.cancel', // 取消文本（当前项目需要的是双语参数）
                     okText: 'message.confirm', // 确认文本（当前项目需要的是双语参数）
                     onCancel: () => {},
                     onOk: () => {}
     */
    showModal (config) {
      this.num = parseInt(Math.random() * 10000)
      this.config = { ...this.config, ...config }
      this.open = true
    },
    // 点击 确认按钮 时执行
    handleConfirmClick () {
      const { onOk } = this.config
      if (onOk) onOk()
    },
    // 点击 取消按钮 时执行
    handleCancelClick () {
      // 将 open 参数设置为 false ,然后模态框里的 open 监听去执行绑定的 onCancel()
      this.open = false
    },
    handleIsNeedTooltip (text, id, suffix) {
      return isNeedTooltip({ text, id, suffix })
    }
  }
}
</script>

<style scoped>
>>>.v-dialog:not(.v-dialog--fullscreen) {
    max-height: 100%;
}
</style>
