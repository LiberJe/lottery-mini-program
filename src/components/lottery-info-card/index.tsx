/* eslint-disable react/react-in-jsx-scope */
import { View, Text } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import style from './style.module.css'

export default function Index() {

  useLoad(() => {
    
  })

  return (
    <View className={style.container}>

      <View className={style.topWrap}>
        <View className={style.lotteryType}>
          <Text>双色球</Text>
          <Text>2023209期</Text>
        </View>
        <View className={style.resultTime}>
          <Text>2023-09-19 | 星期二</Text>
        </View>
      </View>

      <View className={style.middleWrap}></View>

      <View className={style.bottomWrap}>
        <View className={style.openTime}>
          <Text>每周一、三、六开奖</Text>
        </View>
        <View className={style.bonusAmount}>
          <Text>奖池</Text>
          <Text>7.35亿</Text>
        </View>
      </View>
    </View>
  )
}
