import React, { FC } from 'react'
import { ProgressSpin } from '@consta/uikit/ProgressSpin'
import { useAppSelector } from '../../../hooks/reduxHooks'

const Loading: FC = () => {
  const isLoading = useAppSelector((state) => state.isLoading)

  if (!isLoading) {
    return <></>
  }

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
    >
      <ProgressSpin animation size='xl' />
    </div>
  )
}

export default Loading
