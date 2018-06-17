/**
 * Created by chang_feng on 2018/6/7
 */
import request from '../utils/request'

/**
 * 获取模板列表
 */
export function getTempList () {
  return request.get('/index.php/api/wxSignUp/templateList')
}

/**
 * 创建模板
 */
export function createPosters (query) {
  return request.post('/index.php/api/wxSignUp/buildPosters', query)
}

/**
 * 获取高清图库列表
 */
export function getPictureStoreList (query) {
  return request.get('/index.php/api/WxbmHdGallery/hdGalleryList', query)
}

/**
 * 保存表单
 */
export function saveForm (query) {
  return request.post('/index.php/api/wxSignUp/diyCustomerConf', query)
}

/**
 * 获取表单字段信息
 */
export function getFormDetail (query) {
  return request.get('/index.php/api/wxSignUp/posterFrom', query)
}

/**
 * 编辑表单
 */
export function editForm (query) {
  return request.put('/index.php/api/wxSignUp/modifyCustomerConf', query)
}

/**
 * 报名
 */
export function handleSignup (query) {
  return request.post('/index.php/api/wxSignUp/signUp', query)
}
