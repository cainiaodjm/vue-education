import Mock from 'mockjs'
import { doCustomTimes } from '@/lib/util.js'
const Random = Mock.Random
export const getFileList = () => {
  const template = {
    'name|5': '@cword',
    'create_time': '@datetime',
    'folder_id|1-5': 0,
    'id|+1': 10000
  }
  let arr = []
  doCustomTimes(10, () => {
    arr.push(Mock.mock(template))
  })
  return arr
}
export const getFolderList = () => {
  const template1 = {
    'name|1': '@word',
    'creat_time': '@datetime',
    'folder_id': 0,
    'id|+1': 1
  }
  const template2 = {
    'name|1': '@word',
    'creat_time': '@datetime',
    'folder_id|+1': 1,
    'id|+1': 4
  }
  let arr = []
  doCustomTimes(3, () => {
    arr.push(Mock.mock(template1))
  })
  doCustomTimes(2, () => {
    arr.push(Mock.mock(template2))
  })
  return arr
}
export const getTableData = req => {
  let tableData = []
  doCustomTimes(5, () => {
    tableData.push(Mock.mock({
      name: '@name',
      email: '@email',
      createTime: '@date'
    }))
  })
  return tableData
}