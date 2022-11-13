import React, {FC} from 'react'
import {presetGpnDefault, Theme} from '@consta/uikit/Theme'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import routerHocConfig from './config/routerHocConfig'
import {createRouter} from './router/createRouter'
import {useAppDispatch, useAppSelector} from './hooks/reduxHooks'
import {setUserActionCreator} from './store/reducers/userReducer/userActionCreators'
import {userLoadedActionCreator} from './store/reducers/userLoadedReducer/userLoadedActionCreators'
import {request} from './api/axios/request'

export const App: FC = () => {
  const dispatch = useAppDispatch()
  const userLoaded = useAppSelector((state) => state.userLoaded)

  const checkAuth: () => void = async () => {
    if (!userLoaded) {
      await request.profile
        .getProfileBySession()
        .then((r) => {
          dispatch(setUserActionCreator(r.data))
          dispatch(userLoadedActionCreator())
        })
        .catch(() => {
          return dispatch(userLoadedActionCreator())
        })
    }
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route loader={checkAuth}>{routerHocConfig.map((elem) => createRouter(elem))}</Route>
    )
  )

  return (
    <Theme preset={presetGpnDefault}>
      <RouterProvider router={router} />
    </Theme>
  )
}

export default App
