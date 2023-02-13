import {FC} from 'react'
import {LoaderFunction} from 'react-router-dom'
import {SubRole} from '../../config/router/authСonfig'

export interface IRoute {
  title?: string | ((id: string) => Promise<string>)
  type?: 'tab' | 'exam' | 'user-exams'

  id: number

  path: string
  component?: FC
  children?: IRoute[]
  loader?: LoaderFunction

  subRole?: SubRole
}
