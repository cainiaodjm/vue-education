<template>
  <div class="layout-wrapper">
    <Layout class="layout-outer">
      <Sider
        breakpoint="sm"
        width="225"
        collapsed-width="70"
        collapsible
        hide-trigger
        v-model="collapsed"
      >
        <side-menu :list="routers" :collapsed="this.collapsed" @on-select="turnToPage"></side-menu>
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
              </Tabs> -->
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
import TagsNav from '@/views/main/tags-nav'
import  {getNewTagList} from '@/lib/util'
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    SideMenu,
    HeaderBar,
    TagsNav
  },
  data() {
    return {
      collapsed: false,
      menuList: [
        {
          title: "内容管理",
          icon: "ios-albums",
          name: "content-manage",
          children: [
            {
              title: "添加文章",
              icon: "ios-albums",
              name: "add-title"
            }
          ]
        },
        {
          title: "仓库管理",
          icon: "ios-albums",
          name: "wh-manage"
        },
        {
          title: "财务管理",
          icon: "ios-albums",
          name: "finance-manage",
          children: [
            {
              title: "账单管理",
              icon: "ios-albums",
              name: "bill-manage",
              children: [
                {
                  name: "bill-create",
                  title: "账单生成",
                  icon: "ios-albums"
                },
                {
                  name: "bill-table",
                  title: "账单报表",
                  icon: "ios-albums"
                }
              ]
            },
            {
              name: "tax-manage",
              title: "税务管理",
              icon: "ios-albums"
            }
          ]
        }
      ]
    };
  },
  computed: {
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    triggerClasses() {
      return ["trigger-icon", this.collapsed ? "rotate" : ""];
    },
    //从全局的state中获取当前的routers 当然这个routers是包含所有的 不能把公共页放进去
    ...mapState({
      routers: state =>
        state.router.routers.filter(item => {
          return item.path !== "*" && item.name !== "login";
        }),
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
    '$route'(newRoute) {
      console.log(newRoute)
      
      const { name, query, params, meta } = newRoute
      console.log(this.tagNavList)
      // this.UPDATE_ROUTER(newRoute);
      this.setTagNavList(getNewTagList(this.tagNavList,newRoute))
    }
  },
  methods: {
    turnToPage(route){
      /**
       * 编程式的导航
       * router.push 的参数可以是一个字符串,或者是一个描述地址的对象
       * 
       */
     let {name,params,query}={}
     if(typeof route === 'string') name=route
     else{
       name=route.name
       params=router.params
       query=router.query
     }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange(state) {
      console.log("layout中的collapsed为" + state);
      console.log(
        "我是调用header-bar的组件 我已经接收到了修改事件 并将修改后的值传给header-bar了"
      );
      this.collapsed = state;
    },
    ...mapMutations([
      "UPDATE_ROUTER",
      "setTagNavList"
      ])
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
