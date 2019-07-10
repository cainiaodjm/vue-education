<template>
  <div class="layout-wrapper">
    <Layout class="layout-outer">
      <Sider
        breakpoint="sm"
        width="225"
        collapsed-width="64"
        collapsible
        hide-trigger

        v-model="collapsed"
      >
        <side-menu
          accordion
          ref="sideMenu"
          :active-name="$route.name"
          :list="routers"
          :collapsed="this.collapsed"
          @on-select="turnToPage"
        ></side-menu>
      </Sider>
      <Layout>
        <Header class="header-wrapper">
          <!-- <Icon :class="triggerClasses" type="md-menu" :size="32" @click.native="handleCollasped"  /> -->
          <header-bar :collapsed="this.collapsed" @on-coll-change="handleCollapsedChange"></header-bar>
        </Header>
        <Content class="content-card">
          <Layout class="main-layout-con">
            <div class="tag-nav-wrapper">
              <!-- <Tabs type="card" :animated="false">
                <TabPane :label="item.name" v-for="(index,item) in tabList" :key="`tabNav${index}`"></TabPane>
              </Tabs>-->
              <tags-nav :list="tagNavList" />
            </div>
            <Content class="content-wrapper">
              <keep-alive>
                <router-view></router-view>
              </keep-alive>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import SideMenu from "@/components/side-menu";
import HeaderBar from "@/components/header-bar";
import TagsNav from "@/views/main/tags-nav";
import { getNewTagList, getMenuByRouter } from "@/lib/util";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    SideMenu,
    HeaderBar,
    TagsNav
  },
  data() {
    return {
      collapsed: false
    };
  },
  mounted() {},
  computed: {
    tagNavList() {
      return this.$store.state.app.tagNavList;
    },
    triggerClasses() {
      return ["trigger-icon", this.collapsed ? "rotate" : ""];
    },

    ...mapState({
      routers: state => {
        return getMenuByRouter(state.router.routers, ["super_admin", "access"]);
      },
      tabList: state => state.topNav.tabList
    })
  },
  watch: {
    /**
     * 要想实现标签上的router显示 就要监听router的变化
     */

    /**
     * 监视
     */
    $route(newRoute) {
      const { name, query, params, meta } = newRoute;
      this.addTag({
        route: { name, query, params, meta },
        type: "push"
      });
      this.setTagNavList(getNewTagList(this.tagNavList, newRoute));
      this.$refs.sideMenu.updateOpenName(newRoute.name);
    }
  },
  methods: {
    turnToPage(route) {
      /**
       * 编程式的导航
       * router.push 的参数可以是一个字符串,或者是一个描述地址的对象
       *
       */
      let { name, params, query } = {};
      if (typeof route === "string") name = route;
      else {
        name = route.name;
        params = router.params;
        query = router.query;
      }
      this.$router.push({
        name,
        params,
        query
      });
    },
    handleCollapsedChange(state) {
      this.collapsed = state;
    },
    ...mapMutations(["UPDATE_ROUTER", "setTagNavList", "addTag"])
  }
};
</script>
<style lang="less">
.tag-nav-wrapper {
  padding: 0;
  height: 40px;
  background: #f0f0f0;
}
.main-layout-con {
  height: 100%;
}
.content-wrapper {
  padding: 18px;
  height: calc(100% - 80px);
  overflow: auto;
}
.layout-wrapper,
.layout-outer {
  height: 100%;
  .ivu-layout-sider {
    overflow: hidden;
    height: 100%;
    &-children {
      overflow-y: scroll;
      overflow-x: hidden;
      margin-right: -20px;
    }
  }
  .header-wrapper {
    background-color: #ffffff;
    box-sizing: border-box;
    height: 64px;
    line-height: 64px;
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.1);
    padding: 0 25px;
    .trigger-icon {
      cursor: pointer;
      transition: transform 0.3s ease;
      &.rotate {
        transform: rotateZ(-90deg);
        transition: transform 0.3s ease;
      }
    }
  }
  .content-card {
    height: calc(100% - 60px);
    overflow: hidden;
    .ivu-tabs-bar {
      margin-bottom: 0px;
      border: none;
    }
  }
  .view-box {
    height: 100%;
    overflow: hidden;
  }
  .page-card {
    height: calc(100% - 84px);
    overflow: auto;
  }
}
</style>
