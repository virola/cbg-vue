/**
 * 写个脚本拉取明日之后藏宝阁的角色数据
 */
const axios = require('axios')
const waterfall = require('async/waterfall')
const fs = require('fs')
const path = require('path')
const FormData = require('form-data')

const URL_LIST = 'https://mrzh.cbg.163.com/cgi/api/query?view_loc=search_cond&search_type=role&order_by='
const URL_DETAIL = 'https://mrzh.cbg.163.com/cgi/api/get_equip_detail'

// 服务器ID
const SERVER_ID = {
  // 115: '格莱普堡',
  // 120: '鲁美尔河',
  // 121: '卢斯半岛',
  // 122: '圣纳古堡',
  9: '\u6602\u7279\u96f7\u7701',
  10: '\u5c24\u62c9\u5a1c\u5c9b',
  11: '\u9b42\u715e\u53e4\u57ce',
  12: '\u591a\u535a\u90a3\u533a',
  37: '\u8d1d\u9a6c\u4f26\u5c71',
  7: '\u63d0\u6ee8\u6d77\u5cb8',
}

// 查询参数配置
// 最大金额 元
const MAX_PRICE = 1000
const MIN_LEVEL = 18
const MAX_LEVEL = ''

function ServerModule(serverid) {
  this.serverid = serverid
  this.page = 1
  this.result = []
}

ServerModule.prototype.getList = function(success, fail) {
  const _me = this
  axios({
    url: URL_LIST,
    /**
     * 查询参数设置
     */
    params: {
      basic_home_info__level_min: MIN_LEVEL,
      basic_home_info__level_max: MAX_LEVEL,
      price_max: MAX_PRICE * 100,
      serverid: _me.serverid,
      page: _me.page
    }
  })
    .then(res => {
      const data = res.data
      if (data.status == 1) {
        const is_last_page = data.paging.is_last_page
        _me.result = _me.result.concat(
          data.result.map(item => {
            return {
              serverid: item.serverid,
              game_ordersn: item.game_ordersn,
              name: item.format_equip_name,
              server_name: item.server_name
            }
          })
        )
        if (!is_last_page) {
          _me.page++
          _me.getList(success)
        } else {
          // 查询完成了，就生成列表
          success(_me.result)
        }
      } else {
        if (fail) {
          fail()
        }
      }
    })
    .catch(err => {
      console.log(err)
      if (fail) {
        fail()
      }
    })
}

// function getDetail(params, callback) {
//   console.log(params)

//   const filepath = path.join(__dirname, `./detail/${params.ordersn}.json`)
//   const formData = new FormData()
//   const prs = []
//   Object.keys(params).forEach(key => {
//     formData.append(key, `${params[key]}`)
//     prs.push(`${key}=${params[key]}`)
//   })
//   prs.join('&')
//   // From axios docs: In Node.js environment you need to set boundary in the header field 'Content-Type' by calling method `getHeaders`
//   const formHeaders = formData.getHeaders()
//   axios({
//     url: URL_DETAIL,
//     method: 'post',
//     data: formData,
//     // headers: {
//     //   ...formHeaders
//     // }
//   })
//     .then(res => {
//       const data = res.data
//       console.log(data.status)
//       if (data.status == 1) {
//         fs.writeFileSync(filepath, JSON.stringify(data))
//         console.log('已保存：' + params.ordersn)
//       } else {
//         console.log(data.msg || data)
//       }
//       callback && callback(null, data)
//     })
//     .catch(err => {
//       console.log(err)
//       callback && callback(err)
//     })
// }

// function getDetailFromFiles() {
//   const tasks = []
//   const paths = fs.readdirSync(path.join(__dirname, './data'))
//   console.log(paths)
//   paths.forEach(filename => {
//     const content = fs.readFileSync(path.join(__dirname, `./data/${filename}`))
//     const list = JSON.parse(content)
//     // console.log(list)
//     list.forEach(item => {
//       tasks.push(function(done) {
//         console.log('开始执行：' + item.name)
//         getDetail(
//           {
//             serverid: item.serverid,
//             ordersn: item.game_ordersn
//           },
//           function(res) {
//             console.log('已完成' + item.name)
//             done(res)
//           }
//         )
//       })
//     })
//   })
//   // console.log(tasks)
//   waterfall(tasks, function(error, result) {
//     if (error) {
//       console.log('error:', error)
//     }
//     console.log(result)
//   })
// }

function getServerList() {
  const tasks = []
  for (const key in SERVER_ID) {
    const filepath = path.join(__dirname, `./data/${key}.json`)
    tasks.push(function(done) {
      console.log('开始执行', key)
      const server = new ServerModule(key)
      server.getList(result => {
        fs.writeFileSync(filepath, JSON.stringify(result))
        console.log('已完成：', key)
        done(result)
      })
    })
  }

  waterfall(tasks, function(error, result) {
    if (error) {
      console.log('error:', error)
    }
    console.log(result)
  })
}

function getServer(serverId, successCallback) {
  const filepath = path.join(__dirname, `./data/${serverId}.json`)
  console.log('开始执行', serverId)
  const server = new ServerModule(serverId)
  server.getList(result => {
    fs.writeFileSync(filepath, JSON.stringify(result))
    console.log('已完成：', serverId)
    if (successCallback) {
      successCallback(result)
    }
  }, err => {
    console.log(err)
  })
}

// getDetailFromFiles()
// getServerList()

getServer(10)

// test
// getDetail({ serverid: 115, ordersn: '202010060003316-115-8UUSDFM5F6MO' })
