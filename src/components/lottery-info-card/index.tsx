/* eslint-disable react/react-in-jsx-scope */
import { View, Text, Image } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState, useEffect, useMemo } from 'react'
import style from './style.module.css'

const dateMap = '日一二三四五六'.split('')

export default function Index(props) {

  const lastLottery = useMemo(() => {
    const data = props.data?.list?.[0]
    return data
  }, [props])

  const normalNums = useMemo(() => {
    return lastLottery.nums_1
  }, [lastLottery])

  const specialNums = useMemo(() => {
    return lastLottery.nums_2
  }, [lastLottery])

  const week = useMemo(() => {
    let date = new Date(lastLottery.date)
    let weekDay = date.getDay()
    return dateMap[weekDay]
  }, [lastLottery])

  const poolMoney = useMemo(() => {
    let formatNum = lastLottery.poolmoney.split(',').join('')
    return (+formatNum / 100000000).toFixed(2) + '亿'
  }, [lastLottery])

  useLoad(() => {
    
  })

  const onItemClick = () => {
    Taro.showToast({
      icon: 'none',
      title: '功能正在开发中，敬请期待~'
    })
  }

  return (
    <View className={style.container} onClick={onItemClick}>

      <View className={style.topWrap}>
        <View className={style.lotteryType}>
          <Text className={style.lotteryTypeName}>{lastLottery.name}</Text>
          <Text className={style.lotteryTypeSep}></Text>
          <Text className={style.lotteryNumber}>{lastLottery.code}期</Text>
        </View>
        <View className={style.resultTime}>
          <Text className={style.resultTimeText}>{lastLottery.date} | 星期{week}</Text>
        </View>
      </View>

      <View className={style.middleWrap}>
        <View className={style.numsWrap}>
          {
            normalNums.map((num, i) => {
              return <Text key={i} className={style.normalNumItem}>{num}</Text>
            })
          }
          {
            specialNums.map((num, i) => {
              return <Text key={i}  className={style.specialNumItem}>{num}</Text>
            })
          }
        </View>
        <View className={style.arrowWrap}>
          <Image
            style='width: 40rpx;height: 40rpx;'
            // src='../../assets/arrow-right.png'
            src="cloud://lottery-3g6ly09a38cb3b01.6c6f-lottery-3g6ly09a38cb3b01-1315013144/arrow-right.png"
          />
        </View>
        
      </View>

      <View className={style.bottomWrap}>
        <View className={style.openTime}>
          <Text>{lastLottery.rule}</Text>
        </View>
        <View className={style.bonusAmount}>
          <Text className={style.bonusAmountText1}>奖池:</Text>
          <Text className={style.bonusAmountText2}>{poolMoney}</Text>
        </View>
      </View>
    </View>
  )
}
