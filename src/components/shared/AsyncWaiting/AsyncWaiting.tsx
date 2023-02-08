import React, {FC} from 'react'
import {ProgressSpin} from '@consta/uikit/ProgressSpin'
import {Loader} from '@consta/uikit/Loader'
import cl from './AsyncWaiting.module.scss'

type AsyncWaitingProps = {
  size: 's' | 'm'
  value: unknown
  mode: 'spin' | 'loader'
  children: React.ReactNode
}

const AsyncWaiting: FC<AsyncWaitingProps> = ({ size, value, mode, children }) => {
  if (value) {
    return <div>{children}</div>
  } else {
    if (mode === 'spin') {
      return (
        <div className={cl.loaderWrapper}>
          <ProgressSpin size={size} />
        </div>
      )
    }

    return (
      <div className={cl.loaderWrapper}>
        <Loader size={size} />
      </div>
    )
  }
}

export default AsyncWaiting
