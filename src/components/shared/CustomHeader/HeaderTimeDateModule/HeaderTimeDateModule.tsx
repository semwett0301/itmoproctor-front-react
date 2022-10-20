import React, { FC, useEffect, useState } from 'react'
import cl from './HeaderTimeDateModule.module.scss'
import { IconCalendar } from '@consta/uikit/IconCalendar'
import { Text } from '@consta/uikit/Text'
import { IconWatch } from '@consta/uikit/IconWatch'
import { HeaderModule } from '@consta/uikit/Header'

const HeaderTimeDateModule: FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
  }, [])

  return (
    <>
      <HeaderModule indent={'m'} className={cl.headerTimeDateModule}>
        <IconWatch size={'m'} />
        <Text>{currentTime.toLocaleTimeString()}</Text>
      </HeaderModule>
      <HeaderModule indent={'m'} className={cl.headerTimeDateModule}>
        <IconCalendar size={'m'} />
        <Text>{currentTime.toLocaleDateString()}</Text>
      </HeaderModule>
    </>
  )
}

export default HeaderTimeDateModule
