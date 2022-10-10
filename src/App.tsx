import React, { useEffect, useMemo } from 'react'
import { Theme, presetGpnDefault } from '@consta/uikit/Theme'
import MainRouter from './router/MainRouter'
import { useRequest } from './hooks/requestHooks'
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'
import { setUserActionCreator } from './store/reducers/userReducer/userActionCreators'
import { userLoadedActionCreator } from './store/reducers/userLoaded/userLoadedActionCreators'
import Loading from './components/shared/loading/Loading'

function App() {
  const request = useRequest()
  const dispatch = useAppDispatch()
  const userLoaded: boolean = useAppSelector((state) => state.userLoaded)
  const isLoading: boolean = useAppSelector((state) => state.isLoading)

  useEffect(() => {
    const checkSession: () => Promise<void> = async () => {
      if (!userLoaded) {
        await request.profile
          .getProfileBySession()
          .then(async (r) => {
            dispatch(setUserActionCreator(r.data))
            dispatch(userLoadedActionCreator())
          })
          .catch(() => dispatch(userLoadedActionCreator()))
      }
    }

    checkSession().catch((e) => console.log(e))
  }, [])

  return (
    <Theme preset={presetGpnDefault}>
      {isLoading ? <Loading /> : <></>}
      {userLoaded ? <MainRouter /> : <></>}
    </Theme>
  )
}

export default App
