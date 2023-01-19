import React, { FC } from 'react'
import { Text } from '@consta/uikit/Text'
import classes from './Logo.module.scss'
import axiosConfig from '../../../config/axiosСonfig'

const Logo: FC = () => {
  return (
    <div
      className={classes.logo}
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: 172,
        height: 148
      }}
    >
      <img
        style={{ width: 100, height: 100 }}
        src={axiosConfig.baseUrl + 'images/logo-128x116.png'}
        alt={'Логотип'}
      />
      <Text className={classes.text} view={'linkMinor'} size={'2xl'} weight={'bold'}>
        ITMOproctor
      </Text>
    </div>
  )
}

export default Logo
