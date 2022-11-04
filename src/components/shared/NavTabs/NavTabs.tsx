import React, { FC } from 'react'
import { Tabs, TabsPropOnChange } from '@consta/uikit/Tabs'
import { TabItem } from '../../admin/Admin'
import { Card } from '@consta/uikit/Card'
import cl from './NavTabs.module.scss'
import TabWithCross from './TabWithCross/TabWithCross'

type INavTabsProps = {
  activeTab: TabItem | null
  tabItems: TabItem[]
  setActiveTab: TabsPropOnChange<TabItem>
  closeTab: (item: TabItem) => void
}

const NavTabs: FC<INavTabsProps> = ({ activeTab, tabItems, setActiveTab, closeTab }) => {
  return (
    <Card shadow={false} horizontalSpace={'s'}>
      <Tabs
        className={cl.card}
        fitMode={'scroll'}
        size={'m'}
        value={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        getItemLabel={(item) => item.title}
        renderItem={({ item, onChange, checked }) => (
          <TabWithCross item={item} onChange={onChange} checked={checked} onCrossClick={closeTab} />
        )}
      />
    </Card>
  )
}

export default NavTabs
