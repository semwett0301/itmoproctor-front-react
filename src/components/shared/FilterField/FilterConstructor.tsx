import React, { FC, ReactNode } from 'react'
import { Layout } from '@consta/uikit/Layout'
import { cnMixSpace } from '@consta/uikit/MixSpace'
import cl from './FilterField.module.scss'
import { classJoiner } from '../../../utils/styleClassesUtills'

interface IFilterComponent {
  key: string | number
  component: ReactNode
  flex?: number
}

interface IFilterComponentArray {
  key: string | number
  components: IFilterComponent[]
}
interface IFilterConstructorProps {
  items: IFilterComponentArray[]
}

const FilterConstructor: FC<IFilterConstructorProps> = ({ items }) => {
  const blockClass = cnMixSpace({
    mH: 's',
    mT: 's'
  })

  const rowClass = classJoiner(
    cnMixSpace({
      mB: 's'
    }),
    cl.rowWrapper
  )

  if (items.length === 1) {
    return (
      <Layout direction={'row'} className={classJoiner(blockClass, rowClass)}>
        {items[0].components.map((item) => (
          <Layout flex={item.flex} key={item.key}>
            {item.component}
          </Layout>
        ))}
      </Layout>
    )
  } else {
    return (
      <Layout direction={'column'} className={blockClass}>
        {items.map((row) => (
          <Layout direction={'row'} key={row.key} className={rowClass}>
            {row.components.map((item) => (
              <Layout flex={item.flex} key={item.key}>
                {item.component}
              </Layout>
            ))}
          </Layout>
        ))}
      </Layout>
    )
  }
}

export default FilterConstructor
