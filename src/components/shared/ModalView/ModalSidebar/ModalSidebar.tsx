import { Button } from '@consta/uikit/Button'
import React, { Dispatch, FC } from 'react'
import cl from './ModalSidebar.module.scss'

export interface ModalSidebarButton {
  title: string
  logo: FC
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
        <Button
          className={cl.button}
          size={'m'}
          key={e}
          label={config[e].title}
          iconLeft={config[e].logo}
          iconSize={'s'}
          view={e === chosenButton ? 'ghost' : 'clear'}
          onClick={() => setChosenButton(e)}
        />
      ))}
    </div>
  )
}

export default ModalSidebar
