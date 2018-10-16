
const path=require('path')
const resolve=dir=>{
    return path.join(__dirname,dir)
}
const BASE_URL=process.env.NODE_ENV==='production'?'/':'/'
module.export={
    lintOnSave:false,
    baseUrl:BASE_URL,
    chainWebpack:config=>{
        config.resolve.alias
        .set('@',resolve('src'))
    },
    productionSourceMap:false,
    devServe:{
        proxy:'http://localhost:3000'
    }
}
