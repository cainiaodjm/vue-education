export const getAppName=()=>{
    return new Promise((resolve,reject)=>{
        const err=null
        setTimeout(()=>{
            let appInfo={
                code:200,
                appName:'actionAppName'
            }
            if(!err) resolve(appInfo)
            else reject(err)
            
        },1000)
    })
}