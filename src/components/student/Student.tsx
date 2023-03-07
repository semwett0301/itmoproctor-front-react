import React, {FC} from 'react'
import cn from './Student.module.scss'
import {Layout} from '@consta/uikit/Layout'
import CustomHeader from '../shared/CustomHeader/CustomHeader'
import HeaderLogoModule from '../shared/CustomHeader/HeaderLogoModule/HeaderLogoModule'
import HeaderTimeDateModule from '../shared/CustomHeader/HeaderTimeDateModule/HeaderTimeDateModule'
import {IconUser} from '@consta/uikit/IconUser'
import {openModal} from '../shared/ModalView/ModalView'
import EditProfile from '../admin/modals/EditProfile/EditProfile'
import {IconSettings} from '@consta/uikit/IconSettings'
import {IconExit} from '@consta/uikit/IconExit'
import {useLogout} from '../../hooks/auth/useLogout';
import SettingsView from '../shared/modals/SettingsView/SettingsView';
import StudentExams from './StudentExams/StudentExams';

const Student: FC = () => {
  const outHandler = useLogout()

  return (
    <Layout direction={'column'} className={cn.wrapper}>
      <CustomHeader
        leftSide={<HeaderLogoModule/>}
        rightSide={[{key: 'dateTime', component: HeaderTimeDateModule}]}
        contextMenuItems={[
          {
            label: 'Профиль',
            group: 1,
            iconLeft: IconUser,
            onClick: () => openModal(<EditProfile/>)
          },
          {
            label: 'Настройки',
            group: 1,
            iconLeft: IconSettings,
            onClick: () => openModal(<SettingsView/>)
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

      <StudentExams />

    </Layout>
  )
}

export default Student
