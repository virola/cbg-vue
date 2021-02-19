<template>
  <div>
    <table aria-describedby="info">
      <tr v-for="(item, key) in info" :key="key">
        <th>{{ATTR_MAP[key]}}</th>
        <td><span v-if="key == 'icon'"><img width="50" height="50" :src="'https://cbg-mrzh.res.netease.com' + item" alt=""></span><span v-else>{{item}}</span></td>
      </tr>
    </table>
    <div>
      <h2>equip_desc</h2>
      <van-collapse v-model="activeNames">
        <van-collapse-item title="基础信息" name="1">
          <h4>basic_info</h4>
          <div><strong>{{config.special_prof_data[basic_info.special_prof_id + '_' + basic_info.special_prof_level].name}}</strong></div>
          <van-divider />

          <h4>庄园信息</h4>
          <table aria-describedby="basic_home_info">
            <tr>
              <th>key</th>
              <th>value</th>
            </tr>
            <tr v-for="(item, key) in desc.basic_home_info" :key="key">
              <td>{{ATTR_MAP[key] || key}}</td>
              <td>{{item}}</td>
            </tr>
          </table>
          <van-divider />
          <h4>basic_prof</h4>
          <table aria-describedby="basic_prof">
            <tr>
              <th>key</th>
              <th>value</th>
            </tr>
            <tr v-for="(item, key) in desc.basic_prof" :key="key">
              <td>{{PROF_MAP[item.prof_id]}}</td>
              <td>{{item.level}}</td>
            </tr>
          </table>
          <van-divider />
          <h4>basic_statistics</h4>
          <table aria-describedby="basic_statistics">
            <tr>
              <th>key</th>
              <th>value</th>
            </tr>
            <tr v-for="(item, key) in desc.basic_statistics" :key="key">
              <td>{{ATTR_MAP[key] || key}}</td>
              <td>{{item}}</td>
            </tr>
          </table>
          <van-divider />

          <h4>recipe_achive_info</h4>
          <table aria-describedby="recipe_achive_info">
            <tr>
              <th>key</th>
              <th>value</th>
            </tr>
            <tr v-for="(item, key) in desc.recipe_achive_info" :key="key">
              <td>{{key}} / {{config.recipe_achievement[item.kind].name}}</td>
              <td><div v-for="(tmp, tmpKey) in item" :key="tmpKey">{{tmpKey}}:{{tmp}}</div></td>
            </tr>
          </table>
          <van-divider />


        </van-collapse-item>
        <van-collapse-item title="货币与道具" name="2">
          <h4>money</h4>
          <table aria-describedby="money">
            <tr>
              <th>key</th>
              <th>value</th>
            </tr>
            <tr v-for="(item, key) in desc.money" :key="key">
              <td>{{MONEY_MAP[item.id]}}</td>
              <td>{{item.count}}</td>
            </tr>
          </table>
          <van-divider />
          <div>身上装备</div>
          equipped
          <table aria-describedby="equipped">
            <tr>
              <th>名字</th>
              <th>评分</th>
            </tr>
            <tr v-for="(item, key) in desc.equipped" :key="key">
              <td>{{config.all_equips_data[item.item_id].name}}</td>
              <td>
                <div>评分：{{item.score}} / 基础评分：{{item.base_score}}</div>
                <div>制作者：{{item._pn}}</div>
                <div>星级：{{item.slevel}}</div>
              </td>
            </tr>
          </table>
          all_equips_data
          <div>未装备</div>
          equips
          <table aria-describedby="equips">
            <tr>
              <th>名字</th>
              <th>评分</th>
            </tr>
            <tr v-for="(item, key) in desc.equips" :key="key">
              <td>{{config.all_equips_data[item.item_id].name}}</td>
              <td>
                <div>评分：{{item.score}} / 基础评分：{{item.base_score}}</div>
                <div>制作者：{{item._pn}}</div>
                <div>星级：{{item.slevel}}</div>
              </td>
            </tr>
          </table>
          <van-divider />
          <h4>building_objects</h4>
          <table aria-describedby="building_objects">
            <tr>
              <th>名字</th>
              <th>count</th>
            </tr>
            <tr v-for="(item, key) in desc.building_objects" :key="key">
              <td>{{config.building_object_data[`${item.item_id}_${item.level}`].name}}</td>
              <td>
                <div>{{item.count}}</div>
              </td>
            </tr>
          </table>
          <van-divider />
          <van-divider />
          building_object_data
        </van-collapse-item>
        <van-collapse-item title="配方" name="3">
          <p>=====配方折叠面板=====</p>
          <van-divider />
          <van-collapse v-model="activeRecipes">
            <van-collapse-item v-for="(list, key) in recipes" :key="key" :title="`recipes：${key}`" :name="key">
              <table aria-describedby="recipes">
                <tr>
                  <th>名字</th>
                  <th>评分</th>
                </tr>
                <tr v-for="(item, index) in list" :key="index">
                  <td>{{item.name}}</td>
                  <td>
                    <div>ui_type / {{item.ui_type}} / {{config.recipe_ui_type_name[item.ui_type]}}</div>
                    <div v-if="item._uc > 0">_uc：{{item._uc}}</div>
                    <div v-if="item.score">评分：{{item.score}} / <span v-if="item._rl">进阶：{{item._rl}}</span></div>
                    <div v-if="item.score">
                      <div v-for="(tmp, j) in item.attrs" :key="j">{{tmp[0]}}：{{tmp[1]}}</div>
                    </div>
                  </td>
                </tr>
              </table>
            </van-collapse-item>
          </van-collapse>
          <van-divider />
        </van-collapse-item>
        <van-collapse-item title="无人机" name="drones">
          <h4>无人机</h4>
          <table aria-describedby="drones">
            <tr>
              <th>名字</th>
              <th>-</th>
            </tr>
            <tr v-for="(item, key) in drones" :key="key">
            <td>{{config.all_equips_data[item.item_id].name}}</td>
            <td>
              <div>is_rare / {{item.is_rare}}</div>
              <div v-if="item.custom_name">{{item.custom_name}}</div>
              <div>
                <p>modules</p>
                <ul>
                  <li v-for="(mod, mIndex) in item.modules" :key="mIndex">
                    {{config.all_equips_data[mod.item_id].name}} / 制作者：{{mod._pn}} /
                  </li>
                </ul>
              </div>
            </td>
          </tr>
          </table>
        </van-collapse-item>
        <van-collapse-item title="时装" name="4">
          <h4>fashions</h4>
          <table aria-describedby="fashions">
            <tr>
              <th width="120">名字</th>
              <th>count</th>
            </tr>
            <tr v-for="(item, key) in fashions" :key="key">
            <td>
              <div>{{item.fashion.name}}</div>
            </td>
            <td>
              <strong v-if="item.present_name">礼物From：{{item.present_name}}</strong>
              <div>{{item.fashion.desc}}</div>
              <div>{{item.time}}</div>
            </td>
          </tr>
          </table>
          <van-divider />
          <h4>vehicles</h4>
          <table aria-describedby="vehicles">
            <tr>
              <th>名字</th>
              <th>obtain_time</th>
            </tr>
            <tr v-for="(item, key) in vehicles" :key="key">
            <td>{{config.all_equips_data[item.item_id].name}}</td>
            <td>
              <div>{{item.obtain_time * 1000 | dateformat}}</div>
            </td>
          </tr>
          </table>
        </van-collapse-item>
        <van-collapse-item title="配件" name="accessories">
          <h4>配件</h4>
          <table aria-describedby="accessories" v-for="(item, key) in accessories" :key="key">
            <tr>
              <th width="120">{{key}}</th>
              <th>-</th>
            </tr>
            <tr v-for="(one, index) in item" :key="index">
              <td>
                <div>{{one.name}}</div>
              </td>
              <td>
                {{one.level}}阶 / 等级： {{one._lv}}
              </td>
            </tr>
          </table>
        </van-collapse-item>
        <van-collapse-item title="hiddens" name="5">
          <h4>hiddens</h4>
          <table aria-describedby="hiddens">
            <tr>
              <th>名字</th>
              <th>count</th>
            </tr>
            <tr v-for="(item, key) in desc.hiddens" :key="key">
            <td>{{config.common_item_data[item.id].name}}</td>
            <td>
              <div>{{item.count}}</div>
            </td>
          </tr>
          </table>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import config from '@/data/game_config'
import dayjs from 'dayjs'
// { all_equips_data }

const ATTR_MAP = {
  level_desc: '等级',
  create_time_desc: '上架时间',
  fair_show_end_time: '公示结束时间',
  collect_num: '收藏数',
  allow_multi_order: '允许分期付款',
  highlights: '标签',
  desc_sumup_short: '简介',
  icon: '头像',
  server_name: '服务器',
  seller_name: '角色名',
  first_onsale_price: '首次上架价格',
  web_last_price: '最后价格',
  price: '价格',
  expire_time: '下架时间',
  allow_bargain: '允许还价',
  serverid: 'serverid',
  eid: 'eid'
}

const PROF_MAP = {
  1: '采集',
  2: '制作',
  3: '战斗',
  34: '病毒'
}

const MONEY_MAP = {
  150068: '技能点',
  150003: '信用点',
  150005: '新币',
  150004: '金条'
}

const BUILDING_OBJECT_MAP = {}
for (const key in config.building_object_data) {
  if (config.building_object_data.hasOwnProperty(key)) {
    const tmp = config.building_object_data[key]
    BUILDING_OBJECT_MAP[tmp.item_id] = tmp.name
  }
}

/**
 * 角色展示卡片
 */
export default {
  name: 'role-card',
  props: [ 'data' ],
  data () {
    return {
      config,
      ATTR_MAP,
      PROF_MAP,
      MONEY_MAP,
      info: {},
      desc: {},
      activeNames: [ '4' ],
      BUILDING_OBJECT_MAP,
      recipes: [],
      activeRecipes: [],
      hiddens: [],
      fashions: [],
      // 配件
      accessories: [],
      drones: [],
      vehicles: [],
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      if (!this.data) {
        console.warn('需要初始化展示数据，请设定组件的 props: `data` ')
        return false
      }

      const Data = this.data
      const data = {}
      for (const key in Data.equip) {
        if (Data.equip.hasOwnProperty(key) && ATTR_MAP[key]) {
          data[key] = Data.equip[key]
          if (key.indexOf('price') > -1) {
            data[key] = (Data.equip[key] / 100).toFixed(2)
          }
        }
      }
      this.info = data
      this.getDesc(Data)
    },
    getDesc(Data) {
      const desc = JSON.parse(Data.equip.equip_desc)
      this.desc = desc
      // accessories 配件
      // drones 无人机
      // vehicles 载具
      const { money, basic_info, basic_home_info, basic_prof, recipes, hiddens, accessories, fashion, drones, vehicles } = desc
      this.recipes = this.getRecipes(recipes)
      hiddens.sort((a, b) => {
        return b.count - a.count
      })
      this.basic_info = basic_info
      this.hiddens = hiddens
      this.fashions = this.getFashion(fashion)
      this.accessories = this.getAccess(accessories)
      this.drones = drones
      this.vehicles = vehicles
    },

    // 配方图谱
    getRecipes(list) {
      // type: 1 - 武器， 3 - 护甲，10 - 建筑
      const result = []
      const weapons = []
      const cloths = []
      const builds = []
      const others = []
      const xinpian = []
      list.forEach(item => {
        const conf = config.recipe[item._id]
        const tmp = {
          ...conf,
          ...item
        }

        switch (conf.ui_type) {
          case 1:
            weapons.push(tmp)
            break
          case 512:
            cloths.push(tmp)
            break
          case 16:
            // 建筑配方
            builds.push(tmp)
            break
          case 32768:
            xinpian.push(tmp)
            break
          default:
            // 无人机芯片
            // if (conf.ui_type == 32768) {
            //   console.log(tmp, conf)
            // }
            others.push(tmp)
            break;
        }
        result.push(tmp)
      })
      result.sort((a, b) => {
        return a.ui_type - b.ui_type
      })
      // 评分排序
      weapons.sort((a, b) => {
        return b.score - a.score
      })
      cloths.sort((a, b) => {
        return b.score - a.score
      })
      builds.sort((a, b) => {
        return b._id - a._id
      })
      others.sort((a, b) => {
        return b.score - a.score
      })
      return { weapons, cloths, builds, xinpian, others }
    },

    // 时装
    getFashion(fashion) {
      const { appears, fashions, init_appears } = fashion
      // appear_id , config.appear_id_2_fashion_id, config.fashion_data
      // 366167
      const list = []
      fashions.forEach(item => {
        const fid = config.appear_id_2_fashion_id[item.appear_id]
        const tmp = config.fashion_data[fid]
        list.push({
          fashion: tmp,
          ...item,
          time: dayjs(new Date(item.obtain_time * 1000)).format('YYYY/MM/DD HH:mm:ss')
        })
      })
      list.sort((a, b) => {
        return b.obtain_time - a.obtain_time
      })

      return list
    },

    // 配件列表
    getAccess(list = []) {
      const target = [ '握柄', '挂穗', '雕饰', '枪口', '枪托', '瞄具', '钢板',  '链式', '棉絮' ]
      const result = []
      list.forEach(item => {
        const conf = config.all_equips_data[item.item_id]
        // console.log(conf)
        result.push({
          ...item,
          ...conf
        })
      })
      result.sort((a, b) => {
        return b.suit_type - a.suit_type
      })

      // 分类
      const dataMap = {}
      target.forEach(key => {
        dataMap[key] = result.filter(item => item.name.indexOf(key) > -1)
      })

      return dataMap
    }
  }
}

</script>
