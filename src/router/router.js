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
        component: () => import('../views/vuejs/demo1.vue')
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
      }
    ]
  },
  {
    path: '/',
    name: 'home',
    component: Layout,
    meta: {
      title: '组件'
    },
    children: [
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
  },
  // {
  //   name: 'older',
  //   component: Layout,
  //   meta: {
  //     title: '最早写的'
  //   },
  //   children: [
  //     {
  //       path: '/count-to',
  //       component: () => import('@/views/count-to.vue'),
  //       name: 'count_to',
  //       meta: {
  //         title: 'count-to'
  //       }
  //     },
  //     {
  //       path: '/hover-me',
  //       component: () => import('@/views/hover-me.vue'),
  //       name: 'hover_me',
  //       meta: {
  //         title: 'hover_me'
  //       }
  //     },
  //     {
  //       path: '/response-web-page/page-1',
  //       name: 'page_1',
  //       meta: {
  //         title: 'page_1'
  //       },
  //       component: () => import('@/views/response-web-page/page-1/page-1.vue')
  //     },
  //     {
  //       path: '/about',
  //       name: 'about',
  //       meta: {
  //         title: 'about'
  //       },
  //       // route level code-splitting
  //       // this generates a separate chunk (about.[hash].js) for this route
  //       // which is lazy-loaded when the route is visited.
  //       component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  //       props: {
  //         food: 'banana'
  //       }
  //     },
  //     {
  //       path: '/render-page',
  //       name: 'render_page',
  //       meta: {
  //         title: 'render_page'
  //       },
  //       component: () => import('@/views/render-page.vue')
  //     },
  //     {
  //       path: '/argu/:name',
  //       name: 'argu',
  //       meta: {
  //         title: 'argu'
  //       },
  //       component: () => import('@/views/argu.vue'),
  //       props: true
  //     },
  //     {
  //       path: '/parent',
  //       name: 'parent',
  //       meta: {
  //         title: 'parent'
  //       },
  //       component: () => import('@/views/parent.vue'),
  //       children: [
  //         {
  //           path: 'child',
  //           name: 'child',
  //           meta: {
  //             title: 'child'
  //           },
  //           component: () => import('@/views/child.vue')
  //         }
  //       ]
  //     },
  //     {
  //       path: '/split-pane',
  //       name: 'split_pane',
  //       meta: {
  //         title: "split_pane"
  //       },
  //       component: () => import('@/views/split-pane.vue')
  //     },
  //     {
  //       path: '/name_view',
  //       name: 'name_view',
  //       meta: {
  //         title: 'namv_view',
  //       },
  //       components: {
  //         default: () => import('@/views/child.vue'),
  //         email: () => import('@/views/email.vue'),
  //         tel: () => import('@/views/tel.vue')
  //       }
  //     },
  //     {
  //       path: '/upload',
  //       name: 'upload',
  //       meta: {
  //         title: 'upload'
  //       },
  //       component: () => import('@/views/upload.vue'),
  //     },

  //     {
  //       path: '/main',
  //       name: 'main',
  //       meta: {
  //         title: 'main'
  //       },
  //       redirect: to => {
  //         return {
  //           name: 'home',
  //         }

  //       }
  //     },
  //     {
  //       path: '/store',
  //       name: 'store',
  //       meta: {
  //         title: 'store'
  //       },
  //       component: () => import('@/views/store.vue')
  //     }
  //   ]

  // },




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

