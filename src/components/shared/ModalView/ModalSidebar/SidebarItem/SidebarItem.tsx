import React, { FC, useMemo } from 'react'
import cl from './SidebarItem.module.scss'

type SidebarItemProps = {
  logo: JSX.Element
  text: string
  onClick: () => void
  chosen: boolean
  className: string
}

const SidebarItem: FC<SidebarItemProps> = ({ logo, text, onClick, chosen, className }) => {
  const textClass: string = useMemo<string>(
    () => (chosen ? cl.chosen_element : cl.typical_element),
    [chosen]
  )

  return (
    <div className={cl.wrapper + ' ' + className} onClick={onClick}>
      <div className={cl.logo}>{logo}</div>
      <span className={cl.text + ' ' + textClass}>{text}</span>
    </div>
  )
}

export default SidebarItem
