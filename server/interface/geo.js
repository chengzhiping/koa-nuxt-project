import Router from 'koa-router'
import Axios from './utils/axios'
import Province from '../dbs/models/province'
import City from '../dbs/models/city'
import Menu from '../dbs/models/menu';

const router = new Router({
  prefix: '/geo'
})

router.get('/getPosition', async (ctx) => {
  // let { status, data: { province, city } } = await Axios.get(`http://api.map.baidu.com/location/ip?ak=qoyq79dDBN5xWCVBu780iH727gp1Mp78&callback=showLocation`)
  let {
    status,
    data: {
      content: {
        address_detail: {
          province,
          city
        }
      }
    }
  } = await Axios.get(`http://api.map.baidu.com/location/ip?ak=qoyq79dDBN5xWCVBu780iH727gp1Mp78`)
  if (status === 200) {
    ctx.body = {
      code: 0,
      province,
      city
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请求城市失败',
      province: '',
      city: ''
    }
  }
})

router.get('/province', async (ctx) => {
  let province = await Province.find()
  global.console.log('---', province)
  ctx.body = {
    province: province.map(item => {
      return {
        id: item.id,
        name: item.value[0]
      }
    })
  }
})

router.get('/province/:id', async (ctx) => {
  let city = await City.findOne({id: ctx.params.id})
  ctx.body = {
    code: 0,
    city: city.value.map(item => {
      return {
        province: item.province,
        id: item.id,
        name: item.name
      }
    })
  }
})

router.get('/city', async (ctx) => {
  let city = []
  let result = await City.find()
  result.forEach(item => {
    city = city.concat(item.value)
  })
  ctx.body = {
    code: 0,
    city: city.map(item => {
      return {
        province: item.province,
        id: item.id,
        name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
          ? item.province
          : item.name
      }
    })
  }
})
router.get('/menu', async (ctx) => {
  const result = await Menu.findOne()
  ctx.body = {
    menu: result.menu
  }
})
export default router
