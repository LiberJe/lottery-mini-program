import { PropsWithChildren } from 'react'
import Taro, { useLaunch } from '@tarojs/taro'
import './app.styl'

function App({ children }: PropsWithChildren<any>) {

  useLaunch(() => {
    console.log('App launched.')

    Taro.cloud.init({
      env: 'lottery-3g6ly09a38cb3b01'
    })
  })

  // children 是将要会渲染的页面
  return children
}

export default App
