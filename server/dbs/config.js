// mongodb域名端口配置
export default {
  'dbs': 'mongodb://127.0.0.1:27017/student',
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return 6379
    }
  },
  stmp: {
    get host() { // 腾讯邮箱主机
      return 'smtp.qq.com'
    },
    get user() { // 发送邮件的邮箱
      return '724495690@qq.com'
    },
    get pass() { // 邮箱授权码
      return 'wrgvwlwxblbibcib'
    },
    get code() { // 生成验证码
      return () => {
        return Math.random().toString(16).slice(2, 6).toUpperCase()
      }
    },
    get expire() { // 验证码过期时间
      return () => {
        return new Date().getTime() + 60 * 60 * 1000
      }
    }
  }
}
