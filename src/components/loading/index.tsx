/* eslint-disable jsx-quotes */
/* eslint-disable react/react-in-jsx-scope */
import { View, Text, Image } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { useState, useEffect, useMemo } from 'react'
import style from './style.module.css'


export default function Index(props) {

  const { show = true } = props



  useLoad(() => {
    
  })


  if (!show) return null

  return (
    <View className={style.container}>
      <Image
        style='width: 100rpx;height: 100rpx;'
        // src='../../assets/loading.png'
        src="cloud://lottery-3g6ly09a38cb3b01.6c6f-lottery-3g6ly09a38cb3b01-1315013144/loading.png"
      />
    </View>
  )
}
