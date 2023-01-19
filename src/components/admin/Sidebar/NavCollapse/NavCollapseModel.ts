import { IconBag } from '@consta/uikit/IconBag'
import { IconLayers } from '@consta/uikit/IconLayers'
import { IconCalendar } from '@consta/uikit/IconCalendar'
import { IconFolders } from '@consta/uikit/IconFolders'
import { IconLineAndBarChart } from '@consta/uikit/IconLineAndBarChart'
import { IconTeam } from '@consta/uikit/IconTeam'
import { IconOperators } from '@consta/uikit/IconOperators'
import { IconComponent } from '@consta/uikit/Icon'
import { IconWrench } from '@consta/uikit/IconWrench'
import { RoleEnum } from '../../../../config/authСonfig'
import store from '../../../../store'

export type ICollapseItem = {
  path: string
  icon: IconComponent
  title: string
  children?: ICollapseItem[]
  condition?: string
}

export const SystemAdminCollapseItems: ICollapseItem[] = [
  { path: 'exams', icon: IconFolders, title: 'Экзамены' },
  { path: 'users', icon: IconTeam, title: 'Пользователи' },
  { path: 'schedule', icon: IconCalendar, title: 'Расписание' },
  { path: 'courses', icon: IconLayers, title: 'Курсы' },
  { path: 'organizations', icon: IconBag, title: 'Университеты' },
  { path: 'maintenance', icon: IconWrench, title: 'Тех.Работы', condition: 'system' },
  {
    path: '',
    icon: IconLineAndBarChart,
    title: 'Статистика',
    children: [
      { path: '', icon: IconTeam, title: 'Пользователи' },
      { path: '', icon: IconFolders, title: 'Экзамены' },
      { path: '', icon: IconCalendar, title: 'Расписание' },
      { path: '', icon: IconOperators, title: 'Прокторы' }
    ]
  }
]

export const UniversityAdminCollapseItems: ICollapseItem[] = [
  { path: 'exams', icon: IconFolders, title: 'Экзамены' },
  { path: 'users', icon: IconTeam, title: 'Пользователи' },
  { path: 'schedule', icon: IconCalendar, title: 'Расписание' },
  { path: 'courses', icon: IconLayers, title: 'Курсы' },
  { path: 'maintenance', icon: IconWrench, title: 'Тех.Работы', condition: 'system' },
  {
    path: '',
    icon: IconLineAndBarChart,
    title: 'Статистика',
    children: [
      { path: '', icon: IconTeam, title: 'Пользователи' },
      { path: '', icon: IconFolders, title: 'Экзамены' },
      { path: '', icon: IconCalendar, title: 'Расписание' },
      { path: '', icon: IconOperators, title: 'Прокторы' }
    ]
  }
]

export const getSidebarItems = (): ICollapseItem[] => {
  const state = store.getState()
  if (state.user.system) {
    return SystemAdminCollapseItems
  }
  switch (state.user.role) {
    case RoleEnum.ADMIN:
      return UniversityAdminCollapseItems
    case RoleEnum.PROCTOR:
      return []
    default:
      return []
  }
}
