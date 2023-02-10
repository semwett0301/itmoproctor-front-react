import React, { FC } from 'react'
import { Tabs, TabsPropOnChange } from '@consta/uikit/Tabs'
import { Card } from '@consta/uikit/Card'
import cl from './NavTabs.module.scss'
import TabWithCross from './TabWithCross/TabWithCross'
import { resetFilter } from '../../../store/reducers/tables/tablesActionCreators'
import { TablesEnum } from '../../../config/store/tablesReducerConfig'
import { useAppDispatch } from '../../../hooks/store/useAppDispatch'

export interface TabItem {
  id: number | string
  title: string
  path: string
  type: 'tab' | 'exam'
  table?: TablesEnum
}

type INavTabsProps = {
  activeTab: TabItem | null
  tabItems: TabItem[]
  setActiveTab: TabsPropOnChange<TabItem>
  closeTab: (item: TabItem) => void
}

const NavTabs: FC<INavTabsProps> = ({ activeTab, tabItems, setActiveTab, closeTab }) => {
  const dispatch = useAppDispatch()

  return (
    <Card shadow={false} horizontalSpace={'s'}>
      <Tabs
        className={cl.card}
        fitMode={'scroll'}
        size={'m'}
        value={activeTab}
        onChange={(value) => {
          setActiveTab(value)
        }}
        items={tabItems}
        getItemLabel={(item) => item.path}
        renderItem={({ item, onChange, checked }) => (
          <TabWithCross
            item={item}
            onChange={onChange}
            checked={checked}
            onCrossClick={() => {
              if (item.table) dispatch(resetFilter(item.table))
              closeTab(item)
            }}
          />
        )}
      />
    </Card>
  )
}

export default NavTabs
