import React, { FC, useEffect, useState } from 'react'
import { INote } from '../../../../../ts/interfaces/INotes'
import cn from './Note.module.scss'
import { Text } from '@consta/uikit/Text'
import { IconAttach } from '@consta/uikit/IconAttach'
import { openModal } from '../../../../shared/ModalView/ModalView'
import { Button } from '@consta/uikit/Button'
import { IconAlert } from '@consta/uikit/IconAlert'
import dayjs from 'dayjs'
import { stat } from 'fs'

// TYPES
interface INoteProp {
  note: INote
}

const Note: FC<INoteProp> = ({ note }) => {
  const [status, setStatus] = useState(0)

  useEffect(() => {
    setStatus(Math.random())
  }, [])
  return (
    <div className={cn.note}>
      <Text view={'secondary'} weight={'bold'} size={'xs'}>
        {dayjs(note.time).format('HH:mm')}
      </Text>

      <div className={cn.message}>
        {status > 0.5 && (
          <Text size={'xs'}>
            <IconAlert size='xs' view={'warning'} />
          </Text>
        )}
        <div className={cn.messageContent}>
          <Text size={'xs'}>{note.text}</Text>
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
                  onClick={() => openModal(<div>Вложение</div>)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Note
