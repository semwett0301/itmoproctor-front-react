import React, { Dispatch, FC } from 'react'
import { IExam } from '../../../../ts/interfaces/IExam'
import { classJoiner } from '../../../../utils/styleClassesUtills'
import { cnMixSpace } from '@consta/uikit/MixSpace'
import cn from './AboutBlock.module.scss'
import { Card } from '@consta/uikit/Card'
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { IconDocBlank } from '@consta/uikit/IconDocBlank'
import UserRow from './UserRow/UserRow'
import VerifyBtn from './VerifyBtn/VerifyBtn'
import { openModal } from '../../../shared/ModalView/ModalView'
import ExamView from '../../modals/ExamView/ExamView'
import ExamRules from './ExamRules/ExamRules'
import ProtocolVerifiedModal from './ProtocolVerifiedModal/ProtocolVerifiedModal'
import IconWithTooltip from '../../../shared/IconWithTooltip/IconWithTooltip'
import { IconCancel } from '@consta/icons/IconCancel'
import { useAppSelector } from '../../../../hooks/reduxHooks'
import { TextField } from '@consta/uikit/TextField'

// TYPES

// CONSTANTS

// DEFAULT FUNCTIONS

interface IAboutBlockProp {
  exam: IExam
  commentState: {
    comment: string | null
    setComment: Dispatch<React.SetStateAction<string | null>>
  }
  noteState: { note: string | null; setNote: Dispatch<React.SetStateAction<string | null>> }
}

const AboutBlock: FC<IAboutBlockProp> = ({ exam, noteState, commentState }) => {
  const user = useAppSelector((state) => state.user)

  const { note, setNote } = noteState
  const { comment, setComment } = commentState

  const isInProgress =
    exam.stopDate &&
    exam.resolution !== true &&
    exam.resolution !== false &&
    exam.expert &&
    exam.expert._id === user._id &&
    exam.inCheck

  const expert = exam.inspector || exam.expert

  return (
    <Card
      shadow={false}
      border={true}
      horizontalSpace='xs'
      verticalSpace='xs'
      className={classJoiner(cnMixSpace({ mB: 's', mT: 'xs' }), cn.aboutExam)}
    >
      <div className={cn.row}>
        <UserRow user={exam.student} withModal />
        <VerifyBtn
          view={exam.verified && exam.verifications?.length ? 'normal' : 'disabled'}
          onClick={
            exam.verified ? () => openModal(<ProtocolVerifiedModal exam={exam} />) : undefined
          }
        />
      </div>
      <div className={cn.row}>
        <UserRow user={exam.expert || exam.inspector} withModal={!!expert} />

        {isInProgress && (
          <IconWithTooltip
            icon={IconCancel}
            tooltipProps={{ content: 'Завершить проверку' }}
            iconProps={{ className: cn.stopCheckIcon, onClick: () => console.log(';sljhf') }}
          />
        )}
      </div>

      {isInProgress && (
        <>
          <TextField
            size={'xs'}
            type={'textarea'}
            rows={2}
            value={comment}
            onChange={({ value }) => setComment(value)}
            placeholder={'Введите текст комментария'}
          />
          <TextField
            size={'xs'}
            type={'textarea'}
            rows={2}
            value={note}
            onChange={({ value }) => setNote(value)}
            placeholder={'Введите текст примечания для администратора'}
          />
        </>
      )}

      <Text size='xs' view='secondary'>
        Правила:
      </Text>
      <ExamRules factors={exam.factors} />
      <div>
        <Button
          label='Карточка экзамена'
          iconLeft={IconDocBlank}
          view='secondary'
          size='xs'
          onClick={() => openModal(<ExamView examId={exam._id} />)}
        />
      </div>
    </Card>
  )
}

export default AboutBlock
