import Home from '../views/Home.vue'

export default[
  {
    path: '/',
    name: 'home',
    alias:'/home_page',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/argu/:name',
    name:'argu',
    component:()=>import('@/views/argu.vue')
  },
  {
    path:'/parent',
    name:'parent',
    component:()=>import('@/views/parent.vue'),
    children:[
      {
        path:'child',
        component:()=>import('@/views/child.vue')
      }
    ]
  },
  {
    path:'/name_view',
    components:{
      default:()=>import('@/views/child.vue'),
      email:()=>import('@/views/email.vue'),
      tel:()=>import('@/views/email.vue')
    }
  },
  // {
  //   path:'/main',
  //   redirect:'/'
  // },
  // {
  //   path:'/main',
  //   redirect:{
  //     name:'home'
  //   }
  // }
  {
    path:'/main',
    redirect:to=>{
      return {
        name:'home',
      }
      // return '/'
    }
  }
]

