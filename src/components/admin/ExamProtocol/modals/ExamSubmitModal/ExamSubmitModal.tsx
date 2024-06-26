import React, { FC, useState } from 'react'
import cn from './ExamSubmitModal.module.scss'
import ModalTitle from '../../../../shared/ModalView/ModalTitle/ModalTitle'
import { Text } from '@consta/uikit/Text'
import { Checkbox } from '@consta/uikit/Checkbox'
import { TextField } from '@consta/uikit/TextField'
import { Button } from '@consta/uikit/Button'
import { IconCheck } from '@consta/icons/IconCheck'
import { IExam } from '../../../../../ts/interfaces/IExam'
import { request } from '../../../../../api/axios/request'
import { closeModal } from '../../../../shared/ModalView/ModalView'
// TYPES

// CONSTANTS

// DEFAULT FUNCTIONS

interface IExamSubmitModalProp {
  exam: IExam
  prevComment: string | null
  prevNote: string | null
  update: () => void
}

const ExamSubmitModal: FC<IExamSubmitModalProp> = ({ exam, prevComment, prevNote, update }) => {
  const [comment, setComment] = useState<string | null>(prevComment)
  const [note, setNote] = useState<string | null>(prevNote)
  const [dropTry, setDropTry] = useState<boolean>(false)

  return (
    <div className={cn.wrapper}>
      <ModalTitle titleString={'Заключение'} />
      <div className={cn.content}>
        <Text>
          Вы собираетесь
          <Text as={'span'} view={'success'} weight={'bold'}>
            {' принять '}
          </Text>
          текущий экзамен. Прежде чем подтвердить проверку, убедитесь, что вы внесли все желаемые
          комментарии и примечания. Отменить операцию будет невозможно!
        </Text>
        <Checkbox
          checked={dropTry}
          onChange={() => setDropTry(!dropTry)}
          label={'Сбросить попытку'}
        />{' '}
        <div className={cn.fields}>
          <TextField
            label={'Комментарии'}
            type={'textarea'}
            rows={2}
            placeholder={'Введите текст комментария'}
            value={comment}
            onChange={({ value }) => setComment(value)}
            status={comment ? 'success' : 'warning'}
            caption={!comment ? 'Необходимо указать комментарий' : undefined}
          />
          <TextField
            label={'Примечания'}
            type={'textarea'}
            rows={2}
            placeholder={'Введите примечание для администратора'}
            value={note}
            onChange={({ value }) => setNote(value)}
          />
        </div>
        <Button
          size={'s'}
          className={cn.acceptBtn}
          label={'Принять'}
          iconLeft={IconCheck}
          onClick={() =>
            request.expert.exams
              .setResolution(exam, true, comment ?? '', note, dropTry)
              .then(update)
              .then(closeModal)
          }
        />
      </div>
    </div>
  )
}

export default ExamSubmitModal
