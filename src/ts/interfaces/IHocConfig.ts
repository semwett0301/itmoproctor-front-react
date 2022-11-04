import {FC} from 'react'
import {HocPropsType} from '../types/HocPropsType'
import {IRoute} from './IRoute'

export interface IHocParameter<T> {
  id: number
  hoc: FC<HocPropsType<T>>
}

export interface IHocData<T> {
  id: number
  condition?: T
  routes: IRoute[]
}

export interface IHocConfig<T = undefined> {
  id: number
  value: IHocParameter<T>[]
  data: IHocData<T>[]
}
