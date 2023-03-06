import React, {FC, useEffect, useState} from 'react';
import {classJoiner} from '../../../utils/common/styleClassesUtills';
import {cnMixCard} from '@consta/uikit/MixCard';
import {cnMixSpace} from '@consta/uikit/MixSpace';
import cn from './ExamTable.module.scss';
import {Button} from '@consta/uikit/Button';
import {IconCheck} from '@consta/uikit/IconCheck';
import {IconSelect} from '@consta/uikit/IconSelect';
import {IconRestart} from '@consta/uikit/IconRestart';
import {IconQuestion} from '@consta/uikit/IconQuestion';
import {Table} from '@consta/uikit/Table';
import {IStudentExamModel, studentExamColumns} from './ExamTableModel';
import {Loader} from '@consta/uikit/Loader';
import cl from '../../shared/SharedTable/SharedTable.module.scss';
import {ResponsesNothingFound} from '@consta/uikit/ResponsesNothingFound';
import {Layout} from '@consta/uikit/Layout';
import {useFlag} from '@consta/uikit/useFlag';
import {AxiosResponse} from 'axios';
import {IResponseArray} from '../../../ts/interfaces/IResponseInterfaces';
import {IExamRow} from '../../../ts/interfaces/IExams';
import {request} from '../../../api/axios/request';
import TwoRowCell from '../../shared/SharedTable/TwoRowCell/TwoRowCell';
import {openModal} from '../../shared/ModalView/ModalView';
import ExamView from '../../admin/modals/ExamView/ExamView';
import StatusBadge, {customBadgePropStatus, getExamStatus} from '../../shared/SharedTable/StatusBadge/StatusBadge';
import DateCell from '../../shared/SharedTable/DateCell/DateCell';
import {useTranslation} from 'react-i18next';

const ExamTable: FC = () => {
  const [withHistory, setWithHistory] = useFlag(false)
  const [rows, setRows] = useState<IStudentExamModel[]>([])

  const {t} = useTranslation()

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
  );
};

export default ExamTable;
