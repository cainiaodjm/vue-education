import Home from '../views/components/Home.vue'
import Layout from '../views/layout.vue'
/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由(无效)
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */
export const routerMap = [
  {
    path: '/vuejs',
    name: 'vuejs',
    component: Layout,
    meta: {
      title: 'VueJs实战'
    },
    children: [
      {
        path: 'demo1',
        name: 'demo1',
        meta: {
          title: 'demo1'
        },
        component: () => import('../views/vuejs/demo1/demo1.vue')
      },
      {
        path: 'demo2-cart',
        name: 'demo2-cart',
        meta: {
          title: 'demo2-cart'
        },
        component: () => import('../views/vuejs/demo2/cart.vue')
      },
      {
        path: 'demo2',
        name: 'demo2',
        meta: {
          title: 'demo2'
        },
        component: () => import('../views/vuejs/demo2/main.vue')
      },
      {
        path: 'demo3',
        name: 'demo3',
        meta: {
          title: 'demo3'
        },
        component: () => import('../views/vuejs/demo3-jsx/demo3.vue')
      }
    ]
  },
  {
    path: '/oldland',
    name: 'oldland',
    component: Layout,
    meta: {
      title: '旧岛'
    },
    children: [
      {
        path: 'flow_page',
        name: 'flow_page',
        meta: {
          title: '期刊'
        },
        component: () => import('../views/oldland/flow.vue')
      },
      {
        path: "file_page",
        name: 'file_page',
        meta: {
          title: '文件管理'
        },
        component: () => import('../views/oldland/file_manage.vue')
      }
    ]
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Layout,
    meta: {
      hideInMenu: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          icon: 'md-home'
        },
        component: () => import('@/views/home.vue')

      },
    ]
  },
  {
    path: '/components',
    name: 'components',
    component: Layout,
    meta: {
      title: '组件',
      icon: 'logo-buffer',
    },
    children: [
      {
        path: 'markdown_page',
        name: 'markdown_page',
        meta: {
          title: '富文本编辑器'
        },
        component: () => import('../views/components/markdown-page.vue')
      },
      {
        path: 'grid_page',
        name: 'grid_page',
        meta: {
          title: 'grid_page'
        },
        component: () => import('../views/components/grid.vue')
      },
      {
        path: 'i-button-page',
        name: 'i_button_page',
        meta: {
          title: 'i_button_page'
        },
        component: () => import('../views/components/i-button-page.vue')
      },
      {
        path: 'form-page',
        name: 'form_page',
        meta: {
          title: 'form_page'
        },
        component: () => import('../views/components/form-page.vue')
      },
      {
        path: 'slide-render',
        name: 'slide_render',
        meta: {
          title: "slide_render"
        },
        component: () => import('../views/components/slide-render.vue')
      },
      {
        path: 'folder-tree-page',
        name: 'folder_tree_page',
        meta: {
          title: "folder_tree_page"
        },
        component: () => import('../views/components/folder-tree-page/folder-tree-page.vue')
      },
      {
        path: 'form',
        name: 'form',
        meta: {
          title: "form"
        },
        component: () => import('../views/components/form.vue')
      },
      {
        path: 'form-dynamic',
        name: 'form_dynamic',
        meta: {
          title: "form_dynamic"
        },
        component: () => import('@/views/components/form-dynamic.vue')
      },
      {
        path: 'tables',
        name: 'tables',
        meta: {
          title: "tables"
        },
        component: () => import('@/views/components/tables.vue')
      }
    ]
  }




]

//
export const routes = [
  {
    path: '/login',
    name: 'login',
    meta:{
      hideInMenu:true,
    },
    component: () => import('@/views/login.vue')
  },
  {
    path: '*',
    meta:{
      hideInMenu:true,
    },
    component: () => import('@/views/error_404.vue')
  }
]

