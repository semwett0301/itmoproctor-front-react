import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { IconInfo } from '@consta/uikit/IconInfo'
import { Card } from '@consta/uikit/Card'
import cl from './SidebarFooter.module.scss'
import { IconRing } from '@consta/uikit/IconRing'
import { Button } from '@consta/uikit/Button'

const SidebarFooter: FC = () => {
  return (
    <Card horizontalSpace='s' shadow={false} className={cl.sidebarFooter}>
      <NavLink to={'/update'} className={cl.link}>
        <IconInfo size='xs' />
        Обновления
        <Button
          onlyIcon={true}
          iconRight={IconRing}
          size={'xs'}
          view={'clear'}
          className={cl.ringButton}
        />
      </NavLink>
    </Card>
  )
}

export default SidebarFooter
