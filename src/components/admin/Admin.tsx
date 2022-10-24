import React, { FC, useState } from 'react'
import { Layout } from '@consta/uikit/Layout'
import cl from './Admin.module.scss'
import Sidebar from './Sidebar/Sidebar'
import { Tabs } from '@consta/uikit/Tabs'
import TabWithCross from '../shared/navTabs/TabWithCross/TabWithCross'
import { Card } from '@consta/uikit/Card'
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom'
import CustomHeader from '../shared/CustomHeader/CustomHeader'
import HeaderLogoModule from '../shared/CustomHeader/HeaderLogoModule/HeaderLogoModule'
import HeaderTimeDateModule from '../shared/CustomHeader/HeaderTimeDateModule/HeaderTimeDateModule'

export interface TabItem {
  id: number | string
  title: string
  path: string
  type: 'tab' | 'exam'
}

type AdminOutletContextType = { openTab: (item: TabItem) => void }

const Admin: FC = () => {
  const [tabItems, setItems] = useState<TabItem[] | []>([
    { id: 'Exams', title: 'Экзамены', path: 'Exams', type: 'tab' }
  ])

  const [activeTab, setActiveTab] = useState<TabItem | null>(tabItems[0])

  const navigate = useNavigate()

  const closeTab = (tabItem: TabItem): void => {
    setActiveTab(() => {
      const tab = tabItems[tabItems.findIndex((el) => el.id === tabItem.id) - 1]
      navigate(tab ? tab.path : '')
      return tab
    })

    setItems(tabItems.filter((item) => item.id !== tabItem.id))
  }

  const openTab = (item: TabItem): void => {
    setItems((prevState) => {
      if (!prevState.find((i) => i.id === item.id)) {
        if (item.type === 'exam') {
          navigate(item.path)
        }
        setActiveTab(item)
        return [...prevState, item]
      } else {
        if (item.type === 'exam') {
          navigate(item.path)
        }
        navigate(item.path)
        setActiveTab(item)
        return [...prevState]
      }
    })
  }

  return (
    <Layout className={cl.wrapper} direction={'column'}>
      <Layout>
        <CustomHeader
          leftSide={<HeaderLogoModule />}
          rightSide={[{ key: 'dateTime', component: HeaderTimeDateModule }]}
        />
      </Layout>

      <Layout className={cl.contentWrapper} direction='row'>
        <Layout className={cl.standardLayout}>
          <Sidebar addTab={openTab} />
        </Layout>

        <Layout className={cl.standardLayout} direction={'column'}>
          <Card className={cl.contentCard}>
            <Card shadow={false} horizontalSpace={'s'}>
              <Tabs
                fitMode={'scroll'}
                size={'m'}
                value={activeTab}
                onChange={({ value }) => setActiveTab(value)}
                items={tabItems}
                getItemLabel={(item) => item.title}
                renderItem={({ item, onChange, checked }) => (
                  <TabWithCross
                    item={item}
                    onChange={onChange}
                    checked={checked}
                    onCrossClick={closeTab}
                  />
                )}
              />
            </Card>

            <Outlet context={{ openTab }} />
          </Card>
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Admin

export function useOpenTab(): AdminOutletContextType {
  return useOutletContext<AdminOutletContextType>()
}
