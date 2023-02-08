import React, {FC, ReactNode} from 'react'
import {IconCheck} from '@consta/uikit/IconCheck'
import {Button} from '@consta/uikit/Button'
import cl from './SaveButton.module.scss'
import {classJoiner} from '../../../../utils/common/styleClassesUtills'
import {cnMixSpace} from '@consta/uikit/MixSpace'
// TYPES

// CONSTANTS

// DEFAULT FUNCTIONS

// TODO: copy this components directory and add your content to make your page

interface ISaveButtonProp {
  valid: boolean
  onClick?: (event: React.MouseEvent<Element, MouseEvent>) => void
  children?: ReactNode
}

const SaveButton: FC<ISaveButtonProp> = ({ valid, onClick, children }) => {
  return (
    <div className={classJoiner(cl.wrapper, cnMixSpace({ pH: 'm', mB: 's' }))}>
      {children}
      <Button
        className={cl.submitBtn}
        type={'submit'}
        label={'Сохранить'}
        iconLeft={IconCheck}
        size={'s'}
        disabled={!valid}
        onClick={onClick}
      />
    </div>
  )
}

export default SaveButton
