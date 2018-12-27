import clonedeep from 'clonedeep'
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
export const doCustomTimes=(time,callback)=>{
    for(let i=0;i<time;i++){
        callback()
    }
}
//将文件列表放入对应得文件夹中
export const putFileInFolder=(folderList,fileList)=>{
    //将传递过来得文件进行拷贝
    const folderListCloned=clonedeep(folderList)
    const fileListCloned=clonedeep(fileList)
    return folderListCloned.map(folderItem=>{
        const folderId=folderItem.id
        let index=fileListCloned.length
        while(--index>=0){
            const fileItem=fileListCloned[index]
            if(fileItem.folder_id===folderId){
                const file=fileListCloned.splice(index,1)[0]
                file.title=file.name
                if(folderItem.children){
                    folderItem.children.push(file)
                }else{
                    folderItem.children=[file]
                }
            }
        }
        folderItem.type="folder"
        return folderItem
    })
}
//将文件夹列表转化为树状
export const transferFolderToTree=(folderList)=>{
    if(!folderList.length){
        return []
    }
    const folderListCloned=clonedeep(folderList)
    const handle=id=>{
        let arr=[]
        folderListCloned.forEach(folder=>{
            if(folder.folder_id===id){
                const children=handle(folder.id)
                if(folder.children)folder.children=[].concat(folder.children,children)
                else folder.children=children
                folder.title=folder.name
                arr.push(folder)
            }
        })
        return arr
    }
    return handle(0)
}