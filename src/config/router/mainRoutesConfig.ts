import {RoleEnum} from './authСonfig'

type MainRoutesConfig = {
  [key in RoleEnum]: string
}

export const mainRoutesConfig: MainRoutesConfig = {
  'ALL': '/',
  'UNAUTHORIZED': '/login',
  'STUDENT': '/student',
  'PROCTOR': '/proctor',
  'ADMIN': '/admin/exams'
}
