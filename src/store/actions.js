import {getAppName} from '@/api/app.js'

const actions={
    getAppName({commit}){
        getAppName().then(res=>{
            commit('setAppName',res.appName)
        })
    }
}
export default actions