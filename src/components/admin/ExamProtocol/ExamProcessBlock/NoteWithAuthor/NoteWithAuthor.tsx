import React, { FC } from 'react'
import cn from './NoteWithAuthor.module.scss'
import { Text } from '@consta/uikit/Text'
import dayjs from 'dayjs'
import { IconAlert } from '@consta/uikit/IconAlert'
import { Button } from '@consta/uikit/Button'
import { IconAttach } from '@consta/uikit/IconAttach'
import { openModal } from '../../../../shared/ModalView/ModalView'
import { INote } from '../../../../../ts/interfaces/INotes'
// TYPES

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

interface INoteWithAuthorProp {
  note: INote
}

const NoteWithAuthor: FC<INoteWithAuthorProp> = ({ note }) => {
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
    </div>
  )
}

export default NoteWithAuthor
