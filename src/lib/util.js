import clonedeep from 'clonedeep'
import { defaultConfig } from '@/config'
import Cookies from 'js-cookie'
import { Base64 } from 'js-base64'
import { hasOneOf, forEach } from './tools'
const { cookieExpires } = defaultConfig
// export const showTitle = (item, vm) => {
//   let { title, __titleIsFunction__ } = item.meta
//   if (!title) return

// }

/**
 * 判断参数是否是其中之一
 * @param value
 * @param validList
 */
export function oneOf(value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
}
export const hasClass = (el, className) => {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export const addClass = (el, className) => {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}
/**
 *
 * @param {*} time 回调函数需要执行的次数
 * @param {*} callback 回调函数
 */
export const doCustomTimes = (time, callback) => {
  for (let i = 0; i < time; i++) {
    callback(i)
  }
}
//将文件列表放入对应得文件夹中
export const putFileInFolder = (folderList, fileList) => {
  //将传递过来得文件进行拷贝
  const folderListCloned = clonedeep(folderList)
  const fileListCloned = clonedeep(fileList)
  const folderListClone = folderListCloned.map(folderItem => {
    const folderId = folderItem.id
    let index = fileListCloned.length
    
    while (--index >= 0) {
    
      const fileItem = fileListCloned[index]
      if (fileItem.folder_id === folderId) {
        //获取file
        const file = fileListCloned.splice(index, 1)[0]
        file.title = file.name
        if (folderItem.children) {
          folderItem.children.push(file)
        } else {
          folderItem.children = [file]
        }
      }
    }
    folderItem.type = "folder"
    return folderItem
  })
  console.log(folderListClone)
  return folderListClone
}
export const downloadFileByFrame = (url) => {

  let elemIF = document.createElement("iframe");
  elemIF.src = url;
  elemIF.style.display = "none";
  document.body.appendChild(elemIF);
  elemIF.remove()
}
export const downloadFile = ({ url, params }) => {
  const form = document.createElement('form')
  form.setAttribute('action', url)
  form.setAttribute('method', 'post')
  for (const key in params) {
    const input = document.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('name', key)
    input.setAttribute('value', params[key])
    form.appendChild(input)
  }
  document.body.appendChild(form)
  form.submit()
  form.remove()
}
//将文件夹列表转化为树状
export const transferFolderToTree = (folderList) => {
  if (!folderList.length) {
    return []
  }
  const folderListCloned = clonedeep(folderList)
  const handle = id => {
    let arr = []
    folderListCloned.forEach(folder => {
      if (folder.folder_id === id) {
        const children = handle(folder.id)
        if (folder.children) folder.children = [].concat(folder.children, children)
        else folder.children = children
        folder.title = folder.name
        arr.push(folder)
      }
    })
    return arr
  }
  return handle(0)
}

export const TOKEN_KEY = 'token'

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

export const encode = () => {
  const token = getToken()
  const base64 = Base64.encode(token + ":")

  return 'Basic ' + base64
}
export const getTagNavListFromLocalstorage = () => {
  const list = localStorage.tagNavList
  return list ? JSON.parse(list) : []
}
export const setTagNavListInLocalstorage = list => {
  localStorage.tagNavList = JSON.stringify(list)
}

export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}
export const showThisMenuEle = (item, access) => {
  /**
   * 通过路由元中的权限信息来控制路由页面是否显示
   * 如果过路由元中有accees字段 则判断权限
   * else 返回true
   */
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) return true
    else return false
  } else return true
}
export const getMenuByRouter = (list, access) => {
  let res = []
  forEach(list, item => {
    if (!item.meta || (item.meta && !item.meta.hideInMenu)) {
      let obj = {
        icon: (item.meta && item.meta.icon) || '',
        name: item.name,
        meta: item.meta
      }
      if ((hasChild(item) || (item.meta && item.meta.showAlways)) && showThisMenuEle(item, access)) {
        //这边进行递归
        obj.children = getMenuByRouter(item.children, access)
      }
      if (item.meta && item.meta.href)
        obj.href = item.meta.href
      if (showThisMenuEle(item, access)) res.push(obj)
    }
  })
  return res

}


/**
 *
 * @param {*} list 现有标签导航列表
 * @param {*} newRoute 新添加的路由原信息对象
 * @description 如果该newRoute已经存在则不再添加
 */
export const getNewTagList = (list, newRoute) => {
  //如果路由已经在list里 则返回list
  const { name, path, meta } = newRoute
  let newList = [...list]
  if (newList.findIndex(item => item.name === name) >= 0) return newList
  else newList.push({ name, path, meta })
  return newList
}

/**
 * @description 根据name/params/query判断两个路由对象是否相等
 * @param {*} route1 路由对象
 * @param {*} route2 路由对象
 */
export const routeEqual = (route1, route2) => {
  const params1 = route1.params || {}
  const params2 = route2.params || {}
  const query1 = route1.query || {}
  const query2 = route2.query || {}
  return (route1.name === route2.name) && objEqual(params1, params2) && objEqual(query1, query2)
}

export const objEqual = (obj1, obj2) => {
  const keysArr1 = Object.keys(obj1)
  const keysArr2 = Object.keys(obj2)
  if (keysArr1.length !== keysArr2.length) return false
  else if (keysArr1.length === 0 && keysArr2.length === 0) return true
  //some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。
  else return !keysArr1.some(key => obj1[key] != obj2[key])
}
/**
 * 判断打开的标签列表里是否已存在这个新添加的路由对象
 * @param {*} tagNavList 标签列表
 * @param {*} routeItem  路由对象
 */

export const routeHasExist = (tagNavList, routeItem) => {
  let len = tagNavList.length;
  let res = false
  doCustomTimes(len, (index) => {
    if (routeEqual(tagNavList[index], routeItem)) res = true
  })
  return res
}

export const getRouteTitleHandled = (route) => {
  /**
   * 定义了一个router router通过实参解构赋值
   * 定义了meta  空的 title
   * 如果meta中有title 则判断meta中title是函数吗？ 是则添加一个属性
   * 总之这段代码就是来判断这个路由对象里面的meta中的title是否是函数
   */
  let router = { ...route }
  let meta = { ...route.meta }
  let title = ''
  if (meta.title) {
    if (typeof meta.title === 'function') {
      meta.__titleIsFunction__ = true
    } else {
      title = meta.title
    }
  }
  meta.title = title
  router.meta = meta
  return router

}
export const setTitle = (routerItem, vm) => {
  console.log(routerItem, vm)
}