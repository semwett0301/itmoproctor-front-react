import React, { FC } from 'react'
import { TextField, TextFieldPropSize } from '@consta/uikit/TextField'
import { FileField } from '@consta/uikit/FileField'
import { Text } from '@consta/uikit/Text'
import { Button, ButtonPropSize } from '@consta/uikit/Button'
import cl from './SmartFileField.module.scss'
import { IconComponent } from '@consta/icons/Icon'
import { classJoiner } from '../../../utils/common/styleClassesUtills'

type SmartFileFieldBaseProps = {
  label?: string
  size?: TextFieldPropSize & ButtonPropSize
  iconRight?: IconComponent
  iconLeft?: IconComponent
  buttonLabel?: string
  className?: string
}

interface SmartFileFieldInputProps extends SmartFileFieldBaseProps {
  type: 'input'
  fileName?: string
  fileNamePlaceholder?: string
}

interface SmartFileFieldOutputProps extends SmartFileFieldBaseProps {
  type: 'output'
  downloadFunction?: React.EventHandler<React.MouseEvent>
}

type SmartFileFieldProps = SmartFileFieldInputProps | SmartFileFieldOutputProps

const SmartFileField: FC<SmartFileFieldProps> = (props) => {
  return (
    <div className={classJoiner(cl.wrapper, props.className ?? '')}>
      {props.type === 'input' ?
        <>
          <TextField className={cl.fileNameField} label={props.label} size={props.size ?? 's'} value={props.fileName}
                     placeholder={props.fileNamePlaceholder} />
          <FileField id={'ImportFile'} className={cl.fileButtonWrapper}>
            <Button className={cl.fileButton} size={'s'} view={'secondary'} label={props.buttonLabel}
                    iconLeft={props.iconLeft} iconRight={props.iconRight} onClick={e => {
              e.preventDefault()
              e.stopPropagation()
            }} />
          </FileField>
        </> : <div className={cl.outputWrapper}>
          <Text className={cl.outputText} view={'secondary'} size={'s'}>{props.label ?? ''}</Text>
          <Button className={cl.fileButton} size={props.size ?? 's'} view={'secondary'} label={props.buttonLabel}
                  iconLeft={props.iconLeft} iconRight={props.iconRight} onClick={props.downloadFunction} />
        </div>
      }
    </div>
  )
}

export default SmartFileField
