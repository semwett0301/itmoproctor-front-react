import React, { FC, useEffect, useState } from 'react'
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
import { IconExit } from '@consta/uikit/IconExit'
import { useLogout } from '../../hooks/authHooks'
import NavTabs from '../shared/NavTabs/NavTabs'
import { classWatcher } from '../../utils/styleClassesUtills'
import { openModal } from '../shared/ModalView/ModalView'
import EditProfile from './modals/EditProfile/EditProfile'
import SettingsView from './modals/SettingsView/SettingsView'
import { userRoutes } from '../../utils/userRoutes'

export interface TabItem {
  id: number | string
  title: string
  path: string
  type: 'tab' | 'exam'
}

type AdminOutletContextType = { openTab: (item: TabItem) => void }

const Admin: FC = () => {
  const [tabItems, setItems] = useState<TabItem[]>([])

  const [activeTab, setActiveTab] = useState<TabItem | null>(null)

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
    function openMainTab(): void {
      openTab({
        id: 'exams',
        title: 'Экзамены',
        path: 'exams',
        type: 'tab'
      })
    }
    if (location.pathname === '/admin' && !tabItems.length && !activeTab) {
      openMainTab()
    } else if (location.pathname !== '/admin' && location.pathname.includes('/admin')) {
      const adminComponentsRoutes = userRoutes().find((route) => route.component === Admin)

      if (adminComponentsRoutes) {
        const path = location.pathname.replace(adminComponentsRoutes.path + '/', '')
        const pathParts: string[] = path.split('/')

        const currentRoute = adminComponentsRoutes.children?.find((item) => {
          const itemPathParts = item.path.split('/')

          return itemPathParts.length === pathParts.length && itemPathParts[0] === pathParts[0]
        })

        if (currentRoute) {
          if (typeof currentRoute.title === 'string' || typeof currentRoute.title === 'undefined') {
            openTab({
              id: path,
              title: currentRoute.title || 'Неизвестная вкладка',
              path: path,
              type: currentRoute.type ?? 'tab'
            })
          } else {
            console.log()
            currentRoute
              .title(pathParts[pathParts.length - 1])
              .then((title) =>
                openTab({
                  id: path,
                  title: title,
                  path: path,
                  type: currentRoute.type ?? 'tab'
                })
              )
              .catch(openMainTab)
          }
        }
      } else {
        openTab({
          id: 'exams',
          title: 'Экзамены',
          path: 'exams',
          type: 'tab'
        })
      }
    }
  }, [])

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
              iconLeft: IconUser,
              onClick: () => openModal(<EditProfile />)
            },
            {
              label: 'Настройки',
              group: 1,
              iconLeft: IconSettings,
              onClick: () => openModal(<SettingsView />)
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
              setActiveTab={({ value }) => {
                setActiveTab(value)
              }}
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
