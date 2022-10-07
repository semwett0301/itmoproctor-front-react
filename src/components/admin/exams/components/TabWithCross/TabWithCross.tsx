import React, { FC } from 'react'
import { cnTabsTab } from '@consta/uikit/Tabs'
import { TabItem } from '../../Exams'
import { IconClose } from '@consta/uikit/IconClose'
import cl from './TabWithCross.module.scss'
import { classJoiner } from '../../../../../utils/styleClassesUtills'
import { IconVideo } from '@consta/uikit/IconVideo'

interface TabWIthCrossProps {
  item: TabItem
  onCrossClick: (item: TabItem) => void
  onChange: React.MouseEventHandler
  checked: boolean
}

const TabWithCross: FC<TabWIthCrossProps> = ({ item, onChange, checked, onCrossClick }) => {
  return (
    <div onClick={onChange} className={classJoiner(cnTabsTab({ checked }), cl.tab)}>
      <IconVideo size='s' className={cl.icon} />
      {item.title}
      <button
        type='button'
        onClick={(event) => {
          event.stopPropagation()
          onCrossClick(item)
        }}
        className={classJoiner(cnTabsTab({ checked }), cl.crossBtn)}
      >
        <IconClose size={'xs'} />
      </button>
    </div>
  )
}

export default TabWithCross
