import { FC } from 'react'
import { LoaderFunction } from 'react-router-dom'

export interface IRoute {
  id: number
  path?: string
  component?: FC
  children?: IRoute[]
  loader?: LoaderFunction
}
