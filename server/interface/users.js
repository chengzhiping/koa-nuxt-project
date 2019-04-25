import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodemailer'
import User from '../dbs/models/users'
import Email from '../dbs/config'
import Passport from './utils/passport'
import Axios from './utils/axios'

const router = new Router({
  prefix: '/users'
})

const Store = new Redis().client

router.post('/signup', async (ctx) => {
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body
  if (code) {
    const saveCode = await Store.hget(`nodemail: ${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
    if (code === saveCode) {
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }
  const user = await User.find({
    username
  })
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: '已被注册'
    }
    return
  }
  const newUser = await User.create({
    username,
    password,
    email
  })
  if (newUser) {
    let res
    try {
      res = await Axios.post('/users/signin', {
        username,
        password
      })
    } catch (error) {
      global.console.log('***', error)
    }
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: '注册成功',
        user: res.data.user
      }
    } else {
      ctx.body = {
        code: -1,
        msg: 'error'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})

router.post('/signin', (ctx, next) => {
  return Passport.authenticate('local', (err, user, info, status) => {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else if (user) {
      ctx.body = {
        code: 0,
        msg: '登录成功',
        user
      }
      global.console.log('登录成功', user)
      return ctx.login(user)
    } else {
      global.console.log('登录异常', info)
      ctx.body = {
        code: 1,
        msg: info
      }
    }
  })(ctx, next)
})

router.post('/verify', async (ctx, next) => {
  const username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证请求过于频繁，1分钟内1次'
    }
    return false
  }
  const transporter = nodeMailer.createTransport({
    host: Email.stmp.host,
    port: 587,
    secure: false,
    auth: {
      user: Email.stmp.user,
      pass: Email.stmp.pass
    }
  })
  const ko = {
    code: Email.stmp.code(),
    expire: Email.stmp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }
  global.console.log('验证码', ko.code)
  const mailOpts = {
    from: `认证邮件<${Email.stmp.user}>`,
    to: ko.email,
    subject: '您的注册码如下',
    html: `您的邀请码${ko.code}`
  }
  await transporter.sendMail(mailOpts, (error, info) => {
    if (error) {
      return global.console.log('发送邮件失败', error)
    } else {
      Store.hmset(`nodemail: ${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
    }
  })
  ctx.body = {
    code: 0,
    msg: `验证码已发送到${ctx.request.body.email},有效期1分钟`
  }
})

router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0,
      msg: '退出成功'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '退出失败'
    }
  }
})

router.get('/getUser', (ctx) => {
  if (ctx.isAuthenticated()) {
    const {
      username,
      email
    } = ctx.session.passport.user
    ctx.body = {
      user: username,
      email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

export default router
