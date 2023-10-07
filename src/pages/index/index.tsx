/* eslint-disable import/first */
/* eslint-disable react/react-in-jsx-scope */
import { View, Text, Icon } from '@tarojs/components'
import Taro, { useLoad, useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import { useState, useEffect, useMemo, Fragment } from 'react'
import style from './style.module.css'

import LotteryInfoCard from '@/components/lottery-info-card'
import Loading from '@/components/loading'

export default function Index() {


  const [initData, setInitData] = useState<any>([])
  const [loading, setLoading] = useState(true)

  useLoad(() => {
    console.log('Page loaded.')

    Taro.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getLotteryInfo',
        // 传递给云函数的event参数
        data: {
          // ids: ["ssq", "sd", "pls", "plw", "qlc", "dlt", "qxc"],
          funcName: 'getBatchLotteryDetail',
          params: {
            // type: 'dlt',
            // payload: {},
          }
        }
      }).then(res => {
        console.log(1111,res)
        setInitData(res.result)
        setLoading(false)
        // output: res.result === 3
      }).catch(err => {
        // handle error
        Taro.showToast({
          icon: 'none',
          title: '服务异常，请稍后再试~'
        })
      })
  })

  useShareAppMessage((res) => {
    return {
      title: '天天有彩',
      path: '/pages/index/index',
    }
  })

  useShareTimeline(() => {
    console.log('onShareTimeline')
    return {
      title: '天天有彩',
      path: '/pages/index/index',
    }
  })

  return (
    <View className={style.container}>
      
      {
        loading
          ? <Loading show={loading} />
          : <Fragment>
              <View className={style.content}>
                {
                  initData.map((item, i) => {
                    return <View key={i} className={style.cardItemWrapper}>
                      <LotteryInfoCard data={item} />
                    </View>
                  })
                }
              </View>
              <View className={style.bottomWrap}>
                <Text className={style.bottomTips}>开奖相关数据均来自于中国福彩网(http://www.cwl.gov.cn/)、中国体彩网(https://www.lottery.gov.cn/)</Text>
              </View>
            </Fragment>
      }
      

      
    </View>
  )
}
