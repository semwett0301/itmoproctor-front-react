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
import { getSidebarItems } from './Sidebar/NavCollapse/NavCollapseModel'
import { openModal } from '../shared/ModalView/ModalView'
import EditProfile from './modals/EditProfile/EditProfile'
import SettingsView from './modals/SettingsView/SettingsView'
import { request } from '../../api/axios/request'
import { getShortName } from '../../utils/nameHelper'

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
    const tabWatcher = async (): Promise<void> => {
      const pathParts: string[] = location.pathname.split('/')
      console.log(pathParts.length)
      const path: string = pathParts[pathParts.length - 1]

      if (pathParts.includes('about')) {
        const aboutItem: TabItem = {
          id: 'about',
          title: 'О системе',
          path: 'about',
          type: 'tab'
        }
      }

      let currentItem: TabItem = {
        id: 'notFound',
        title: 'Экзамены',
        path: 'notFound',
        type: 'tab'
      }

      if (pathParts.length === 3) {
        const title: string | undefined = getSidebarItems()
          .concat({ path: 'about', icon: IconUser, title: 'О системе' })
          .filter((e) => e.path === path)[0]?.title

        currentItem = {
          id: path,
          title: title,
          path: path,
          type: title ? 'tab' : 'exam'
        }
      } else if (pathParts.length === 4) {
        const pathWidthId = pathParts.slice(2, 4).join('/')
        console.log(pathParts[2])
        let title = ''
        // pathParts[2] === 'exam' ? `Протокол – ${pathParts[3]}` : `Экзамены – ${pathParts[3]}`

        if (pathParts[2] === 'exam') {
          const { firstname, lastname, middlename } = await request.expert.exams
            .getExam(pathParts[3])
            .then((r) => r.data.student)

          title = 'Протокол – ' + getShortName(firstname, middlename, lastname)
        } else if (pathParts[2] === 'userExams') {
          const { firstname, lastname, middlename } = await request.users
            .getUser(pathParts[3])
            .then((r) => r.data)
          title = 'Экзамены – ' + getShortName(firstname, middlename, lastname)
        }

        currentItem = {
          id: pathWidthId,
          title: title,
          path: pathWidthId,
          type: title ? 'tab' : 'exam'
        }
      }

      if (!tabItems.find((e) => e.id === currentItem.id)) {
        setItems([...tabItems, currentItem])
        setActiveTab(currentItem)
      }
    }

    tabWatcher()
  }, [location, tabItems])

  useEffect(() => {
    console.log(location.pathname)
    if (location.pathname === '/admin' && !tabItems.length && !activeTab) {
      openTab({
        id: 'exams',
        title: 'Экзамены',
        path: 'exams',
        type: 'tab'
      })
    }
  })

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
