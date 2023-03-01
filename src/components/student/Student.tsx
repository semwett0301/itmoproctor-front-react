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
import {IStudentExamModel, studentExamColumns} from './StudentExamModel'
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

const Student: FC = () => {
  const {t} = useTranslation()
  const outHandler = useLogout()
  const [withHistory, setWithHistory] = useFlag(false)
  const [rows, setRows] = useState<IStudentExamModel[]>([])

  const requestExams = (history = true): Promise<AxiosResponse<IResponseArray<IExamRow>>> => {
    return Promise.resolve(
      history ? request.student.exams.getExamWithHistory() : request.student.exams.getExams()
    )
  }

  useEffect(() => {
    requestExams(withHistory).then((r) => {
      const tableRows: IStudentExamModel[] = r.data.rows.map((row, index) => ({
        id: (index + 1).toString(),
        exam: (
          <TwoRowCell
            firstRow={row.subject}
            secondRow={row.assignment}
            tooltipText={'Карточка экзамена – ' + row.subject}
            onClick={() => openModal(<ExamView examId={row._id}/>)}
          />
        ),
        duration: t('shared.minutesPlurals.counter', {count: row.duration}),
        status: <StatusBadge status={customBadgePropStatus[getExamStatus(row)]}/>,
        start: <DateCell date={row.startDate}/>
      }))
      setRows(tableRows)
    })
  }, [t, withHistory])

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
      <Layout
        flex={1}
        direction="column"
        className={classJoiner(
          cnMixCard({
            form: 'round',
            shadow: false,
            border: true
          }),
          cnMixSpace({m: 's'}),
          cn.content
        )}
      >
        <div className={classJoiner(cn.buttonBlock, cnMixSpace({m: 's'}))}>
          <Button
            size={'xs'}
            view={'secondary'}
            label="Все экзамены"
            onClick={setWithHistory.toogle}
            iconLeft={withHistory ? IconCheck : IconSelect}
          />
          <Button
            size={'xs'}
            view={'secondary'}
            label="Обновить"
            onClick={() => requestExams()}
            iconLeft={IconRestart}
          />
          <Button size={'xs'} view={'secondary'} label="Помощь" iconLeft={IconQuestion}/>
        </div>

        <Table
          stickyHeader={true}
          getCellWrap={() => 'truncate'}
          size="s"
          rows={rows}
          columns={studentExamColumns}
          zebraStriped={'odd'}
          borderBetweenColumns
          borderBetweenRows
          className={cn.table}
          emptyRowsPlaceholder={
            withHistory ? (
              <div>
                <Loader size={'m'} className={cl.loader}/>
              </div>
            ) : (
              <ResponsesNothingFound
                actions={<></>}
                description={'Попробуйте изменить критерии поиска'}
              />
            )
          }
          // onSortBy={onSortByProps}
        />
      </Layout>
    </Layout>
  )
}

export default Student
