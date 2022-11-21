import React, { FC } from 'react'
import { Text } from '@consta/uikit/Text'

interface IResolutionText {
  resolution: boolean | null
}

const ResolutionText: FC<IResolutionText> = ({ resolution }) => {
  return (
    <Text size={'s'} align={'left'} view={resolution ? 'success' : 'alert'}>
      {!resolution ?? resolution ? 'Прерван' : 'Принят'}
    </Text>
  )
}

export default ResolutionText
