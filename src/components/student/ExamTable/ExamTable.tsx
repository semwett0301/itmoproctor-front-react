import React, {FC, useCallback, useEffect, useState} from 'react';
import {classJoiner} from '../../../utils/common/styleClassesUtills';
import {cnMixCard} from '@consta/uikit/MixCard';
import {cnMixSpace} from '@consta/uikit/MixSpace';
import cn from './ExamTable.module.scss';
import {Table} from '@consta/uikit/Table';
import {IStudentExamModel, studentExamColumns} from './ExamTableModel';
import {Loader} from '@consta/uikit/Loader';
import cl from '../../shared/SharedTable/SharedTable.module.scss';
import {ResponsesNothingFound} from '@consta/uikit/ResponsesNothingFound';
import {Layout} from '@consta/uikit/Layout';
import {useFlag} from '@consta/uikit/useFlag';
import {request} from '../../../api/axios/request';
import TwoRowCell from '../../shared/SharedTable/TwoRowCell/TwoRowCell';
import {openModal} from '../../shared/ModalView/ModalView';
import ExamView from '../../admin/modals/ExamView/ExamView';
import StatusBadge, {customBadgePropStatus, getExamStatus} from '../../shared/SharedTable/StatusBadge/StatusBadge';
import DateCell from '../../shared/SharedTable/DateCell/DateCell';
import {useTranslation} from 'react-i18next';
import NavigationPanel from './NavigationPanel/NavigationPanel';

const ExamTable: FC = () => {
  const [withHistory, setWithHistory] = useFlag(false)
  const [rows, setRows] = useState<IStudentExamModel[]>([])

  const {t} = useTranslation()

  const requestExams = useCallback<() => Promise<void>>(async () => {
    const requestFunction = withHistory ? request.student.exams.getExamWithHistory : request.student.exams.getExams

    await requestFunction().then((r) => {
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

  useEffect(() => {
    requestExams().catch(e => console.log(e))
  }, [requestExams])


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

      <NavigationPanel setWithHistory={setWithHistory} update={requestExams}/>

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
  );
};

export default ExamTable;
