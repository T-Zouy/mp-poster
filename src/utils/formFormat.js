/**
 * Created by chang_feng on 2018/6/15
 */

import dayjs from 'dayjs'

/**
 * 处理每个数据
 *
 * @param {*} type 当type为key是传
 * @returns
 */
function handleDataToOwnWanted (item, type) {
  let query
  if (type === 1) {
    query = {
      type: item.type,
      key_name: item.key_name,
      conf_id: item.id
    }
  } else {
    query = {
      type: item.type,
      key_name: item.key_name
    }
  }
  return query
}

/**
 * 格式化获取的表单数据，改为自己定义的
 *
 * @export
 * @param {*} res 获取的数据
 * @returns
 */
export function formFormat (res) {
  let formData = {}
  let formBody = []
  if (Array.isArray(res.data) && res.data.length) {
    res.data.forEach(item => {
      if (item.type === 'title') {
        formData.title = handleDataToOwnWanted(item)
      } else if (item.type === 'key') {
        formBody.push(handleDataToOwnWanted(item, 1))
      } else {
        formData.button = handleDataToOwnWanted(item)
      }
    })
    formData.body = formBody
    return formData
  } else {
    // 没数据时，使用默认数据
    formData = null
    return formData
  }
}

export function handleDateShow (date) {
  const hour = dayjs(date).hour() > 12
    ? `下午0${dayjs(date).hour() - 12}`
    : dayjs(date).hour() > 9
      ? `上午${dayjs(date).hour()}`
      : `上午0${dayjs(date).hour()}`
  const minute = dayjs(date).minute() > 10 ? dayjs(date).minute() : `0${dayjs(date).minute()}`
  return `${dayjs(date).month()}月${dayjs(date).date()}日 ${hour}:${minute}`
}
