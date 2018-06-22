/**
 * Created by chang_feng on 2018/6/13
 */
import request from '../utils/request'

/**
 * 授权登录
 */
export function login (query) {
  return request.post('/index.php/api/wxSignUp/onLogin', query)
}

/**
 * 是否关注公众号
 */
export function handleUserSubscribe (query) {
  return request.get('/index.php/api/WxbmWxPublicAccount/isSubscribe', query)
}
