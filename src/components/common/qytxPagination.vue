<!--
 * @Description:
 * @Author: tanqifeng
 * @Date: 2019-07-15 10:33:40
 * @LastEditors: tanqifeng
 * @LastEditTime: 2019-08-23 15:44:37
 -->
<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <!-- <el-button size="mini" :disabled="currentPage==1" @click="Oneclick">首页</el-button> -->
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- <el-button size="mini" :disabled="currentPage==Math.ceil(total / limit)" @click="oldclick">尾页</el-button> -->
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'Pagination',
  props: {
    total: {
      required: true,
      type: Number
    },
    // eslint-disable-next-line vue/require-default-prop
    firstPage: {
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return [4, 8, 12, 24]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: false
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.currentPage = 1
      this.$emit('pagination', { page: 1, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    Oneclick() {
      this.currentPage = 1
      this.handleCurrentChange(1)
    },
    oldclick() {
      this.currentPage = Math.ceil(this.total / this.limit)
      this.handleCurrentChange(Math.ceil(this.total / this.limit))
    }
  }
}
</script>

<style lang="less">
.pagination-container {
  display: flex;
  white-space: nowrap;
  align-items: center;
  justify-content: center;
  .el-pager li {
    border-radius: 5px;
    margin: 0 5px;
    vertical-align: middle;
    height: 22px;
    width: 24px;
    line-height: 22px;
    color: #aaaaaa;
    min-width: 24px !important;
    background: #f5f7f8;
  }
  .el-pager li.active {
    color: #fff;
    background: #09affb;
    border: none;
  }

  .el-pagination {
    display: flex;
    align-items: center;
    span:not([class*="suffix"]),
    button {
      height: 22px;
      padding: 0 6px;
      margin-bottom: 0;
      span {
        height: 100%;
        line-height: 32px !important;
      }
    }
    .el-pagination__sizes {
      margin-right: 0;
      line-height: 0;
      padding-right: 0 !important;
    }
    .el-pagination__total {
      line-height: 22px !important;
    }
    .el-pagination__jump {
      line-height: 22px;
      margin-left: 10px;
      .el-pagination__editor.el-input {
        .el-input__inner {
          height: 22px;
          background: #f5f7f8;
          border: none;
        }
      }
    }
  }
  .btn-prev {
    border-radius: 5px;
    background: #f5f7f8 !important;
  }
  .btn-next {
    border-radius: 5px;
    background: #f5f7f8 !important;
  }
  .el-button {
    margin-top: 2px;
    padding: 0 15px;
    height: 24px;
    line-height: 24px;
  }
  .el-select {
    width: 100px;
    height: 22px;
    line-height: 22px;
    .el-input,
    .el-input__inner {
      margin: 0;
      width: 100%;
      height: 100%;
    }
  }
}
.pagination-container.hidden {
  display: none;
}
</style>
