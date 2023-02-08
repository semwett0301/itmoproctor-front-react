import React, {Dispatch, FC} from 'react'
import cl from './ModalSidebar.module.scss'
import SidebarItem from './SidebarItem/SidebarItem'

export interface ModalSidebarButton {
  title: string
  logo: JSX.Element
}

type ModalSidebarProps = {
  config: {
    [key: string]: ModalSidebarButton
  }
  chosenButton: string
  setChosenButton: Dispatch<string>
}

const ModalSidebar: FC<ModalSidebarProps> = ({ config, chosenButton, setChosenButton }) => {
  return (
    <div className={cl.wrapper}>
      {Object.keys(config).map((e) => (
        <SidebarItem
          logo={config[e].logo}
          text={config[e].title}
          onClick={() => setChosenButton(e)}
          chosen={e === chosenButton}
          className={cl.button}
          key={e}
        />
      ))}
    </div>
  )
}

export default ModalSidebar
