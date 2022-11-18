import React, { FC } from 'react'
import { Layout } from '@consta/uikit/Layout'
import { Text } from '@consta/uikit/Text'

// TYPES
interface ITwoBlockModalRowProp {
  title: string
  content: string
}

const TwoBlockModalRow: FC<ITwoBlockModalRowProp> = ({ title, content }) => {
  return (
    <Layout direction={'row'}>
      <Layout flex={1}>
        <Text size={'s'} align={'left'} view={'ghost'}>
          {title}
        </Text>
      </Layout>
      <Layout flex={1}>
        <Text size={'s'} align={'left'}>
          {content}
        </Text>
      </Layout>
    </Layout>
  )
}

export default TwoBlockModalRow
