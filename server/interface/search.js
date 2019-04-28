import Router from 'koa-router'
import Axios from './utils/axios'
import Poi from '../dbs/models/poi'

const router = new Router({
  prefix: '/search'
})

const sign = 'abcd'
router.get('/top', async (ctx) => {
  let { status, data: { top } } = await Axios.get('http://cp-tools.cn/search/top', {
    parmas: {
      input: ctx.query.input,
      city: ctx.query.city,
      sign: sign
    }
  })
  global.console.log(await Axios.get('http://cp-tools.cn/search/top'))
  ctx.body = {
    top: status === 200 ? top: []
  }
})

export default router