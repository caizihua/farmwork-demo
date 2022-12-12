<template>
  <div class="d-flex align-center justify-end pt-3">
    <!-- 共计 -->
    <div class="el-pagination__total">共计 {{total}} 条</div>
    <el-pagination
      id="pageSizeNumber"
      v-if="showPageSize"
      class="skeleton-pagination"
      small
      background
      layout="sizes"
      :page-size="max"
      :page-sizes="pageSizeList || [10, 20, 50, 100]"
      @size-change="handleSizeChange"
    ></el-pagination>
    <!-- 第一页 -->
    <el-button
      id="firstPage"
      class="first-prev"
      :disabled="page === 1"
      @click="handleFistPrev"
    >
      <v-icon size="16">mdi-page-first</v-icon>
    </el-button>
    <!-- 上一页 页码 下一页 -->
    <el-pagination
      ref="prePageAndNextPage"
      id="prePageAndNextPage"
      class="skeleton-pagination"
      small
      background
      layout="prev, pager, next"
      :total="total"
      :current-page.sync="page"
      :page-size="max"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <!-- 最后一页 -->
    <el-button
      id="lastPage"
      class="last-next"
      :disabled="page === pages"
      @click="handleLastPage"
    >
      <v-icon size="16">mdi-page-last</v-icon>
    </el-button>
    <!-- 跳页 -->
    <el-pagination
      :class="who"
      id="jumpPage"
      class="skeleton-pagination"
      small
      background
      layout="slot"
      @current-change="handleCurrentChange"
    >
      <span class="el-pagination__jump">
        前往
        <div class="el-input el-pagination__editor is-in-pagination">
          <!---->
          <input type="number" autocomplete="off" min="1" class="el-input__inner" value="1" @change="handleGoToPage" @keydown.enter="handleGoToPage">
          <!----><!----><!----><!---->
        </div>
        页
      </span>
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'skeleton-pagination',
  props: {
    // * 必填 当前页 [数字]
    currentPage: { type: Number, default: 1, require: true },
    // * 必填 总共有多少条数据 [数字]
    total: { type: Number, default: 1000, require: true },
    // * 必填 总共页数 [数字]
    pages: { type: Number, default: 0, require: true },
    // * 如果 showPageSize 为 true，则为 必填 每页最大值列表: 10 [数字]
    max: {
      type: Number,
      default: 10
    },

    // 可选 [字符串]
    who: { type: String, default: 'who' },
    // 可选 每页最大值列表: [10, 20, 50, 100]
    pageSizeList: Array,
    // 可选 是否显示 pageSize
    showPageSize: { type: Boolean, default: true }
  },
  data () {
    return {
      pagination: {
        page: 1,
        max: 10
      },
      page: 1,
      pageOperate: ''
    }
  },
  watch: {
    currentPage (val) {
      this.page = val
    },
    pages (val) {
      if (!val) this.page = 1
      else this.page = this.currentPage
    }
  },
  methods: {
    // 跳页
    handleGoToPage (val) {
      let currentPage = val.target.value ? parseInt(val.target.value) : 1
      if (currentPage < 1) {
        currentPage = 1
        val.target.value = 1
      }
      const { pages } = this
      if (currentPage >= pages) {
        this.pagination.page = pages
        val.target.value = pages
      } else {
        this.pagination.page = currentPage
        val.target.value = currentPage
      }
      this.pageOperate = 'jump-page'

      this.handleEmitConfig()
    },
    // 向上提交参数
    handleEmitConfig () {
      this.$emit('paginationInfo', {
        ...this.pagination,
        who: this.who,
        order: this.pageOperate
      })
    },

    // 页码变化时
    handleCurrentChange (currentPage) {
      const { pages } = this
      this.pagination.page = currentPage >= pages ? pages : currentPage
      this.pageOperate = 'page-change'

      this.handleEmitConfig()
    },
    // 最大页改变时
    handleSizeChange (max) {
      this.pagination.page = 1
      this.pagination.max = max
      this.pageOperate = 'max-change'

      this.handleEmitConfig()
    },

    // 前往第一页
    handleFistPrev () {
      this.pagination.page = 1
      this.pageOperate = 'to-first'

      this.handleEmitConfig()
    },
    // 前往最后一页
    handleLastPage () {
      this.pagination.page = this.pages
      this.pageOperate = 'to-last'

      this.handleEmitConfig()
    }
  }
}
</script>

<style>
.first-prev, .last-next {
  min-width: 22px;
  height: 22px;
  padding: 0 !important;
}
.skeleton-pagination .el-pager {
  padding-left: 0 !important;
}
/*  */
.skeleton-pagination .el-input__inner {
  height: 24px !important;
  line-height: 24px !important;
}
/* 分页 选中样式 */
.skeleton-pagination .el-pager .active {
  color: #0B41CD !important;
}
/* 分页 页码样式 */
.first-prev, .last-next,
.skeleton-pagination .btn-prev,
.skeleton-pagination .btn-next,
.skeleton-pagination .el-pager .number,
.skeleton-pagination .el-pager .el-icon-more {
  background-color: #FFFFFF !important;
  border: 1px solid #999999 !important;
  border-radius: 3px !important;
  font-size: 12px !important;
  font-weight: 500 !important;
}
/* 分页 跳页样式 */
.skeleton-pagination .el-pagination__jump {
  font-size: 0.625rem !important;
  color: #333 !important;
  margin-left: 14px;
}
.skeleton-pagination .el-pagination__editor {
  font-size: 0.625rem;
}

</style>
