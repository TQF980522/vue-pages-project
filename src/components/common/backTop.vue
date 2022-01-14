<template>
  <div v-show="isShow" ref="backToTop" class="backToTop" @click="backTop">
    <svg-icon icon-class="backtop-icon" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'BackToTop',
  data() {
    return {
      isShow: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapMutations('app', ['UPDATE_TOPBAR_BLOCK']),
    // 回到顶部方法
    backTop() {
      // 获取文档高度
      const html = document.documentElement
      const timer = setInterval(() => {
        // 设置回滚速度
        const ispeed = Math.floor(html.offsetHeight / 5)
        // 设置滚动条高度
        html.scrollTop = document.body.scrollTop = html.scrollTop - ispeed
        // 清除计时器
        if (html.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
      this.UPDATE_TOPBAR_BLOCK(true)
    },

    // 向下滚动显示图标
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      if (scrollTop > 100) {
        this.isShow = true
      } else {
        this.isShow = false
      }
    }
  }
}
</script>

<style lang="less">
.backToTop {
  animation-duration: 3s;
  animation-name: fade;
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.backToTop {
  position: fixed;
  bottom: 80px;
  right: 30px;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.02);
  // -webkit-box-shadow: 0 1px 5px 0 rgb(0 0 0 / 6%);
  // box-shadow: 0 1px 5px 0 rgb(0 0 0 / 6%);
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
  svg {
    display: block;
    height: 30px !important;
    width: 30px !important;
    margin: 8px auto;
    font-weight: 700;
    line-height: 50px;
    text-align: center;
  }
}
</style>
