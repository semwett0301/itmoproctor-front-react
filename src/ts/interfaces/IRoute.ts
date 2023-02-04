import {FC} from 'react'
import {LoaderFunction} from 'react-router-dom'
import {SubRole} from '../../config/authСonfig';

export interface IRoute {
  id: number
  path?: string
  component?: FC
  children?: IRoute[]
  loader?: LoaderFunction,
  subRole?: SubRole
}
