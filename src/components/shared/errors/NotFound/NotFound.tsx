import React, {FC} from 'react'
import {Responses404} from '@consta/uikit/Responses404'
import cl from './NotFound.module.scss'
import {Button} from '@consta/uikit/Button'
import {useNavigate} from 'react-router-dom'

const NotFound: FC = () => {
  const navigate = useNavigate()
  return (
    <div className={cl.wrapper}>
      <Responses404
        size={'l'}
        actions={<Button label={'На главную'} onClick={() => navigate('/')} />}
      />
    </div>
  )
}

export default NotFound
