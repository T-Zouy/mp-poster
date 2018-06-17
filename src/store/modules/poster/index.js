/**
 * Created by lin_yu on 2018/6/13
 */

import posterApi from '../../../api/poster'

// 传参对应
const MODULE_TYPE = {
  logoModules: 'logo',
  textModules: 'text',
  imageModules: 'image'
}

const deselectModule = function (modules) {
  return modules.map(value => {
    let content = value.content
    return {
      ...value,
      content: {
        ...content,
        disable: false
      }
    }
  })
}

// initial state
const state = {
  // 海报底部栏显示标志
  footerStatus: 'all',
  // 整个海报的数据
  poster: {},
  // 组件集
  posterModules: {
    textModules: [],
    imageModules: [],
    logoModules: []
  },
  // 正在编辑的组件
  editModule: {
    type: '',
    index: -1
  }
}

// getters
const getters = {
  footerStatus: state => state.footerStatus,
  poster: state => state.poster,
  textModules: state => state.posterModules.textModules,
  imageModules: state => state.posterModules.imageModules,
  logoModules: state => state.posterModules.logoModules,
  editModule: state => {
    if (state.editModule.type === '') {
      return {
        ...state.editModule,
        module: {}
      }
    }
    const {index, type} = state.editModule
    return {
      ...state.editModule,
      module: state.posterModules[type][index]['content']
    }
  },
  // 背景图
  bgUrl: state => {
    if (state.poster.hasOwnProperty('bg_url')) {
      return state.poster['bg_url']
    } else {
      return ''
    }
  },
  // 二维码图片
  qrCodeUrl: state => {
    if (state.poster.hasOwnProperty('qr_code_url')) {
      return state.poster['qr_code_url']
    } else {
      return ''
    }
  }
}

// actions
const actions = {
  // 获取海报模板数据
  async getPosterTemplate ({ commit, state }, id = 1) {
    let res = await posterApi.getPosterDetail(id)
    if (res.status.code === 0) {
      commit('setPosterModules', res.data)
      console.log(res.status.msg)
    } else {
      console.log(res.status.msg)
    }
  },
  // 选中需要编辑的组件
  selectModule ({ commit, state }, { type, index }) {
    console.log(type, index)
    commit('deselectAll')
    commit('setFooterStatus', type)
    commit('enableModule', { type, index })
    commit('setEditStatus', { type, index })
  },
  // 删除组件
  deleteModule ({commit}) {
    commit('deleteModule')
  },
  // 新增组件
  addModule ({ commit, state }, { type, module }) {
    console.log(type, module)
    commit('addModule', { type, module })
  }
}

// mutations
const mutations = {
  // 初始化编辑状态
  initEditStatus (state) {
    state.editModule.type = ''
    state.editModule.index = -1
  },
  // 设置编辑状态
  setEditStatus (state, { type, index }) {
    state.editModule = {
      type: type,
      index: index
    }
    console.log(state.editModule)
  },
  // 初始化poster
  initPoster (state) {
    state.poster = {}
    state.footerStatus = 'all'
    state.textModules = []
    state.imageModules = []
    state.logoModules = []
    this.initEditStatus()
  },
  // 设置state内的数据
  setPosterModules (state, poster) {
    state.poster = poster
    state.poster['template_module'].forEach(value => {
      let temp = value
      temp.content = JSON.parse(temp.content)
      if (temp.type === 'text') {
        state.posterModules.textModules.push(temp)
      } else if (temp.type === 'image') {
        state.posterModules.imageModules.push(temp)
      } else if (temp.type === 'logo') {
        state.posterModules.logoModules.push(temp)
      }
    })
    console.log(state.posterModules)
  },
  // 设置底部按钮的状态 all text
  setFooterStatus (state, type = 'all') {
    console.log(type)
    state.footerStatus = type
  },
  // 取消组件选中状态
  deselectAll (state) {
    state.footerStatus = 'all'
    state.editModule.type = ''
    state.editModule.index = -1
    state.posterModules.textModules = deselectModule(state.posterModules.textModules)
    state.posterModules.imageModules = deselectModule(state.posterModules.imageModules)
    state.posterModules.logoModules = deselectModule(state.posterModules.logoModules)
  },
  // 选中组件
  enableModule (state, { type, index }) {
    console.log(type, index)
    state.editModule.type = type
    state.editModule.index = index
    state.posterModules[type][index].content.disable = true
  },
  // 修改样式
  changeStyles (state, { type, index, styles }) {
    console.log(type, index, styles)
    state.posterModules[type][index]['content']['style'] = {
      ...state.posterModules[type][index]['content']['style'],
      ...styles
    }
  },
  // 修改文本内容或者图片地址
  changeSource (state, { type, index }, src) {
    console.log(type, index, src)
    if (type === 'textModules') {
      state.posterModules[type][index]['content']['text'] = src
    } else {
      state.posterModules[type][index]['content']['src'] = src
    }
  },
  // 删除组件
  deleteModule (state) {
    try {
      const {type, index} = state.editModule
      state.posterModules[type].splice(index, 1)
    } catch (e) {
      console.log(e)
    }
  },
  // 新增组件
  addModule (state, { type, module }) {
    let temp = {
      type: MODULE_TYPE[type],
      content: module
    }
    console.log(temp)
    state.posterModules[type].push(temp)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
