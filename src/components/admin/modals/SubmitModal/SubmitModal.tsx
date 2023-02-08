import React, {FC, ReactNode} from 'react'
import cn from './SubmitModal.module.scss'
import {Text} from '@consta/uikit/Text'
import CloseModalButton from '../CloseModalButton/CloseModalButton'
import {cnMixSpace} from '@consta/uikit/MixSpace'
// TYPES

// CONSTANTS

// DEFAULT FUNCTIONS

interface ISubmitModalProp {
  header: string
  text: string
  footer: ReactNode
}

const SubmitModal: FC<ISubmitModalProp> = ({ header, text, footer }) => {
  return (
    <div className={cn.wrapper}>
      <div className={cn.header}>
        <Text weight={'semibold'} size={'s'}>
          {header}
        </Text>
        <CloseModalButton />
      </div>
      <Text size={'s'} className={cnMixSpace({ p: 's' })}>
        {text}
      </Text>
      {footer}
    </div>
  )
}

export default SubmitModal
