<template>
  <header class="topbar__wrapper">
    <div
      class="topbar"
      :class="['topbar--' + (isTopbarBlock ? 'show' : 'hidden')]"
    >
      <div class="topbar__main">
        <a href="index.html" class="logo">
          <img src="@/assets/images/logo.png" alt="" />
        </a>
        <ul class="navs">
          <li
            v-for="(item, i) in routersList"
            :key="item.id"
            :class="[currentRoute == item.link ? 'nuxt-link-active' : '']"
            tag="li"
            class="nav-item"
            @mouseover="show = i"
            @mouseout="show = -1"
            @click="navigationTo(item)"
          >
            {{ item.name }}
            <svg-icon
              v-show="item.childen"
              :class="[currentRoute == item.link ? 'active' : '']"
              icon-class="up-icon"
              class="icon"
            />
            <transition name="fade">
              <div v-show="show == i" class="dropdown">
                <div
                  v-for="child_item in item.childen"
                  :key="child_item.id"
                  class="nav-item-child"
                  @click.stop="navigationTo(child_item)"
                >
                  {{ child_item.name }}
                </div>
              </div>
            </transition>
          </li>
        </ul>
        <div class="login-regist-group" v-if="showLoginBtn">
          <a href="login.html" v-if="!user_info">
            立即登录
          </a>
          <div v-else class="user-info-warp">
            <span>{{ user_info.nickname }}-{{ user_info.mobile }}</span>
            <span class="loginout" @click="loginOut">退出</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 移动端 -->
    <div
      class="topbar_mini"
      :class="['topbar--' + (isTopbarBlock ? 'show' : 'hidden')]"
    >
      <div class="topbar_main-mini">
        <a href="index.html" class="logo">
          <img src="@/assets/images/logo.png" alt="" />
        </a>
        <div class="topbar-mini-right">
          <div class="user-group" v-if="showLoginBtn">
            <div v-if="user_info">{{ user_info.nickname }}</div>
            <a v-else href="login.html">
              立即登录
            </a>
          </div>
          <svg-icon
            class="menu-btn"
            @click="menu_visible = true"
            icon-class="menu-icon"
          />
        </div>
      </div>
    </div>
    <!-- 唤出菜单 -->
    <menu-drawer :drawer.sync="menu_visible"></menu-drawer>
  </header>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import SvgIcon from "./SvgIcon.vue";
import { getAccessToken } from "@/utils/auth";
export default {
  name: "TopBar",
  components: { SvgIcon },
  data() {
    return {
      routersList: [
        {
          name: "首页",
          link: "index.html",
        },
        {
          name: "内测分发",
          link: "packing.html",
        },
      ],
      keyword: "",
      scrollingElement: null,
      searchFormClass: "",
      noticeNum: 0,
      isShowNavMenu: false,
      show: -1,
      popverShow: false,
      currentRoute: "",
      menu_visible: false,
    };
  },

  watch: {
    "$route.path": {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.UPDATE_TOPBAR_BLOCK(true);
        }
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState("app", ["isTopbarBlock", "fingerprintId"]),
    ...mapState("game", ["gameList"]),
    ...mapState("user", ["user_info", "access_token"]),
    showLoginBtn() {
      const path = location.pathname.match(/(\w+)\.html/g);
      const noshowRoute = ["login.html"];
      if (path && noshowRoute.includes(path[0])) {
        return false;
      }
      return true;
    },
  },
  created() {
    if (!this.fingerprintId) {
      this.getFingerprintId();
    }
    const access_token = getAccessToken();
    if (!access_token || !this.$store.getters.access_token) {
      const loading = this.$loading({
        lock: true,
        text: "加载中",
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 1)",
      });
      this.AccessToken();
      loading.close();
    }
    const path = location.pathname.match(/(\w+)\.html/g);
    if (!path || !path.length) {
      this.$set(this, "currentRoute", "index.html");
      return;
    }
    this.UPDATE_CURRENT_ROUTER(path[0]);
    this.$set(this, "currentRoute", path[0]);
  },

  mounted() {
    const scrollingElement = document.scrollingElement;
    let scrollTop = 0;
    window.addEventListener("scroll", () => {
      if (scrollingElement.scrollTop < 80) {
        this.isTopbarBlock === false && this.UPDATE_TOPBAR_BLOCK(true);
        return;
      }
      if (scrollingElement.scrollTop > scrollTop) {
        this.UPDATE_TOPBAR_BLOCK(false);
      } else if (scrollingElement.scrollTop < scrollTop) {
        this.UPDATE_TOPBAR_BLOCK(true);
      }
      scrollTop = scrollingElement.scrollTop;
    });
  },

  methods: {
    ...mapActions("app", ["getFingerprintId"]),
    ...mapActions("user", ["AccessToken", "LoginOut"]),
    ...mapMutations("app", ["UPDATE_TOPBAR_BLOCK", "UPDATE_CURRENT_ROUTER"]),
    popoverTigger(event) {
      switch (event.type) {
        case "mouseenter":
          this.isShowNavMenu = true;
          break;
        case "mouseleave":
          this.isShowNavMenu = false;
          break;
      }
    },
    navigationTo(val) {
      this.$openRouter({
        name: val.link, // 跳转地址
        query: {
          type: val.type,
        },
      });
    },
    drawerClose() {
      this.menu_visible = false;
    },
    //退出登录
    loginOut() {
      this.$confirm("确认退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        showCancelButton: true,
        distinguishCancelAndClose: true,
      })
        .then(() => {
          this.LoginOut().then(() => {
            this.$openRouter({
              name: "index.html", // 跳转地址
            });
          });
        })
        .catch(() => {
        });
    },
  },
};
</script>

<style lang="less" scoped>
.topbar__wrapper {
  z-index: 1000;
  position: relative;
  height: 60px;
}
.topbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  box-shadow: 0 0 4px #eee;
  background: #fff;
  transition: all 0.2s;
  &.topbar--show {
    transform: translateY(0);
  }
  &.topbar--hidden {
    transform: translateY(-100%);
  }
}

//移动设备
@media only screen and (max-width: 390px) {
  .topbar {
    display: none !important;
  }
  .topbar_mini {
    max-width: 390px;
    display: block !important;
  }
}
@media screen and (min-width: 390px) and (max-width: 460px) {
  .topbar {
    display: none !important;
  }
  .topbar_mini {
    max-width: 460px;
    display: block !important;
  }
}
@media screen and (min-width: 460px) and (max-width: 520px) {
  .topbar {
    display: none !important;
  }
  .topbar_mini {
    max-width: 520px;
    display: block !important;
  }
}

.topbar__main {
  display: flex;
  align-items: center;
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  padding: 0 10px;
  .logo {
    height: 60px;
    margin-right: 20px;
    img {
      height: 100%;
    }
  }
}
.navs {
  display: flex;
  font-size: 18px;
  color: #333;
  flex: 1;
  .public-mark {
    border-top: 2px solid #aaa;
    border-bottom: 3px solid #d13b78;
    padding: 10px;
  }
  .nav-item {
    cursor: pointer;
    font-weight: 500;
    position: relative;
    width: 142px;
    text-align: center;
    height: 60px;
    line-height: 60px;
    &:hover,
    &.nuxt-link-active {
      color: #09affa;
    }
    .icon {
      width: 20px;
      height: 20px;
      color: #71777c;
      transition: transform 1s;
      position: absolute;
      top: 35%;
    }
    .icon.active {
      transform: rotate(180deg);
      color: #fff !important;
    }
    &:hover {
      .icon {
        transform: rotate(180deg);
        color: #fff !important;
      }
    }
    .public-txt {
      display: inline-block;
      width: 100%;
    }

    .dropdown {
      position: absolute;
      left: 0px;
      width: 142px;
      .nav-item-child {
        cursor: pointer;
        font-weight: 700;
        position: relative;
        font-size: 18px;
        background: #d13b78;
        color: #fff;
        text-align: center;
      }
      .nav-item-child:hover {
        color: #333 !important;
      }
    }
  }
}

.login-regist-group {
  height: 30px;
  color: #fff;
  border-radius: 15px;
  display: flex;
  line-height: 30px;
  align-items: center;
  text-align: center;
  overflow: hidden;
  a {
    width: 100px;
    color: #09affa;
  }
  .user-info-warp {
    span {
      color: #333;
    }
    .loginout {
      display: inline-block;
      margin-left: 10px;
      color: #09affa;
      cursor: pointer;
      &:hover {
        color: #b2b2b2;
      }
    }
  }
}
//设配移动设备
.topbar_mini {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  box-shadow: 0 0 4px #eee;
  background: #fff;
  transition: all 0.2s;
  &.topbar--show {
    transform: translateY(0);
  }
  &.topbar--hidden {
    transform: translateY(-100%);
  }
  .topbar_main-mini {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    height: 60px;
    .logo {
      display: inline-block;
      img {
        width: 180px;
        height: 50px;
      }
    }
    .topbar-mini-right {
      display: flex;
      align-items: center;
      .user-group {
        margin-right: 10px;
        font-size: 16px;
        color: #333;
      }
      .menu-btn {
        width: 24px;
        height: 30px;
      }
    }
  }
}
.menu-drawer {
  /deep/.el-drawer {
    width: 50% !important;
  }
  .drawer-body {
    width: 100%;
    min-height: calc(80vh - 66px);
    overflow: auto;
    position: relative;
    padding: 0 20px;
    background: #fff;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
