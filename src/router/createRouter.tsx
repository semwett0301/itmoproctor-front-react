import {IHocConfig} from '../ts/interfaces/IHocConfig'
import {IRoute} from '../ts/interfaces/IRoute'
import {Route} from 'react-router-dom'
import React from 'react'
import {HocParameter} from '../ts/types/HocParameter'

const routeHelper: (
  hocs: HocParameter[],
  condition: any,
  route: IRoute
) => JSX.Element | JSX.Element[] = (hocs, condition, route) => {
  let hocBackup: HocParameter[] = []

  const hocHelper = () => {
    if (hocs.length !== 0) {
      const hocParameter: HocParameter = hocs[0]
      hocs = hocs.slice(1, hocs.length)
      hocBackup.push(hocParameter)
      return (
        <Route key={hocParameter.id} element={<hocParameter.hoc condition={condition} />}>
          {routeHelper(hocs, condition, route)}
        </Route>
      )
    } else {
      if (!route.children) {
        return (
          <Route
            key={route.id}
            path={route?.path}
            element={route.component ? <route.component /> : ''}
            loader={route?.loader}
          />
        )
      } else {
        hocs = hocBackup
        hocBackup = []
        return (
          <Route
            key={route.id}
            path={route.path}
            element={route.component ? <route.component /> : ''}
            loader={route?.loader}
          >
            {route.children.map((elem) => routeHelper(hocs, condition, elem))}
          </Route>
        )
      }
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
