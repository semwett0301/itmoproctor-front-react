import {IHocConfig} from '../ts/interfaces/IHocConfig'
import {IRoute} from '../ts/interfaces/IRoute'
import {Route} from 'react-router-dom'
import React from 'react'
import {HocParameter} from '../ts/types/HocParameter'

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

export const createRouter: (config: IHocConfig<any>) => JSX.Element = (config) => {
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
