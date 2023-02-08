import React, {FC, MouseEventHandler} from 'react'
import cn from './VerifyBtn.module.scss'
import {IconUser} from '@consta/uikit/IconUser'
import {IconAlignLeft} from '@consta/uikit/IconAlignLeft'
// TYPES

// CONSTANTS

// DEFAULT FUNCTIONS

interface IVerifyBtnProp {
  onClick?: MouseEventHandler<HTMLButtonElement>
  view: 'disabled' | 'normal'
}

const VerifyBtn: FC<IVerifyBtnProp> = ({ onClick, view }) => {
  return (
    <button className={cn.btn} onClick={onClick} disabled={view === 'disabled'}>
      <IconUser size={'xs'} />
      <IconAlignLeft size={'xs'} />
    </button>
  )
}

export default VerifyBtn
