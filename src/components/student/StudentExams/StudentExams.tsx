import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { classJoiner } from '../../../utils/common/styleClassesUtills'
import { cnMixCard } from '@consta/uikit/MixCard'
import { cnMixSpace } from '@consta/uikit/MixSpace'
import cn from './StudentExams.module.scss'
import { IStudentExamModel, studentExamsColumns } from './StudentExamsModel'
import { Layout } from '@consta/uikit/Layout'
import { useFlag } from '@consta/uikit/useFlag'
import { request } from '../../../api/axios/request'
import StatusBadge, { customBadgePropStatus, getExamStatus } from '../../shared/SharedTable/StatusBadge/StatusBadge'
import DateCell from '../../shared/SharedTable/DateCell/DateCell'
import { useTranslation } from 'react-i18next'
import NavigationPanel from './NavigationPanel/NavigationPanel'
import SharedTable from '../../shared/SharedTable/SharedTable'
import dayjs from 'dayjs'
import { AxiosResponse } from 'axios'
import { IResponseArray } from '../../../ts/interfaces/IResponseInterfaces'
import { IExamRow } from '../../../ts/interfaces/IExams'
import { openModal } from '../../shared/ModalView/ModalView'
import ExamView from '../../admin/modals/ExamView/ExamView'
import { ActionButtonProps } from './ActionButton/ActionButton'
import { getExamAction } from '../../../utils/student/getExamAction'
import SwitchLanguage from '../../shared/SwitchLanguage/SwitchLanguage'

const StudentExams: FC = () => {
  const [withHistory, setWithHistory] = useFlag(false)
  const [rows, setRows] = useState<IStudentExamModel[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const {t} = useTranslation()

  const requestExamsFunction = useMemo<() => Promise<AxiosResponse<IResponseArray<IExamRow>>>>(() => {
    return withHistory ? request.student.exams.getExamWithHistory : request.student.exams.getExams
  }, [withHistory])

  const getExams = useCallback<() => Promise<void>>(async () => {

    setIsLoading(true)
    setRows([])

    await requestExamsFunction().then((r) => {
      const tableRows: IStudentExamModel[] = r.data.rows.map((row, index) => ({
        id: index.toString(),
        exam: {
          _id: row._id,
          courseName: row.course?.name ?? '-',
          examName: row.subject
        },
        deadline: {
          date: dayjs(row.rightDate).toString(),
          description: dayjs(row.rightDate).diff(dayjs(), 'millisecond') <= 0 ? 'дедлайн прошел' :
            dayjs(row.rightDate).diff(dayjs(), 'day') == 0 ? 'осталось меньше 1 дня' :
              dayjs(row.rightDate).diff(dayjs(), 'day') <= 60 ? `осталось ${dayjs(row.rightDate).diff(dayjs(), 'day')} дней` : 'осталось больше 2 месяцев',
          view: dayjs(row.rightDate).diff(dayjs(), 'day') == 0 ? 'alert' : undefined
        },
        status: <StatusBadge reset={row.reset} status={customBadgePropStatus[getExamStatus(row, true)]}/>,
        start: <DateCell date={row.startDate} dateFormat={'DD.MM.YY'}/>,
        action: getExamAction(row)
      }))
      setRows(tableRows)
      setIsLoading(false)
    })
  }, [requestExamsFunction])

  useEffect(() => {
    getExams().catch(() =>
      setIsLoading(false)
    )
  }, [getExams])


  return (
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

      <Layout flex={1} direction={'column'}>
        <NavigationPanel setWithHistory={setWithHistory} update={getExams}/>

        <SharedTable rows={rows} columns={studentExamsColumns} isLoading={isLoading} className={cn.table}/>
      </Layout>


      <Layout flex={1} className={cn.switchLanguageWrapper} verticalAlign={'bottom'} fixed>
        <SwitchLanguage className={cn.switchLanguage}/>
      </Layout>
    </Layout>
  );
};

export default StudentExams;
