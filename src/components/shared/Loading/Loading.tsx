import React, {FC} from 'react'
import cn from './Loading.module.scss'
import {Loader} from '@consta/uikit/Loader'

const Loading: FC = () => {
  return (
    <div className={cn.wrapper}>
      <Loader size='m' />
    </div>
  )
}

export default Loading
