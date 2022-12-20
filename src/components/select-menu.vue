<template>
  <div class="d-flex align-center mb-3">
    <span class="mr-2" style="width:3px; height:25px; background-color: #5D7CC5;"></span>
    <div>
      <v-menu offset-x v-model="isMenu">
        <template v-slot:activator="{ on, attrs }">
          <div class="pr-2" v-bind="attrs" v-on="on">{{title}}</div>
        </template>
        <v-card class="d-flex flex-column" elevation="0">
          <v-menu offset-x
                  v-model="isEntryMenu"
                  :close-on-content-click="false">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" color="primary" text @click="addEntry()">选择子标题</v-btn>
            </template>
            <v-card class="d-flex flex-column pa-2" style="max-width:210px">
              <v-text-field
                prepend-inner-icon="mdi-magnify"
                clearable
                outlined
                dense
                hide-details
                placeholder="请输入名称"
                v-model="searchValue"
                @input="handleSearch()"
                @click:prepend-inner="handleSearch()"
                @click:clear="clearSearch()"
              />
              <div style="max-height:180px; max-width: 250px; overflow-y:auto;">
                <div v-for="item in unSelectedItems" :key="item.title">
                  <v-checkbox
                    dense
                    hide-details
                    v-model="selectedItems"
                    :value="item"
                  >
                    <template v-slot:label>
                      <div class="generate-name">{{item.title}}</div>
                    </template>
                  </v-checkbox>
                </div>
              </div>
              <div class="d-flex justify-end">
                <v-btn color="primary" small text @click="complete()">完成</v-btn>
              </div>
            </v-card>
          </v-menu>
          <v-btn color="primary" text @click="clearEntry('firstChart')">清空子标题</v-btn>
        </v-card>
      </v-menu>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'chart', 'selectedList', 'unSelectedList'],
  data: () => ({
    isMenu: false,
    isEntryMenu: false,
    searchValue: '',
    selectedItems: [],
    unSelectedItems: []
  }),
  watch: {
    isMenu (val) {
      if (!val) {
        this.searchValue = ''
        this.selectedItems = []
        this.unSelectedItems = this.unSelectedList
      }
    },
    isEntryMenu (val) {
      if (!val) {
        this.searchValue = ''
        this.selectedItems = []
        this.unSelectedItems = this.unSelectedList
      }
    }
  },
  methods: {
    // 搜索内容
    handleSearch () {
      this.searchValue = this.searchValue.trim()
      if (this.searchValue === '') {
        this.unSelectedItems = this.unSelectedList
      }
      this.unSelectedItems = []
      this.unSelectedList.forEach(e => {
        if (e.title.includes(this.searchValue)) {
          this.unSelectedItems.push(e)
        }
      })
    },
    clearSearch () {
      this.searchValue = []
      this.unSelectedItems = this.unSelectedList
    },
    // 添加输入项
    addEntry () {
    },
    // 点击完成按钮
    complete () {
      let selectedList = this.selectedList
      let unSelectedList = this.unSelectedList
      selectedList = selectedList.concat(this.selectedItems.filter(v => !selectedList.includes(v)))
      unSelectedList = unSelectedList.concat(this.selectedItems).filter(v => unSelectedList.includes(v) && !this.selectedItems.includes(v))
      this.$emit('getReturnItems', this.chart, {
        selectedList,
        unSelectedList
      })
      this.isMenu = false
      this.isEntryMenu = false
    },
    // 清空输入项
    clearEntry () {
      this.$emit('clearSelectMenu', this.chart)
    }
  },
  created () {
    this.unSelectedItems = this.unSelectedList
  }
}
</script>
