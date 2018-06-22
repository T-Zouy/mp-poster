/**
 * Created by lin_yu on 2018/6/11
 */

import request from '../utils/request'

const posterApi = {
  // 获取商家报名海报详情
  getPosterDetail: (id) => request.get('/index.php/api/wxSignUp/posterDetail', {
    id
  }),
  // logo列表
  getCorLogoList: ({page, perPage}) => request.get('/index.php/api/WxbmCorLogo/list', {
    page,
    per_page: perPage
  }),
  // 删除logo
  deleteCorLogo: (id) => request.delete('/index.php/api/WxbmCorLogo/delete', {
    id
  }),
  // 上传logo
  addCorLogo: ({url, width, height}) => request.post('/index.php/api/WxbmCorLogo/addPicture', {
    url,
    width,
    height
  })
}

export default posterApi
