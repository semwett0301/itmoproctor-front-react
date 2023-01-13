import React, { FC, useEffect, useState } from 'react'
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
import { useAppSelector } from '../../../../hooks/reduxHooks'

// TYPES
interface DateNote {
  date: Dayjs
  notes: INote[]
}

// CONSTANTS
dayjs.extend(utc)

// DEFAULT FUNCTIONS

interface IExamProcessBlockProp {
  examId?: string
}

const ExamProcessBlock: FC<IExamProcessBlockProp> = ({ examId }) => {
  const user = useAppSelector((state) => state.user)

  const [todayNotes, setTodayNotes] = useState<DateNote>({
    date: dayjs().utcOffset(0).startOf('d'),
    notes: []
  })

  const [notes, setNotes] = useState<Array<DateNote>>([])

  const [inputMessage, setInputMessage] = useState<string | null>(null)

  useEffect(() => {
    if (examId)
      request.expert.exams.getNotes(examId).then(({ data }) => {
        const filteredNotes: DateNote[] = [...notes]

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

        setNotes([...filteredNotes, todayNotes])
      })
  }, [examId])

  const onSendMessageHandler = (): void => {
    if (examId && inputMessage) {
      setTodayNotes((prevState) => {
        const newToday = prevState
        newToday.notes.push({
          _id: inputMessage ?? 'хз',
          exam: examId,
          author: {
            _id: user._id,
            lastname: user.lastname,
            firstname: user.firstname,
            middlename: user.middlename
          },
          text: inputMessage,
          // ISO Date
          time: dayjs().toISOString(),
          __v: 0,
          attach: []
        })
        console.log(newToday)
        return newToday
      })
    }

    setInputMessage(null)
    console.log(inputMessage)
  }

  return (
    <Layout
      direction={'column'}
      className={classJoiner(cnMixCard({ border: true, form: 'round' }), cn.card)}
    >
      <Layout flex={1} direction={'column'} className={cn.notesField}>
        {notes.map((note, i) => (
          <div className={cn.dayMsg} key={i}>
            <Text size={'2xs'} view={'secondary'}>
              {note.date.format('DD MMMM')}
            </Text>
            {note.notes.map((item) => (
              <Note key={item._id} note={item} />
            ))}
          </div>
        ))}
      </Layout>

      <div className={cn.messageArea}>
        <Button onlyIcon iconRight={IconAttach} size={'xs'} view={'clear'} />
        <TextField
          size={'xs'}
          width={'full'}
          placeholder={'Введите текст комментария'}
          value={inputMessage}
          onChange={({ value }) => setInputMessage(value)}
          type={'textarea'}
          maxRows={6}
        />
        <Button
          onlyIcon
          iconRight={IconSendMessage}
          size={'xs'}
          view={'clear'}
          onClick={() => onSendMessageHandler()}
        />
      </div>
    </Layout>
  )
}

export default ExamProcessBlock
