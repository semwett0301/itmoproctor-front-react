import React, {FC} from 'react'
import cl from './SidebarItem.module.scss'
import {classWatcher} from '../../../../../utils/common/styleClassesUtills'

type SidebarItemProps = {
  logo: JSX.Element
  text: string
  onClick: () => void
  chosen: boolean
  className: string
}

const SidebarItem: FC<SidebarItemProps> = ({ logo, text, onClick, chosen, className }) => {
  return (
    <div
      className={classWatcher(chosen, cl.typical_element, cl.chosen_element, cl.wrapper, className)}
      onClick={onClick}
    >
      <div className={cl.logo}>{logo}</div>
      <span className={cl.text}>{text}</span>
    </div>
  )
}

export default SidebarItem
