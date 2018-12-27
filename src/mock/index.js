import Mock from 'mockjs'
import {getUserInfo} from './response/user' 
import {getFileList,getFolderList} from './response/data.js'
// Mock.mock('')
Mock.mock(/\/getFileList/, 'get', getFileList)
Mock.mock(/\/getFolderList/, 'get', getFolderList)
export default Mock