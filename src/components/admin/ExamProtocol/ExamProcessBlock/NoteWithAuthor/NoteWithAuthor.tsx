import React, { FC } from 'react'
import cn from './NoteWithAuthor.module.scss'
import { Text } from '@consta/uikit/Text'
import dayjs from 'dayjs'
import { Button } from '@consta/uikit/Button'
import { IconAttach } from '@consta/uikit/IconAttach'
import { openModal } from '../../../../shared/ModalView/ModalView'
import { INote } from '../../../../../ts/interfaces/INotes'
import AttachModal from '../../modals/AttachModal/AttachModal'
import { IExam } from '../../../../../ts/interfaces/IExam'
// TYPES

// CONSTANTS

// DEFAULT FUNCTIONS

interface INoteWithAuthorProp {
  note: INote
  exam: IExam
}

const NoteWithAuthor: FC<INoteWithAuthorProp> = ({ note, exam }) => {
  return (
    <div className={cn.note}>
      <Text weight={'bold'} view={'brand'} size={'xs'}>
        {note.author.lastname} {note.author.firstname}
      </Text>

      <Text view={'secondary'} size={'2xs'}>
        {dayjs(note.time).format('HH:mm')}
      </Text>

      <Text className={cn.message} size={'2xs'}>
        {note.text}
      </Text>

      {!!note.attach.length && (
        <div className={cn.messageAttach}>
          {note.attach.map((item) => (
            <Button
              key={item.fileId}
              size={'xs'}
              view={'clear'}
              label={item.filename}
              iconLeft={IconAttach}
              className={cn.attach}
              width={'default'}
              onClick={() => openModal(<AttachModal attach={item} exam={exam} />)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default NoteWithAuthor
