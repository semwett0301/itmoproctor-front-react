import React, {FC} from 'react'
import cn from './ViolationIcon.module.scss'
import {ViolationsNames} from '../../../../../ts/interfaces/IExam'
import {IconWarning} from '@consta/uikit/IconWarning'

// TYPES
type IViolationsClasses = {
  [key in ViolationsNames]: string
}

// CONSTANTS
const violationsClasses: IViolationsClasses = {
  noFaces: cn.noFaces,
  severalFaces: cn.severalFaces,
  noSounds: cn.noSounds
}

interface IViolationIconProp {
  violationName: ViolationsNames
}

const ViolationIcon: FC<IViolationIconProp> = ({ violationName }) => {
  return <IconWarning size={'xs'} className={violationsClasses[violationName]} />
}

export default ViolationIcon
