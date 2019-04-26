import Router from 'koa-router'
// import Redis from 'koa-redis'
// import nodeMailer from 'nodemailer'
// import User from '../dbs/models/users'
// import Email from '../dbs/config'
// import Passport from './utils/passport'
// import Axios from './utils/axios'

const router = new Router({
    prefix: '/geo'
})

router.get('/getPosition', (ctx) => {
  // let { status, data: { province, city } } = await Axios.get(`http://cp-tools.cn/geo/getPosition`)
    ctx.body = {
      code: 0,
      province: '广东省',
      city: '深圳市'
    }
  // if (status === 200) {
  //   ctx.body = {
  //     code: 0,
  //     province,
  //     city
  //   }
  // } else {
  //   ctx.body = {
  //     code: -1,
  //     msg: '请求城市失败',
  //     province: '',
  //     city: ''
  //   }
  // }
})
export default router