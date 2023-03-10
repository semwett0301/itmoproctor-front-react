import React, {FC, Ref} from 'react'
import {TextField, TextFieldPropSize, TextFieldPropStatus} from '@consta/uikit/TextField'
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
  id: string
  required?: boolean
  inputRef?: Ref<HTMLInputElement>
  onInputFile?: (e: DragEvent | React.ChangeEvent) => void;
  fileName?: string
  fileNamePlaceholder?: string
  status?: TextFieldPropStatus,
  caption?: string
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
          <TextField className={cl.fileNameField} label={props.label} required={props.required} size={props.size ?? 's'} value={props.fileName}
                     placeholder={props.fileNamePlaceholder} status={props.status} caption={props.caption} />
          <FileField id={props.id} className={cl.fileButtonWrapper} onChange={props.onInputFile} inputRef={props.inputRef}>
            <Button className={cl.fileButton} size={'s'} as={'div'} view={'secondary'} label={props.buttonLabel}
                    iconLeft={props.iconLeft} iconRight={props.iconRight} />
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
