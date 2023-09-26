/* eslint-disable import/no-commonjs */
const cloud = require('wx-server-sdk');
const fetch = require('node-fetch')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

// 获取openId云函数入口函数
exports.main = async (event, context) => {
  // 获取基础信息
  const wxContext = cloud.getWXContext();

  const { ids } = event

  console.log(wxContext, event, context)


  const response = await Promise.all(
    ids.map(id => fetch(`https://api.6vzz.com/api/cpcx.php?lottery_id=${id}`).then(res => {
      return res.json()
    })))

  // const response21 = await fetch('https://api.6vzz.com/api/cpcx.php?lottery_id=dlt');
  // const data2 = await response21.json();

  // console.log(2222, data2)

  // const response = await fetch('https://danjuanfunds.com/djapi/index_eva/dj');
  // const data = await response.json();

  const data = response
  console.log(3333, response)

  return data;
};
