/* eslint-disable react/react-in-jsx-scope */
import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import style from './style.module.css'

import LotteryInfoCard from '@/components/lottery-info-card'

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')

    Taro.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getLotteryInfo',
        // 传递给云函数的event参数
        data: {
          ids: ["ssq", "sd", "pls", "plw", "qlc", "dlt", "qxc"],
          type: 'dlt',
          payload: {}
        }
      }).then(res => {
        console.log(1111,res)
        // output: res.result === 3
      }).catch(err => {
        // handle error
      })
  })

  return (
    <View className={style.container}>
      <Text>Hello world!</Text>
      <LotteryInfoCard />
    </View>
  )
}
