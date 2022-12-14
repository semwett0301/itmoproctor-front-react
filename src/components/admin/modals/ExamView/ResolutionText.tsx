import React, { FC } from 'react'
import { Text } from '@consta/uikit/Text'

interface IResolutionText {
  resolution: boolean | null
}

const ResolutionText: FC<IResolutionText> = ({ resolution }) => {
  return (
    <Text size={'s'} align={'left'} view={resolution ? 'alert' : 'success'}>
      {resolution ? (resolution ? 'Принят' : 'Прерван') : null}
    </Text>
  )
}

export default ResolutionText
