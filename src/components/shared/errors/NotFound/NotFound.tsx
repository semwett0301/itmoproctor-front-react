import React, {FC} from 'react'
import {Responses404} from '@consta/uikit/Responses404'
import cl from './NotFound.module.scss'

const NotFound: FC = () => {
  return (
    <div className={cl.wrapper}>
      <Responses404 size={'l'} actions={<></>} />
    </div>
  )
}

export default NotFound
