<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu
      v-show="!collapsed"
      width="auto"
      ref="menu"
      :active-name="activeName"
      :open-names="openedNames"
      @on-select="handleSelect"
      :accordion="accordion"
      theme="dark"
    >
      <template v-for="item in list">
        <re-submenu
          v-if="item.children"
          :key="`menu_${item.name}`"
          :name="item.name"
          :parent="item"
        ></re-submenu>
        <MenuItem :key="`menu_${item.name}`" :name="item.name" v-else>
          <Icon :type="item.icon" />
          {{item.meta.title}}
        </MenuItem>
      </template>
    </Menu>
    <div v-show="collapsed" class="drop-wrapper">
      <template v-for="item in list">
        <re-dropdown
          v-if="item.children"
          :show-title="false"
          icon-color="#fff"
          :parent="item"
          :key="`drop_${item.name}`"
        ></re-dropdown>
        <Tooltip v-else transfer :content="item.title" placement="right" :key="`drop_${item.name}`">
          <span class="drop-menu-span">
            <Icon :size="20" color="#fff" :type="item.icon" />
          </span>
        </Tooltip>
      </template>
    </div>
  </div>
</template>
<script>
import ReSubmenu from "./re-submenu.vue";
import ReDropdown from "./re-dropdown.vue";
import { getUnion } from "../../lib/tools";
export default {
  name: "SideMenu",
  components: {
    ReSubmenu,
    ReDropdown
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    activeName: {
      type: String,
      default: ""
    },
    accordion: Boolean,
    openNames: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      openedNames: []
    };
  },
  watch: {
    /**
        activeName由外部传入  在组件内部监听这个activeName 
        通过内部的openedNames来保存每次点击的activeName
     */
    activeName(name) {
      if (this.accordion) {
        this.openedNames = this.getOpenedNamesByActiveName(name);
       
      } else
        this.openedNames = getUnion(
          this.openedNames,
          this.getOpenedNamesByActiveName(name)
        );
    },
    openNames(newNames) {
      this.openedNames = newNames;
    },
    openedNames() {
      this.$nextTick(() => {
       
        this.$refs.menu.updateOpened();
      });
    }
  },
  mounted() {
    //    this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
  },
  methods: {
    /**
        更新当前打开的展开标签
         */

    getOpenedNamesByActiveName(name) {
      
      // console.log(
      //   this.$route.matched.map(item => item.name).filter(item => item !== name)
      // );
      return this.$route.matched
        .map(item => item.name)
        .filter(item => item !== name);
    },
    updateOpenName(name) {
      //   if (name === this.$config.homeName) this.openedNames = []
      //   else this.openedNames = this.getOpenedNamesByActiveName(name)
      this.openedNames = this.getOpenedNamesByActiveName(name);
    },

    handleSelect(name) {
      this.$emit("on-select", name);
    }
  }
};
</script>

<style lang="less">
.side-menu-wrapper {
  width: 100%;
  .ivu-tooltip,
  .drop-menu-span {
    width: 100%;
    display: block;
    // color: #ffffff;
    text-align: center;
    padding: 5px 0px;
  }
}
.drop-wrapper > .ivu-dropdown {
  display: block;
  margin: 0 auto;
  padding: 5px 0px;
}
</style>
