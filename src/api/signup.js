/**
 * Created by chang_feng on 2018/6/14
 */
import request from '../utils/request'

/**
 * 获取我创建的报名
 */
export function getMyCreatedApplyList (query) {
  return request.get('/index.php/api/wxSignUp/minePostersList', query)
}

/**
 * 删除海报
 */
export function deletePoster (query) {
  return request.delete('/index.php/api/wxbmTemplate/deletePoster', query)
}

/**
 * 开启、关闭海报
 */
export function closeOrOpenPoster (query) {
  return request.put('/index.php/api/wxbmTemplate/poster', query)
}

/**
 * 获取报名者信息
 */
export function getApplyCustomerList (query) {
  return request.get('/index.php/api/wxSignUp/customerList', query)
}

/**
 * 获取报名者信息
 */
export function copyPoster (query) {
  return request.post('/index.php/api/wxbmTemplate/copyPoster', query)
}
