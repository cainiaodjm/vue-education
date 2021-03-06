export const getUserInfo=(options)=>{
    
}
export const authorization=()=>{
    return {
        code:200,
        data:{
            token:'xxx',
            rules:{
                page:{
                    home:true,
                    home_page:true,
                    grid_page:true,
                    i_button_page:true,
                    form_page:true,
                    slide_render:true,
                    folder_tree_page:true,
                    form_dynamic:true,
                    tables:true,
                    count_to:true,
                    hover_me:true,
                    page_1:true,
                    about:true, 
                    render_page:true,
                    parent:true,
                    child:true,
                    split_pane:true,
                    name_view:true,
                    upload:true
                },
                component:{
                    edit_button:true,
                    publish_button:true
                }
            }
        },
        message:""
    }
}