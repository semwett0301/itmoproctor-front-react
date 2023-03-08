import { IExamRow } from '../../ts/interfaces/IExams'
import { ActionButtonProps } from '../../components/student/StudentExams/ActionButton/ActionButton'
import { customBadgePropStatus, getExamStatus } from '../../components/shared/SharedTable/StatusBadge/StatusBadge'
import { openModal } from '../../components/shared/ModalView/ModalView'
import ExamView from '../../components/admin/modals/ExamView/ExamView'
import dayjs from 'dayjs'
import { router } from '../../App'

export const getExamAction: (row: IExamRow) => ActionButtonProps | undefined = row => {
  const currentStatus = customBadgePropStatus[getExamStatus(row, true)]

  let result: ActionButtonProps | undefined = undefined

  if (['success', 'reject'].includes(currentStatus)) {
    result = {
      mode: 'view',
      onClick: () => {
        openModal(<ExamView examId={row._id} />)
      }
    }
  } else {
    if (['waiting', 'withoutProctor', 'async', 'withProctor'].includes(currentStatus)) {
      result = {
        mode: 'join',
        disabled: row.reset
      }
    } else {
      if (currentStatus === 'unplanned') {
        result = {
          mode: 'plan',
          disabled: row.reset
        }
      } else {
        if (currentStatus === 'planned') {
          if (dayjs(row.beginDate).diff(dayjs(), 'hour') < 12) {
            result = {
              mode: 'cancel',
              disabled: true
            }
          } else {
            result = {
              mode: 'cancel',
              onClick: () => {
                console.log('click')
              }
            }
          }
        }
      }
    }
  }

  return result
}
