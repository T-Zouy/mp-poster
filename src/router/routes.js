// 我的-相关页面
const routesMine = require('./routes-mine')
// 组件
const routesModule = require('./routes-module')

module.exports = [
  ...routesMine,
  ...routesModule,
  {
    path: 'pages/create/templates',
    config: {
      navigationBarTitleText: '海草报名'
    }
  }, {
    path: 'pages/signup/main',
    config: {
      navigationBarTitleText: '我创建的报名'
    }
  }, {
    path: 'pages/signup/applyList',
    config: {
      navigationBarTitleText: '报名数据'
    }
  }, {
    path: 'pages/create/pictureStore',
    config: {
      navigationBarTitleText: '选择背景图',
      navigationBarTextStyle: 'white',
      navigationBarBackgroundColor: '#333'
    }
  }, {
    path: 'pages/create/pictureClip',
    config: {
      navigationBarTitleText: '裁剪图片',
      navigationBarTextStyle: 'white',
      navigationBarBackgroundColor: '#333'
    }
  }, {
    path: 'pages/create/components',
    config: {
      navigationBarTitleText: '插入组件',
      navigationBarTextStyle: 'white',
      navigationBarBackgroundColor: '#333'
    }
  }, {
    path: 'pages/profile/mine',
    config: {
      navigationBarTitleText: '我的',
      disableScroll: true
    }
  }, {
    path: 'pages/poster/edit',
    config: {
      navigationBarTitleText: '轻触图片修改',
      disableScroll: true
    }
  }, {
    path: 'pages/form/add',
    config: {
      navigationBarTitleText: '请设置扫码后页面'
    }
  }, {
    path: 'pages/form/detail',
    config: {
      navigationBarTitleText: '海草报名'
    }
  }, {
    path: 'pages/form/signup-success',
    config: {
      navigationBarTitleText: '海草报名'
    }
  }, {
    path: 'pages/form/signup-close',
    config: {
      navigationBarTitleText: '海草报名'
    }
  }, {
    path: 'pages/form/label-edit',
    config: {
      navigationBarTitleText: '添加表单字段'
    }
  }, {
    path: 'pages/poster/text-input',
    config: {
      navigationBarTitleText: '编辑文字',
      disableScroll: true
    }
  }
]
