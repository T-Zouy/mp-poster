<template>
  <div class="form-container">
    <div class="input-box">
      <textarea
        v-model="value"
        type="text"
        :placeholder="placeholder"
        :maxlength="maxLength"
        @confirm="handleFormLineSave($event)"
        placeholder-style="font-weight: 400" />
    </div>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  const { mapState, mapMutations } = createNamespacedHelpers('form')

  export default {
    data () {
      return {
        value: '',
        type: '',
        status: '',
        index: null,
        placeholder: '请输入字段名，限4个汉字',
        maxLength: 4
      }
    },

    computed: mapState([
      'formTitle',
      'formBody',
      'formButton'
    ]),

    methods: {
      ...mapMutations({
        addOneLine: 'handleFormAddOneLine',
        editTitle: 'handleFormTitleChange',
        editBody: 'handleFormBodyEdit',
        editSubmit: 'handleFormBottonChange'
      }),
      handleDefaultValue () {
        if (this.status === 'edit') {
          if (this.type === 'title') {
            this.value = this.formTitle.key_name
          } else if (this.type === 'submit-btn') {
            this.value = this.formButton.key_name
          } else {
            this.value = this.formBody[this.index].key_name
          }
        } else {
          this.value = ''
        }
      },
      promiseCreator (fn, query) {
        return new Promise((resolve, reject) => {
          fn(query)
          resolve()
        }).then(() => {
          this.value = ''
          console.log('路由跳转')
          wx.navigateBack()
        })
      },
      handleFormLineSave (event) {
        const value = event.target.value
        if (!value) {
          wx.showToast({
            title: '请输入字段名',
            icon: 'none'
          })
          return
        }
        if (this.type === 'title') {
          this.promiseCreator(this.editTitle, {value})
        } else if (this.type === 'submit-btn') {
          this.promiseCreator(this.editSubmit, {value})
        } else {
          if (this.status === 'add') {
            this.promiseCreator(this.addOneLine, {value})
          } else {
            this.promiseCreator(this.editBody, {value, index: this.index})
          }
        }
      }
    },

    beforeMount () {
      const { type, status, index } = this.$route.query
      this.type = type
      this.status = status
      this.index = index
      if (type === 'title') {
        this.placeholder = '请输入标题，限20个汉字'
        this.maxLength = 20
      } else {
        this.placeholder = '请输入标题，限4个汉字'
        this.maxLength = 4
      }
      this.handleDefaultValue()
    }
  }
</script>

<style>
  .form-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
    padding: 0 17px 70px;
    background: #353D41;
  }
  .input-box {
    display:flex;
    justify-content:center;
    margin: 100px auto;
    text-align: center;
  }
  .input-box textarea {
    font-size: 18px;
    color: #fff;
  }
</style>
