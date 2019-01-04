//设置baseUrl路径 如果是生成环境就为http//production.com  否则就为测试环境下的服务端url 
//如果要设置代理的话 要为'' 并且在vue.config.js中设置代理地址
// export const baseURL = process.env.NODE_ENV === 'production' ?
//     'http//production.com' : 'https://easy-mock.com/mock/5c1c5e7f598a9d0a0141abd1/cainiaodjm-admin'
export const baseURL=process.env.NODE_ENV==='production'?
'http//production.com':'http://localhost:3000'

export default {
    /**
     * @description 配置显示在浏览器标签的title
    */
    title: 'cainiaodjm-admin',
    /**
      * @description api请求基础路径
    */
    useI18n: true,
    baseUrl: {
        dev: 'https://easy-mock.com/mock/5c1c5e7f598a9d0a0141abd1/cainiaodjm-admin',
        pro: 'https://cainiaodjm.top'
    },

}