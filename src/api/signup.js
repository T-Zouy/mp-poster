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
 * 获取报名者信息
 */
export function getApplyCustomerList (query) {
  return request.get('/index.php/api/wxSignUp/customerList', query)
}
