import React, { FC } from 'react'
import { presetGpnDefault, Theme } from '@consta/uikit/Theme'
import { RouterProvider } from 'react-router-dom'

import { router } from './router/router'
import ModalView from './components/shared/ModalView/ModalView'
import dayjs from 'dayjs'
import NotificationList from './components/shared/NotificationList/NotificationList'

require('dayjs/locale/ru')
dayjs.locale('ru')



export const App: FC = () => {
  return (
    <Theme preset={presetGpnDefault}>
      <NotificationList/>
      <ModalView />
      <RouterProvider router={router} />
    </Theme>
  )
}

export default App
