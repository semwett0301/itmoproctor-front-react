import React, { FC, useEffect, useState } from 'react'
import { Header, HeaderLogin, HeaderLogo, HeaderModule } from '@consta/uikit/Header'
import logo from '../../../mockData/logos/Group_12df.svg'
import { Button } from '@consta/uikit/Button'
import userLogo from '../../../mockData/logos/UserLogo.png'
import { useLogout } from '../../../hooks/authHooks'
import { IconCalendar } from '@consta/uikit/IconCalendar'
import { Text } from '@consta/uikit/Text'
import cl from './CustomHeader.module.scss'
import { IconWatch } from '@consta/uikit/IconWatch'

const CustomHeader: FC = () => {
  const [isLogged] = useState<boolean>(true)
  const clickHandler = useLogout()

  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
  }, [])

  return (
    <Header
      leftSide={
        <>
          <HeaderModule>
            <HeaderLogo>
              <img src={logo} alt='LOGO' />
            </HeaderLogo>
          </HeaderModule>
        </>
      }
      rightSide={
        <>
          <HeaderModule indent={'m'} className={cl.timeDateModule}>
            <IconWatch />
            <Text>{currentTime.toLocaleDateString()}</Text>
          </HeaderModule>
          <HeaderModule indent={'m'} className={cl.timeDateModule}>
            <IconCalendar />
            <Text>{currentTime.toLocaleTimeString()}</Text>
          </HeaderModule>
          <HeaderModule indent='m'>
            <Button label='Выход' onClick={clickHandler} view={'secondary'} />
          </HeaderModule>
          <HeaderModule>
            <HeaderLogin
              isLogged={isLogged}
              personName='Наруто Удзумаки'
              personInfo='Хокаге'
              personStatus='available'
              personAvatarUrl={userLogo}
            />
          </HeaderModule>
        </>
      }
    />
  )
}

export default CustomHeader
