import { IHocConfig } from '../ts/interfaces/IHocConfig'
import { IRoute } from '../ts/interfaces/IRoute'
import { Route } from 'react-router-dom'
import React from 'react'
import { HocParameter } from '../ts/types/HocParameter'

export const createRouter: (config: IHocConfig<any>) => JSX.Element = (config) => {
  const data = config.data
  const routeHelper: (obj: IRoute) => JSX.Element = (obj) => {
    if (obj.children) {
      return (
        <Route
          key={obj.id}
          path={obj.path}
          element={obj.component ? <obj.component /> : ''}
          loader={obj.loader}
        >
          {obj.children.map((item: IRoute) => routeHelper(item))}
        </Route>
      )
    }
    return (
      <Route
        key={obj.id}
        path={obj.path}
        element={obj.component ? <obj.component /> : ''}
        loader={obj.loader}
      />
    )
  }
  return (
    <Route key={config.id}>
      {data.map((elem) => {
        if (Array.isArray(config.value)) {
          const hocWrapper: (hocs: HocParameter[]) => JSX.Element | JSX.Element[] = (hocs) => {
            if (hocs.length !== 0) {
              const hocParameter: HocParameter = hocs[0]
              hocs = hocs.slice(1, hocs.length)
              return (
                <Route
                  key={hocParameter.id}
                  element={<hocParameter.hoc condition={elem.condition} />}
                >
                  {hocWrapper(hocs)}
                </Route>
              )
            } else {
              return elem.routes.map((route) => routeHelper(route))
            }
          }

          return hocWrapper(config.value)
        } else {
          return (
            <Route key={config.value.id} element={<config.value.hoc condition={elem.condition} />}>
              {elem.routes.map((route) => routeHelper(route))}
            </Route>
          )
        }
      })}
    </Route>
  )
}
