/* eslint-disable import/no-commonjs */
const cloud = require('wx-server-sdk');
const fetch = require('node-fetch')

const api = require('./api').default
const { lotteryTypeMap } = require('./common').default;
const {
  formatMotionData,
  formatWelfareData
} = require('./utils').default


cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  let data = {}

  // 获取基础信息
  const wxContext = cloud.getWXContext();

  const { ids, type, payload } = event

  console.log(wxContext, event, context, api)

  const res = await api.getLotteryDetail(type, payload)
  data = await res.json()
  console.log(2222, res, data)

  if (lotteryTypeMap[type] === 'welfare') {
    data = {
      pageNo: data.pageNo,
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      total: data.total,
      list: formatWelfareData(type, data.result)
    }
  } else if (lotteryTypeMap[type] === 'motion') {
    data = {
      pageNo: data.value.pageNo,
      pageNum: data.value.pages,
      pageSize: data.value.pageSize,
      total: data.value.total,
      list: formatMotionData(type, data.value?.list)
    }
  }


  // const response = await Promise.all(
  //   ids.map(id => fetch(`https://api.6vzz.com/api/cpcx.php?lottery_id=${id}`).then(res => {
  //     return res.json()
  //   })))

  // const response21 = await fetch('https://api.6vzz.com/api/cpcx.php?lottery_id=dlt');
  // const data2 = await response21.json();

  // console.log(2222, data2)

  // const response = await fetch('https://danjuanfunds.com/djapi/index_eva/dj');
  // const data = await response.json();

  // const data = response
  // console.log(3333, response)

  return data;
};
