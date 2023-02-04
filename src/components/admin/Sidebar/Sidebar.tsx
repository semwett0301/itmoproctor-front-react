import React, { FC } from 'react'
import { Card } from '@consta/uikit/Card'
import cl from './Sidebar.module.scss'
import NavCollapse from './NavCollapse/NavCollapse'
import { Button } from '@consta/uikit/Button'
import { classWatcher } from '../../../utils/styleClassesUtills'
import { useTheme } from '@consta/uikit/Theme'
import SidebarFooter from './SidebarFooter/SidebarFooter'
import { TabItem } from '../Admin'
import { IconArrowLeft } from '@consta/uikit/IconArrowLeft'

interface SideBarProps {
  addTab: (item: TabItem) => void
  expandState: boolean
  setExpandState: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: FC<SideBarProps> = ({ addTab, expandState, setExpandState }) => {
  const { themeClassNames } = useTheme()

  return (
    <Card
      className={classWatcher(
        expandState,
        cl.expand,
        cl.collapse,
        cl.sidebar,
        themeClassNames.color.invert
      )}
    >
      <Button
        className={classWatcher(expandState, cl.sideBtnActive, cl.sideBtnCollapse, cl.sideBtn)}
        onlyIcon={true}
        iconLeft={IconArrowLeft}
        iconSize='xs'
        form='round'
        size='xs'
        onClick={() => setExpandState(!expandState)}
      />

      <NavCollapse isOpen={expandState} addTab={addTab} />
      <SidebarFooter addTab={addTab} />
    </Card>
  )
}

export default Sidebar
