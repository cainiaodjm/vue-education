/**函数式组件
 * 
 * 
 * 这个函数式组件没有生命钩子 
 * 他只是作为一个接收参数的组件
 * functional 属性设置为true的时候 那么就意味着这个组件没有实例 只是一个普通的对象
 * 
*/
export default {
    functional:true,
    props:{
        name:String,
        renderFunc:Function
    },
    render:(h,ctx)=>{
        //这个组件是没有实例的,所以用ctx指代当前的对象
        
        return ctx.props.renderFunc(h,ctx.props.name) 
    }
}