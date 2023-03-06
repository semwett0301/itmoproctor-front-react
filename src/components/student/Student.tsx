import React, {FC, useEffect, useState} from 'react'
import cn from './Student.module.scss'
import {Layout} from '@consta/uikit/Layout'
import CustomHeader from '../shared/CustomHeader/CustomHeader'
import HeaderLogoModule from '../shared/CustomHeader/HeaderLogoModule/HeaderLogoModule'
import HeaderTimeDateModule from '../shared/CustomHeader/HeaderTimeDateModule/HeaderTimeDateModule'
import {IconUser} from '@consta/uikit/IconUser'
import {openModal} from '../shared/ModalView/ModalView'
import EditProfile from '../admin/modals/EditProfile/EditProfile'
import {IconSettings} from '@consta/uikit/IconSettings'
import {IconScreen} from '@consta/uikit/IconScreen'
import {IconExit} from '@consta/uikit/IconExit'
import {cnMixSpace} from '@consta/uikit/MixSpace'
import {cnMixCard} from '@consta/uikit/MixCard'
import {classJoiner} from '../../utils/common/styleClassesUtills'
import {IStudentExamModel, studentExamColumns} from './ExamTable/ExamTableModel'
import cl from '../shared/SharedTable/SharedTable.module.scss'
import {Loader} from '@consta/uikit/Loader'
import {ResponsesNothingFound} from '@consta/uikit/ResponsesNothingFound'
import {Table} from '@consta/uikit/Table'
import {Button} from '@consta/uikit/Button'
import {IconCheck} from '@consta/uikit/IconCheck'
import {IconRestart} from '@consta/uikit/IconRestart'
import {IconQuestion} from '@consta/uikit/IconQuestion'
import {request} from '../../api/axios/request'
import {useFlag} from '@consta/uikit/useFlag'
import {IconSelect} from '@consta/uikit/IconSelect'
import StatusBadge, {customBadgePropStatus, getExamStatus} from '../shared/SharedTable/StatusBadge/StatusBadge'
import DateCell from '../shared/SharedTable/DateCell/DateCell'
import {useTranslation} from 'react-i18next'
import ExamView from '../admin/modals/ExamView/ExamView'
import TwoRowCell from '../shared/SharedTable/TwoRowCell/TwoRowCell'
import {Text} from '@consta/uikit/Text'
import {AxiosResponse} from 'axios'
import {IResponseArray} from '../../ts/interfaces/IResponseInterfaces'
import {IExamRow} from '../../ts/interfaces/IExams'
import {useLogout} from '../../hooks/auth/useLogout';
import SettingsView from '../shared/modals/SettingsView/SettingsView';
import ExamTable from './ExamTable/ExamTable';

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

      <ExamTable/>

    </Layout>
  )
}

export default Student
