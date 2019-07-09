import axios from './index'
//获取所有期刊
export const getFlowList = () => {
  return axios.request({
    url: '/v1/classic/list',
    method: 'get'
  })
}
//添加期刊
export const addFlowMusic = ({
  title,
  content,
  type,
  image,
  musicUrl,
  pubdate,
}) => {
  return axios.request({
    url: '/v1/classic/add',
    method: 'post',
    data: {
      title,
      content,
      type,
      image,
      pubdate,
      musicUrl
    }
  })
}
export const addFlowMoveAndSentence=({
  title,
  content,
  type,
  image,
  musicUrl,
  pubdate,
})=>{
  return axios.request({
    url: '/v1/classic/add',
    method: 'post',
    data: {
      title,
      content,
      type,
      image,
      pubdate
    }
  })
}