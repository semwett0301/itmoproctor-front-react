import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { IconRestart } from '@consta/uikit/IconRestart'
import { IconInfo } from '@consta/uikit/IconInfo'
import { Card } from '@consta/uikit/Card'
import cl from './SidebarFooter.module.scss'

const SidebarFooter: FC = () => {
  return (
    <div className={cl.sideFooter}>
      <NavLink to={'/update'} className={cl.link}>
        <Card
          horizontalSpace='xs' // {isOpen ? 'xs' : 'm'}
          verticalSpace='xs'
          shadow={false}
          className={cl.linkContent}
        >
          <div className={cl.linkIcon}>
            <IconRestart size='xs' />
          </div>
          Обновления
        </Card>
      </NavLink>

      <NavLink to={'/info'} className={cl.link}>
        <Card
          horizontalSpace='xs' // {isOpen ? 'xs' : 'm'}
          verticalSpace='xs'
          shadow={false}
          className={cl.linkContent}
        >
          <div className={cl.linkIcon}>
            <IconInfo size='xs' />
          </div>
          О системе
        </Card>
      </NavLink>
    </div>
  )
}

export default SidebarFooter
