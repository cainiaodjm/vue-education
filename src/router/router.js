import Home from '../views/components/Home.vue'
import Layout from '../views/layout.vue'

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
        path:'demo2-cart',
        name:'demo2-cart',
        meta:{
          title:'demo2-cart'
        },
        component:()=>import('../views/vuejs/demo2/cart.vue')
      },
      {
        path:'demo2',
        name:'demo2',
        meta:{
          title:'demo2'
        },
        component:()=>import('../views/vuejs/demo2/main.vue')
      },
      {
        path:'demo3',
        name:'demo3',
        meta:{
          title:'demo3'
        },
        component:()=>import('../views/vuejs/demo3-jsx/demo3.vue')
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
        path:"file_page",
        name:'file_page',
        meta:{
          title:'文件管理'
        },
        component:()=>import('../views/oldland/file_manage.vue')
      }
    ]
  },
  {
    path: '/',
    name: '_home',
    redirect:'/home',
    component: Layout,
    meta: {
      title: '组件'
    },
    children: [
      {
        path:'/home',
        name:'home',
        meta:{
          title:'首页',
          icon: 'md-home'
        },
        component:()=>import('@/views/home.vue')

      },
      {
        path: 'home_page',
        name: 'home_page',
        meta: {
          title: '首页'
        },
        component: Home
      },
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
    component: () => import('@/views/login.vue')
  },
  {
    path: '*',
    component: () => import('@/views/error_404.vue')
  }
]

