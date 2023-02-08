import React, {FC} from 'react'
import {IconInfo} from '@consta/uikit/IconInfo'
import {Card} from '@consta/uikit/Card'
import cl from './SidebarFooter.module.scss'
import {IconRing} from '@consta/uikit/IconRing'
import {Button} from '@consta/uikit/Button'
import {TabItem} from '../../../shared/NavTabs/NavTabs';

interface SideBarFooterProps {
  addTab: (item: TabItem) => void
}

const SidebarFooter: FC<SideBarFooterProps> = ({ addTab }) => {
  return (
    <Card horizontalSpace='s' shadow={false} className={cl.sidebarFooter}>
      <div
        className={cl.link}
        onClick={() =>
          addTab({
            id: 'about',
            title: 'О системе',
            path: 'about',
            type: 'tab'
          })
        }
      >
        <IconInfo size='xs' className={cl.iconInfo} />
        <span className={cl.info}>О системе</span>
        <Button
          onlyIcon={true}
          iconRight={IconRing}
          size={'xs'}
          view={'clear'}
          className={cl.ringButton}
        />
      </div>
    </Card>
  )
}

export default SidebarFooter
