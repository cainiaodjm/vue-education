import Mock from 'mockjs'
import {getUserInfo,authorization} from './response/user' 
import {getFileList,getFolderList,getTableData} from './response/data.js'
// Mock.mock('')
Mock.mock(/\/getFileList/, 'get', getFileList)
Mock.mock(/\/getFolderList/, 'get', getFolderList)
Mock.mock(/\/get_table_data/, getTableData)
// Mock.mock(/\/authorization/, authorization)
export default Mock