import React, { FC, useState } from 'react'
import ModalTitle from '../../../shared/ModalView/ModalTitle/ModalTitle'
import ModalSidebar, {
  ModalSidebarButton
} from '../../../shared/ModalView/ModalSidebar/ModalSidebar'
import { IconVideo } from '@consta/uikit/IconVideo'
import { IconScreen } from '@consta/uikit/IconScreen'
import { IconWorldFilled } from '@consta/uikit/IconWorldFilled'
import { IconInfo } from '@consta/uikit/IconInfo'
import VideoSettings from './VideoSettings/VideoSettings'

import cl from './SettingsView.module.scss'
import { Layout } from '@consta/uikit/Layout'

interface SettingsConfigElement extends ModalSidebarButton {
  component?: JSX.Element
}

type SettingsConfig = {
  [key: string]: SettingsConfigElement
}

const settingsConfig: SettingsConfig = {
  video: {
    title: 'Веб-камера',
    logo: IconVideo,
    component: <VideoSettings />
  },
  screen: {
    title: 'Экран',
    logo: IconScreen
  },
  network: {
    title: 'Сеть',
    logo: IconWorldFilled
  },
  system: {
    title: 'Система',
    logo: IconInfo
  }
}

const SettingsView: FC = () => {
  const [chosenButton, setChosenButton] = useState<string>('video')

  return (
    // <div className={cl.wrapper}>
    <Layout className={cl.wrapper} direction={'column'}>
      <Layout>
        <div className={cl.header}>
          <ModalTitle title={'settings'} />
        </div>
      </Layout>
      <Layout className={cl.content}>
        <Layout flex={1} className={cl.sidebar}>
          <ModalSidebar
            config={settingsConfig}
            chosenButton={chosenButton}
            setChosenButton={setChosenButton}
          />
        </Layout>
        <Layout flex={3}>{settingsConfig[chosenButton]?.component}</Layout>
      </Layout>
    </Layout>
  )
}

export default SettingsView
