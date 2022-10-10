import React, { FC } from 'react'
import { cnTabsTab } from '@consta/uikit/Tabs'
import { IconClose } from '@consta/uikit/IconClose'
import cl from './TabWithCross.module.scss'
import { classJoiner } from '../../../../../utils/styleClassesUtills'
import { IconVideo } from '@consta/uikit/IconVideo'
import { TabItem } from '../../../Admin'
import { useNavigate } from 'react-router-dom'

interface TabWIthCrossProps {
   item: TabItem
   onCrossClick: (item: TabItem) => void
   onChange: React.MouseEventHandler
   checked: boolean
}

const TabWithCross: FC<TabWIthCrossProps> = ({ item, onChange, checked, onCrossClick }) => {
   const navigate = useNavigate()

   return (
      <div
         onClick={(event) => {
            navigate(item.path)
            onChange(event)
         }}
         className={classJoiner(cnTabsTab({ checked }), cl.tab)}
      >
         {item.type === 'exam' ? <IconVideo size='s' className={cl.icon} /> : null}

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
