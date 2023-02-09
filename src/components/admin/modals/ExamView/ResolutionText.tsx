import React, { FC } from 'react'
import { Text, TextPropSize } from '@consta/uikit/Text'

interface IResolutionText {
  resolution: boolean | null
  size?: TextPropSize
}

const ResolutionText: FC<IResolutionText> = ({ resolution, size }) => {
  return (
    <Text size={size ?? 's'} align={'left'} view={!resolution ? 'alert' : 'success'} as={'span'}>
      {typeof resolution === 'boolean' ? (resolution ? 'Принят' : 'Прерван') : null}
    </Text>
  )
}

export default ResolutionText
