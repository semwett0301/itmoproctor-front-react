import React, { FC, useEffect, useLayoutEffect, useState } from 'react'
import { Layout } from '@consta/uikit/Layout'
import cl from './Admin.module.scss'
import Sidebar from './Sidebar/Sidebar'
import { Card } from '@consta/uikit/Card'
import { Outlet, useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import CustomHeader from '../shared/CustomHeader/CustomHeader'
import HeaderLogoModule from '../shared/CustomHeader/HeaderLogoModule/HeaderLogoModule'
import HeaderTimeDateModule from '../shared/CustomHeader/HeaderTimeDateModule/HeaderTimeDateModule'
import { IconUser } from '@consta/uikit/IconUser'
import { IconSettings } from '@consta/uikit/IconSettings'
import { IconScreen } from '@consta/uikit/IconScreen'
import { IconExit } from '@consta/uikit/IconExit'
import { useLogout } from '../../hooks/authHooks'
import NavTabs from '../shared/NavTabs/NavTabs'
import { classWatcher } from '../../utils/styleClassesUtills'
import { collapseItems } from './Sidebar/NavCollapse/NavCollapseModel'

export interface TabItem {
  id: number | string
  title: string
  path: string
  type: 'tab' | 'exam'
}

type AdminOutletContextType = { openTab: (item: TabItem) => void }

const Admin: FC = () => {
  const [tabItems, setItems] = useState<TabItem[]>([])

  const [activeTab, setActiveTab] = useState<TabItem | null>(tabItems[0])

  const [expandSate, setExpandState] = useState<boolean>(true)

  const navigate = useNavigate()

  const outHandler = useLogout()

  const location = useLocation()

  const closeTab = (tabItem: TabItem): void => {
    setActiveTab((prevState) => {
      const index = tabItems.findIndex((el) => el.id === tabItem.id)
      if (tabItem.id === activeTab?.id) {
        const tab: TabItem = index === 0 ? tabItems[1] : tabItems[index - 1]
        navigate(tab ? tab.path : '')
        return tab
      }
      return prevState
    })
    setItems(tabItems.filter((item) => item.id !== tabItem.id))
  }

  const openTab = (item: TabItem): void => {
    setItems((prevState) => {
      if (!prevState.find((i) => i.id === item.id)) {
        navigate(item.path)
        setActiveTab(item)
        return [...prevState, item]
      } else {
        navigate(item.path)
        setActiveTab(item)
        return [...prevState]
      }
    })
  }

  useEffect(() => {
    const pathParts: string[] = location.pathname.split('/')
    const path: string = pathParts[pathParts.length - 1]

    if (pathParts.length > 2) {
      const title: string | undefined = collapseItems.filter((e) => e.path === path)[0]?.title

      const currentItem: TabItem = {
        id: path,
        title: title,
        path: path,
        type: title ? 'tab' : 'exam'
      }

      if (tabItems.filter((e) => e.id === currentItem.id).length === 0) {
        setItems([...tabItems, currentItem])
      }
      setActiveTab(currentItem)
    }
  }, [location.pathname])

  return (
    <Layout className={cl.wrapper} direction={'column'}>
      <Layout>
        <CustomHeader
          leftSide={<HeaderLogoModule />}
          rightSide={[{ key: 'dateTime', component: HeaderTimeDateModule }]}
          contextMenuItems={[
            {
              label: 'Профиль',
              group: 1,
              iconLeft: IconUser
            },
            {
              label: 'Настройки',
              group: 1,
              iconLeft: IconSettings
            },
            {
              label: 'Проверка',
              group: 1,
              iconLeft: IconScreen
            },
            {
              label: 'Выход',
              onClick: async () => {
                await outHandler()
              },
              group: 2,
              iconLeft: IconExit
            }
          ]}
        />
      </Layout>

      <Layout className={cl.contentWrapper} direction='row'>
        <Layout className={cl.standardLayout}>
          <Sidebar addTab={openTab} expandState={expandSate} setExpandState={setExpandState} />
        </Layout>

        <Layout className={cl.standardLayout} direction={'column'}>
          <Card
            className={classWatcher(expandSate, cl.smallContent, cl.wideContent, cl.contentCard)}
          >
            <NavTabs
              activeTab={activeTab}
              tabItems={tabItems}
              setActiveTab={({ value }) => setActiveTab(value)}
              closeTab={closeTab}
            />
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
