//设置baseUrl路径 如果是生成环境就为http//production.com  否则就为测试环境下的服务端url 
//如果要设置代理的话 要为'' 并且在vue.config.js中设置代理地址
export const baseURL=process.env.NODE_ENV==='production'?
'http//production.com':'http://localhost:4000'
// export const baseURL=process.env.NODE_ENV==='production'?
// 'http//production.com':''

