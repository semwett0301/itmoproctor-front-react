import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { IExam } from '../../../../ts/interfaces/IExam'
import cn from './SyncChat.module.scss'
import { classJoiner } from '../../../../utils/common/styleClassesUtills'
import { Layout } from '@consta/uikit/Layout'
import { Text } from '@consta/uikit/Text'
import NoteWithAuthor from '../ExamProcessBlock/NoteWithAuthor/NoteWithAuthor'
import { FileField } from '@consta/uikit/FileField'
import { Button } from '@consta/uikit/Button'
import { IconAttach } from '@consta/uikit/IconAttach'
import { IconTrash } from '@consta/icons/IconTrash'
import { TextField } from '@consta/uikit/TextField'
import { IconSendMessage } from '@consta/uikit/IconSendMessage'
import { request } from '../../../../api/axios/request'
import { socket } from '../../../../api/socket/socket'
import dayjs, { Dayjs } from 'dayjs'
import { useAppSelector } from '../../../../hooks/store/useAppSelector'
import { Avatar } from '@consta/uikit/Avatar'
import { getShortName } from '../../../../utils/common/nameHelper'
import { IChatMessage } from '../../../../ts/interfaces/IChat'

// TYPES
export interface IDateMessages {
  date: Dayjs
  messages: IChatMessage[]
}

// CONSTANTS

// DEFAULT FUNCTIONS

interface ISyncChatProp {
  exam: IExam
}

const SyncChat: FC<ISyncChatProp> = ({ exam }) => {
  const user = useAppSelector((state) => state.user)

  const [messages, setMessages] = useState<Array<IDateMessages>>([])
  const [inputMessage, setInputMessage] = useState<string | null>(null)
  const attachInputRef = useRef<HTMLInputElement>(null)

  const [att, setAtt] = useState<FileList | null>(null)

  const chat = useRef<HTMLDivElement>(null)

  const updateNotes = useCallback((id: string): void => {
    request.student.chat.getMessages(id).then(({ data }) => {
      const filteredNotes: IDateMessages[] = []

      data.forEach((message) => {
        const noteDay = dayjs(message.time).utcOffset(0).startOf('d')
        let foundNode = null

        for (let i = 0; i < filteredNotes.length; i++) {
          if (filteredNotes[i].date.toString() === noteDay.toString()) {
            foundNode = i
            break
          }
        }
        if (foundNode !== null) {
          filteredNotes[foundNode].messages.push(message)
        } else {
          filteredNotes.push({
            date: noteDay,
            messages: [message]
          })
        }
      })

      console.log(filteredNotes)

      setMessages([...filteredNotes])

      if (chat.current) {
        const scrollBottom =
          chat.current.scrollHeight - chat.current.scrollTop - chat.current.clientHeight
        if (scrollBottom < 80) {
          chat.current.scrollIntoView({ block: 'end' })
        }
      }
    })
  }, [])

  useEffect(() => {
    socket.chat.subscribe(exam._id, () => {
      updateNotes(exam._id)
    })

    return () => {
      socket.chat.unsubscribe(exam._id)
    }
  }, [exam._id])

  useEffect(() => {
    updateNotes(exam._id)
  }, [updateNotes, exam._id])

  const onSendMessageHandler = (): void => {
    if (inputMessage || att) {
      if (att) {
        const formData = new FormData()
        formData.append('attach', att[0])

        request.expert.exams
          .addAttach(formData)
          .then((r) =>
            request.student.chat.postMessage(exam._id, {
              author: {
                _id: user._id,
                lastname: user.lastname,
                firstname: user.firstname,
                middlename: user.middlename
              },
              text: inputMessage ?? '',
              attach: [{ uploadname: r.data.filename, filename: r.data.originalname }]
            })
          )
          .catch((e) => console.log(e))
      } else {
        request.student.chat.postMessage(exam._id, {
          author: {
            _id: user._id,
            lastname: user.lastname,
            firstname: user.firstname,
            middlename: user.middlename
          },
          text: inputMessage ?? '',
          attach: []
        })
      }

      setAtt(null)
      setInputMessage(null)
    }
  }

  return (
    <Layout direction={'column'} className={cn.card}>
      <Layout flex={1} direction={'column'} className={cn.notesField} ref={chat}>
        {messages.map((day, i) => {
          return (
            <div className={cn.dayMsg} key={i}>
              <Text size={'2xs'} view={'secondary'} style={{ width: '100%', textAlign: 'center' }}>
                {day.date.format('DD MMMM')}
              </Text>
              {day.messages.map((item) => (
                <div
                  className={classJoiner(
                    cn.message,
                    item.author._id === user._id ? cn.left : cn.right
                  )}
                  key={item._id}
                >
                  <Avatar
                    name={getShortName(
                      item.author.firstname,
                      item.author.middlename,
                      item.author.lastname
                    )}
                    className={cn.avatar}
                  />
                  <NoteWithAuthor note={item} exam={exam} />
                </div>
              ))}
            </div>
          )
        })}
      </Layout>

      {exam.resolution === null && (
        <div className={cn.messageArea}>
          {!att ? (
            <FileField
              id={'file'}
              inputRef={attachInputRef}
              onChange={(e) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setAtt(e.target.files)
              }}
            >
              {(props) => (
                <Button {...props} onlyIcon iconRight={IconAttach} size={'xs'} view={'clear'} />
              )}
            </FileField>
          ) : (
            <Button
              size={'xs'}
              view={'primary'}
              onlyIcon
              iconRight={IconTrash}
              onClick={() => {
                setAtt(null)
              }}
            />
          )}

          <TextField
            size={'xs'}
            width={'full'}
            placeholder={'Введите текст заметки'}
            value={inputMessage}
            onChange={({ value }) => setInputMessage(value)}
            type={'textarea'}
            maxRows={6}
          />
          <Button
            disabled={!inputMessage && !att}
            onlyIcon
            iconRight={IconSendMessage}
            size={'xs'}
            view={'clear'}
            onClick={() => onSendMessageHandler()}
          />
        </div>
      )}
    </Layout>
  )
}

export default SyncChat
