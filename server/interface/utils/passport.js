import Passport from 'koa-passport'
import LocaStrategy from 'passport-local'
import UserModel from '../../dbs/models/users'

Passport.use(new LocaStrategy(async (username, password, done) => {
  const where = {
    username
  }
  const result = await UserModel.findOne(where)
  if (result != null) {
    if (result.password === password) {
      return done(null, result)
    } else {
      return done(null, false, '密码错误')
    }
  } else {
    return done(null, false, '用户不存在')
  }
}))

// 序列化
Passport.serializeUser((user, done) => { // 查到用户登录成功之后，存到session
  done(null, user)
})

// 反序列化
Passport.deserializeUser((user, done) => { // 每次请求，从session中读取用户对象
  return done(null, user)
})

export default Passport
