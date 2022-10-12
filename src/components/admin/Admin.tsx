import React, { FC, useState } from 'react'
import { Layout } from '@consta/uikit/Layout'
import cl from './Admin.module.css'
import { Header, HeaderLogin, HeaderLogo, HeaderModule } from '@consta/uikit/Header'
import logo from '../../mockData/logos/Group_12df.svg'
import userLogo from '../../mockData/logos/UserLogo.png'
import Sidebar from './Sidebar/Sidebar'
import { Tabs } from '@consta/uikit/Tabs'
import TabWithCross from './exams/components/TabWithCross/TabWithCross'
import { useLogout } from '../../hooks/authHooks'
import { Button } from '@consta/uikit/Button'
import { Card } from '@consta/uikit/Card'
import { Outlet, useNavigate } from 'react-router-dom'

export interface TabItem {
  id: number | string
  title: string
  path: string
  type: 'tab' | 'exam'
}

const Admin: FC = () => {
  const [tabItems, setItems] = useState<TabItem[] | []>([
    { id: 'exams', title: 'Экзамены', path: 'exams', type: 'tab' }
  ])

  const [activeTab, setActiveTab] = useState<TabItem | null>({
    id: 'exams',
    title: 'Экзамены',
    path: 'exams',
    type: 'tab'
  })
  const [isLogged] = useState<boolean>(true)
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

  const clickHandler = useLogout()

  return (
    <Layout className={cl.wrapper} direction={'column'}>
      <Layout>
        <Header
          leftSide={
            <>
              <HeaderModule>
                <HeaderLogo>
                  <img src={logo} alt='LOGO' />
                </HeaderLogo>
              </HeaderModule>
            </>
          }
          rightSide={
            <>
              <HeaderModule indent='m'>
                <Button label='Выход' onClick={clickHandler} view={'secondary'} />
              </HeaderModule>
              <HeaderModule>
                <HeaderLogin
                  isLogged={isLogged}
                  personName='Наруто Удзумаки'
                  personInfo='Хокаге'
                  personStatus='available'
                  personAvatarUrl={userLogo}
                />
              </HeaderModule>
            </>
          }
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
