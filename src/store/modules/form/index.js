/**
 * Created by chang_feng on 2018/6/13
 */

const state = {
  formTitle: {
    type: 'title',
    key_name: '请填写标题'
  },
  formBody: [
    {
      type: 'key',
      key_name: '姓名'
    },
    {
      type: 'key',
      key_name: '手机'
    }
  ],
  formButton: {
    type: 'button',
    key_name: '提交'
  }
}

const mutations = {
  handleFormAddOneLine (state, query) {
    state.formBody.push({
      type: 'key',
      key_name: query.value
    })
  },
  handleFormBodyEdit (state, query) {
    const index = query.index
    state.formBody[index].key_name = query.value
  },
  handleFormDeleteOneLine (state, index) {
    state.formBody.splice(index, 1)
  },
  handleFormTitleChange (state, query) {
    state.formTitle.key_name = query.value
  },
  handleFormBottonChange (state, query) {
    state.formButton.key_name = query.value
  },
  handleFormItemInit (state, query) {
    if (query) {
      state.formTitle = query.title
      state.formBody = query.body
      state.formButton = query.button
    }
  },
  resetData (state) {
    state.formTitle = {
      type: 'title',
      key_name: '请填写标题'
    }
    state.formBody = [
      {
        type: 'key',
        key_name: '姓名'
      },
      {
        type: 'key',
        key_name: '手机'
      }
    ]
    state.formButton = {
      type: 'button',
      key_name: '提交'
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
