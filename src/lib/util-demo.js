import clonedeep from 'clonedeep'
export const putFileInFolder=(folderList,fileList)=>{
    
    //在这里做的操作是会影响到原始数据的 因为数组是引用类型 在这里就需要做深拷贝
    let cloneFolderList=clonedeep(folderList)
    let cloneFileList=clonedeep(fileList)
    for(let i=0;i<cloneFileList.length;i++){

       for(let j=0;j<cloneFolderList.length;j++){
           cloneFolderList[j].type="folder"
           if(cloneFileList[i].folder_id===cloneFolderList[j].id){
                cloneFileList[i].title=cloneFileList[i].name
               if(cloneFolderList[j].children){
               
                cloneFolderList[j].children.push(cloneFileList[i])
               }else{
              
                cloneFolderList[j].children=[cloneFileList[i]]
               }
           }
       }
    }
    return cloneFolderList
}
export const transferFolderToTree=(folderList)=>{
    // console.log(folderList)
    //将文件夹列表转化为树装结构

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
export const expandSpecifiedFolder=(folderTree,id)=>{
    return folderTree.map(item=>{
        if(item.type==="folder"){
            if(item.id===id){
                item.expand=true
            }else{
                if(item.children && item.children.length){
                    item.children=expandSpecifiedFolder(item.children,id)
                    if(item.children.some(children=>{
                        return children.expand===true
                    })){
                        item.expand=true
                    }else{
                        item.expand=false
                    }
                }
            }
        }
        return item
    })
}

//封装深拷贝函数
export const deepClone=(obj)=>{
    //判断传入的obj是引用对象还是引用数组
    let objClone=Array.isArray(obj) ? [] :{}
    if(obj && typeof obj === "object"){
        for(key in obj){
            if(obj.hasOwnProperty(key)){
                //判断obj子元素是否为对象,如果是,递归赋值
                if(obj[key]&& typeof obj[key] ==="object"){
                    objClone[key]=deepClone(obj[key])
                }else{
                    //如果不是就简单复制
                    objClone[key]=obj[key]
                }
            }
        }
    }
    return objClone
}