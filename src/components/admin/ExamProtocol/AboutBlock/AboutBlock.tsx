import React, { FC } from 'react'
import { IExam } from '../../../../ts/interfaces/IExam'
import { classJoiner } from '../../../../utils/styleClassesUtills'
import { cnMixSpace } from '@consta/uikit/MixSpace'
import cn from './AboutBlock.module.scss'
import { Card } from '@consta/uikit/Card'
import { ProgressSpin } from '@consta/uikit/ProgressSpin'
import { Text } from '@consta/uikit/Text'
import { Button } from '@consta/uikit/Button'
import { IconDocBlank } from '@consta/uikit/IconDocBlank'
import UserRow from './UserRow/UserRow'
import VerifyBtn from './VerifyBtn/VerifyBtn'
import { openModal } from '../../../shared/ModalView/ModalView'
import ExamView from '../../modals/ExamView/ExamView'
import ExamRules from './ExamRules/ExamRules'
import ProtocolVerifiedModal from './ProtocolVerifiedModal/ProtocolVerifiedModal'
// TYPES

// CONSTANTS

// DEFAULT FUNCTIONS

interface IAboutBlockProp {
  exam: IExam
}

const AboutBlock: FC<IAboutBlockProp> = ({ exam }) => {
  return (
    <Card
      shadow={false}
      border={true}
      horizontalSpace='xs'
      verticalSpace='xs'
      className={classJoiner(cnMixSpace({ mB: 's', mT: 'xs' }), cn.aboutExam)}
    >
      {exam ? (
        <>
          <div className={cn.studentRow}>
            <UserRow user={exam.student} isStudent />
            <VerifyBtn
              view={exam.verified ? 'normal' : 'disabled'}
              onClick={
                exam.verified ? () => openModal(<ProtocolVerifiedModal exam={exam} />) : undefined
              }
            />
          </div>
          <UserRow user={exam.expert || exam.inspector} />
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
        </>
      ) : (
        <div className={cn.spinner}>
          <ProgressSpin />
        </div>
      )}
    </Card>
  )
}

export default AboutBlock
