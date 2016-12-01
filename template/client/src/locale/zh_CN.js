export default {
  el: {
    select: {
      noData: '无匹配数据'
    }
  },
  config: {
    title: 'xxx 后台管理系统',
    description: '描述'
  },
  message: {
    save: {
      ok: '已保存！',
      err: '保存失败！'
    },
    confirm: {
      ok: '确 定',
      cancel: '取 消'
    }
  },
  http: {
    error: {
      E401: '身份认证失败',
      E404: '请求路径错误',
      E500: '后台错误',
      others: '操作失败，请重试'
    }
  },
  header: {
    settings: '用户设置',
    password: '修改密码',
    logout: '退出',
    localeSetting: '语言',
    pageLimit: '每页条目数',
    _password: {
      description: '修改你的密码。强烈建议您选择一个复杂密码。',
      old: '旧密码',
      _new: '新密码',
      newConfirm: '确认新密码',
      rules: {
        old: '请输入旧密码',
        _new: '请输入新密码',
        newConfirm: '请再次确认新密码',
        notMatch: '两次输入的新密码不一致'
      },
      afterChange: '密码已修改，将自动退出，请使用新密码重新登录。'
    }
  },
  menu: {
    users: '用户管理',
    things: '事件管理'
  },
  pagination: {
    current: '当前第',
    currentAppend: '页',
    pages: '共',
    pagesAppend: '页'
  },
  login: {
    username: '请输入用户名',
    password: '请输入密码',
    button: '登录'
  }
}
