import React, {FC, useState} from 'react'
import {Card} from '@consta/uikit/Card'
import cl from './Sidebar.module.scss'
import NavCollapse from './NavCollapse/NavCollapse'
import {Button} from '@consta/uikit/Button'
import {classWatcher} from '../../../utils/styleClassesUtills'
import {useTheme} from '@consta/uikit/Theme'
import SidebarFooter from './SidebarFooter/SidebarFooter'
import {TabItem} from '../Admin'
import {IconArrowLeft} from '@consta/uikit/IconArrowLeft'

interface SideBarProps {
  addTab: (item: TabItem) => void
}

const Sidebar: FC<SideBarProps> = ({ addTab }) => {
  const [expandSate, setExpandState] = useState<boolean>(true)
  const { themeClassNames } = useTheme()

  return (
    <Card
      className={classWatcher(
        expandSate,
        cl.expand,
        cl.collapse,
        cl.sidebar,
        themeClassNames.color.invert
      )}
    >
      <Button
        className={classWatcher(expandSate, cl.sideBtnActive, cl.sideBtnCollapse, cl.sideBtn)}
        onlyIcon={true}
        iconLeft={IconArrowLeft}
        iconSize='xs'
        form='round'
        size='xs'
        onClick={() => setExpandState(!expandSate)}
      />

      <NavCollapse isOpen={expandSate} addTab={addTab} />
      <SidebarFooter />
    </Card>
  )
}

export default Sidebar
