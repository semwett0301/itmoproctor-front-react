import React, { FC, useState } from 'react'
import { Layout } from '@consta/uikit/Layout'
import cl from './Admin.module.css'
import Sidebar from './Sidebar/Sidebar'
import { Tabs } from '@consta/uikit/Tabs'
import TabWithCross from './Exams/components/TabWithCross/TabWithCross'
import { Card } from '@consta/uikit/Card'
import { Outlet, useNavigate } from 'react-router-dom'
import CustomHeader from './CustomHeader/CustomHeader'

export interface TabItem {
  id: number | string
  title: string
  path: string
  type: 'tab' | 'exam'
}

const Admin: FC = () => {
  const [tabItems, setItems] = useState<TabItem[] | []>([
    { id: 'Exams', title: 'Экзамены', path: 'Exams', type: 'tab' }
  ])

  const [activeTab, setActiveTab] = useState<TabItem | null>({
    id: 'Exams',
    title: 'Экзамены',
    path: 'Exams',
    type: 'tab'
  })

  const navigate = useNavigate()

  const closeTab = (tabItem: TabItem): void => {
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
        <CustomHeader />
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
