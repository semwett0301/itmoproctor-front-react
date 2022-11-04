import React, {FC} from 'react'
import {cnTabsTab} from '@consta/uikit/Tabs'
import {IconClose} from '@consta/uikit/IconClose'
import cl from './TabWithCross.module.scss'
import {classJoiner} from '../../../../utils/styleClassesUtills'
import {IconVideo} from '@consta/uikit/IconVideo'
import {TabItem} from '../../../admin/Admin'
import {useNavigate} from 'react-router-dom'
import {Button} from '@consta/uikit/Button'

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

      <span className={cl.title}>{item.title}</span>

      <Button
        size={'xs'}
        onlyIcon={true}
        iconLeft={IconClose}
        view={'clear'}
        onClick={(event) => {
          event.stopPropagation()
          onCrossClick(item)
        }}
        className={cl.crossBtn}
      />
    </div>
  )
}

export default TabWithCross
