import clonedeep from 'clonedeep'
import { defaultConfig } from '@/config'
import Cookies from 'js-cookie'
import { Base64 } from 'js-base64'
const { cookieExpires } = defaultConfig
export const showTitle = (item, vm) => {
    let { title, __titleIsFunction__ } = item.meta
    if (!title) return

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
export const doCustomTimes = (time, callback) => {
    for (let i = 0; i < time; i++) {
        callback()
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
        // console.log(folderItem)
        return folderItem
    })
    console.log(folderListClone)
    return folderListClone
}
export const downloadFileByFrame = (url) => {

    let  elemIF = document.createElement("iframe");
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
    console.log('Basic ' + base64)
    return 'Basic ' + base64
}
export const getTagNavListFromLocalstorage = () => {
    const list = localStorage.tagNavList
    return list ? JSON.parse(list) : []
}
export const setTagNavListInLocalstorage = list => {
    localStorage.tagNavList = JSON.stringify(list)
}
export const getNewTagList = (list, newRoute) => {
    //如果路由已经在list里 则返回list 
    const { name, path, meta } = newRoute
    let newList = [...list]
    if (newList.findIndex(item => item.name === name) >= 0) return newList
    else newList.push({ name, path, meta })
    return newList
}
export const getRouteTitleHandled = (route) => {
    let router = { ...route }
    let meta = { ...route.meta }
    let title = ''
    if (meta.title) {
        /**
         * 暂时不是很清楚这段代码是干吗的
         */
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

}