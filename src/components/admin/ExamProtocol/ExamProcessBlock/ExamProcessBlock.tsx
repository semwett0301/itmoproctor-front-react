import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import cn from './ExamProcessBlock.module.scss'

import utc from 'dayjs/plugin/utc'
import { request } from '../../../../api/axios/request'
import { INote } from '../../../../ts/interfaces/INotes'
import { Text } from '@consta/uikit/Text'
import { Layout } from '@consta/uikit/Layout'
import { classJoiner } from '../../../../utils/styleClassesUtills'
import { cnMixCard } from '@consta/uikit/MixCard'
import { Button } from '@consta/uikit/Button'
import { IconAttach } from '@consta/uikit/IconAttach'
import { TextField } from '@consta/uikit/TextField'
import { IconSendMessage } from '@consta/uikit/IconSendMessage'
import dayjs, { Dayjs } from 'dayjs'
import Note from './Note/Note'
import { socket } from '../../../../api/socket/socket'
import { IExam } from '../../../../ts/interfaces/IExam'
import NoteWithAuthor from './NoteWithAuthor/NoteWithAuthor'
import { FileField } from '@consta/uikit/FileField'
import { IconTrash } from '@consta/icons/IconTrash'

// TYPES
interface DateNote {
  date: Dayjs
  notes: INote[]
}

// CONSTANTS
dayjs.extend(utc)

// DEFAULT FUNCTIONS

interface IExamProcessBlockProp {
  exam: IExam
}

const ExamProcessBlock: FC<IExamProcessBlockProp> = ({ exam }) => {
  const [notes, setNotes] = useState<Array<DateNote>>([])
  const [inputMessage, setInputMessage] = useState<string | null>(null)
  const attachInputRef = useRef<HTMLInputElement>(null)

  const [files, setFiles] = useState<FileList | null>(null)

  const updateNotes = useCallback((id: string): void => {
    request.expert.exams.getNotes(id).then(({ data }) => {
      const filteredNotes: DateNote[] = []

      data.forEach((note) => {
        const noteDay = dayjs(note.time).utcOffset(0).startOf('d')
        let foundNode = null

        for (let i = 0; i < filteredNotes.length; i++) {
          if (filteredNotes[i].date.toString() === noteDay.toString()) {
            foundNode = i
            break
          }
        }
        if (foundNode !== null) {
          filteredNotes[foundNode].notes.push(note)
        } else {
          filteredNotes.push({
            date: noteDay,
            notes: [note]
          })
        }
      })

      console.log(filteredNotes)

      setNotes([...filteredNotes])
    })
  }, [])

  useEffect(() => {
    socket.notes.subscribe(exam._id, () => {
      updateNotes(exam._id)
    })
    return () => {
      socket.notes.unsubscribe()
    }
  }, [exam._id])

  useEffect(() => {
    updateNotes(exam._id)
  }, [updateNotes, exam._id])

  const onSendMessageHandler = (): void => {
    if (inputMessage) {
      if (files) {
        const formData = new FormData()
        formData.append('attach', files[0])

        request.expert.exams
          .addAttach(formData)
          .then((r) =>
            request.expert.exams.addNote(exam._id, {
              text: inputMessage,
              editable: true,
              attach: [{ uploadname: r.data.filename, filename: r.data.originalname }]
            })
          )
          .catch((e) => console.log(e))
      } else {
        request.expert.exams.addNote(exam._id, {
          text: inputMessage,
          editable: true,
          attach: []
        })
      }

      setInputMessage(null)
    }
  }

  return (
    <Layout
      direction={'column'}
      className={classJoiner(cnMixCard({ border: true, form: 'round' }), cn.card)}
    >
      <Layout flex={1} direction={'column'} className={cn.notesField}>
        {notes.map((note, i) => {
          return (
            <div className={cn.dayMsg} key={i}>
              <Text size={'2xs'} view={'secondary'} style={{ width: '100%', textAlign: 'center' }}>
                {note.date.format('DD MMMM')}
              </Text>
              {note.notes.map((item) =>
                item.author._id !== exam.student._id && item.text ? (
                  <NoteWithAuthor key={item._id} note={item} exam={exam} />
                ) : (
                  <Note key={item._id} note={item} exam={exam} />
                )
              )}
            </div>
          )
        })}
      </Layout>

      {exam.resolution === null && (
        <div className={cn.messageArea}>
          {!files ? (
            <FileField
              id={'attachInput'}
              inputRef={attachInputRef}
              onChange={(e) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setFiles(e.target.files)
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
                setFiles(null)
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
            disabled={!inputMessage}
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

export default ExamProcessBlock
