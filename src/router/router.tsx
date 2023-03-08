import {IHocConfig} from '../ts/interfaces/IHocConfig'
import {IRoute} from '../ts/interfaces/IRoute'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import React from 'react'
import {HocParameter} from '../ts/types/HocParameter'
import store from '../store'
import { request } from '../api/axios/request'
import { setUserActionCreator } from '../store/reducers/userReducer/userActionCreators'
import { userLoadedActionCreator } from '../store/reducers/userLoaded/userLoadedActionCreators'
import routerHocConfig from '../config/router/routerHocConfig'

const routeHelper: (
  hoc: HocParameter,
  condition: any,
  route: IRoute
) => JSX.Element | JSX.Element[] = (hoc, condition, route) => {

  const hocHelper = (): JSX.Element => {
    if (!route.children) {
      return (
        <Route element={<hoc.hoc condition={condition} route={route}/>}>
          <Route
            key={route.id}
            path={route?.path}
            element={route.component ? <route.component/> : ''}
            loader={route?.loader}
          />
        </Route>
      )
    } else {
      return (
        <Route element={<hoc.hoc condition={condition} route={route}/>}>
          <Route
            key={route.id}
            path={route.path}
            element={route.component ? <route.component/> : ''}
            loader={route?.loader}
          >
            {route.children.map((elem) => routeHelper(hoc, condition, elem))}
          </Route>
        </Route>
      )

    }
  }

  return hocHelper()
}

const createRouter: (config: IHocConfig<any>) => JSX.Element = (config) => {
  const data = config.data
  const hocs = config.value

  return (
    <Route key={config.id}>
      {data.map((elem) => {
        return elem.routes.map((route) => routeHelper(hocs, elem.condition, route))
      })}
    </Route>
  )
}

const checkAuth: () => void = async () => {
  if (!store.getState().userLoaded) {
    await request.profile
      .getProfileBySession()
      .then((r) => {
        store.dispatch(setUserActionCreator(r.data))
        store.dispatch(userLoadedActionCreator())
      })
      .catch(() => {
        return store.dispatch(userLoadedActionCreator())
      })
  }
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    // TODO убрать error элемент и дабавить в конфиг для каждого роута собственный, чтобы отлавливать ошибки
    <Route
      loader={checkAuth}
      // errorElement={<NotFound />}
    >
      {routerHocConfig.map((elem) => createRouter(elem))}
    </Route>
  )
)
