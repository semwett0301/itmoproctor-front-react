import React, {FC, useState} from 'react'
import cn from './ExamDeclineModal.module.scss'
import ModalTitle from '../../../../shared/ModalView/ModalTitle/ModalTitle'
import {Text} from '@consta/uikit/Text'
import {Checkbox} from '@consta/uikit/Checkbox'
import {TextField} from '@consta/uikit/TextField'
import {Button} from '@consta/uikit/Button'
import {IconCheck} from '@consta/icons/IconCheck'
import {IExam} from '../../../../../ts/interfaces/IExam'
// TYPES

// CONSTANTS

// DEFAULT FUNCTIONS

interface IExamDeclineModalProp {
  exam: IExam
  prevComment: string | null
  prevNote: string | null
}

const ExamDeclineModal: FC<IExamDeclineModalProp> = ({ prevComment, prevNote }) => {
  const [comment, setComment] = useState<string | null>(prevComment)
  const [note, setNote] = useState<string | null>(prevNote)
  const [dropTry, setDropTry] = useState<boolean>(false)

  return (
    <div className={cn.wrapper}>
      <ModalTitle titleString={'Заключение'} />
      <div className={cn.content}>
        <Text>
          Вы собираетесь
          <Text as={'span'} view={'alert'} weight={'bold'}>
            {' отклонить '}
          </Text>
          текущий экзамен. Пожалуйста, выберите причины, по которым вы хотите отклонить экзамен и
          убедитесь, что вы внесли все желаемые комментарии и примечания. Отменить операцию будет
          невозможно!
        </Text>
        <Checkbox
          checked={dropTry}
          onChange={() => setDropTry(!dropTry)}
          label={'Сбросить попытку'}
        />

        <div className={cn.reasons}></div>

        <div className={cn.fields}>
          <TextField
            label={'Комментарии'}
            type={'textarea'}
            rows={2}
            placeholder={'Введите текст комментария'}
            value={comment}
            onChange={({ value }) => setComment(value)}
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

        <Button size={'s'} className={cn.acceptBtn} label={'Отклонить'} iconLeft={IconCheck} />
      </div>
    </div>
  )
}

export default ExamDeclineModal
