/**
 * Created by lin_yu on 2018/6/11
 */

import request from '../utils/request'

const posterApi = {
  // 获取商家报名海报详情
  getPosterDetail: (id) => request.get(' /index.php/api/wxSignUp/posterDetail', {
    id: id
  })
}

export default posterApi
