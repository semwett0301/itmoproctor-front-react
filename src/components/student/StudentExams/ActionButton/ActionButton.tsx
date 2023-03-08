import React, { FC, useCallback, useMemo } from 'react'
import { Button, ButtonPropSize, ButtonPropView } from '@consta/uikit/Button'
import { TextPropView } from '@consta/uikit/Text'
import { IconComponent } from '@consta/icons/Icon'
import { IconEye } from '@consta/icons/IconEye'
import { IconCancel } from '@consta/icons/IconCancel'
import { IconPlay } from '@consta/icons/IconPlay'
import { IconRing } from '@consta/icons/IconRing'
import { openModal } from '../../../shared/ModalView/ModalView'

type ActionButtonMode = 'view' | 'cancel' | 'plan' | 'join'

export type ActionButtonProps = {
  mode: ActionButtonMode
  size?: ButtonPropSize
  disabled?: boolean
  onClick?: () => void
}

const ActionButton: FC<ActionButtonProps> = ({ mode, size, disabled, onClick }) => {

  const label = useMemo<string>(() => {
    switch (mode) {
      case 'cancel':
        return 'Отменить'
      case 'join':
        return 'Подключиться'
      case 'plan':
        return 'Запланировать'
      case 'view':
        return 'Ознакомиться'
    }
  }, [mode])

  const view = useMemo<ButtonPropView>(() => {
    switch (mode) {
      case 'view':
      case 'plan':
        return 'secondary'
      case 'join':
        return 'primary'
      case 'cancel':
        return 'ghost'
    }
  }, [mode])

  const icon = useMemo<IconComponent>(() => {
    switch (mode) {
      case 'view':
        return IconEye
      case 'cancel':
        return IconCancel
      case 'join':
        return IconPlay
      case 'plan':
        return IconRing
    }
  }, [mode])

  return (
    <Button size={size ?? 'xs'} view={view} label={label} onClick={onClick} iconLeft={icon} disabled={disabled} />
  )
}

export default ActionButton
