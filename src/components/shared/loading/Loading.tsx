import React, { FC } from 'react'
import { ProgressSpin } from '@consta/uikit/ProgressSpin'

const Loading: FC = () => {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <ProgressSpin animation size='xl' />
    </div>
  )
}

export default Loading
