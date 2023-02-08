import {IFactors} from '../../../ts/interfaces/IExam'
import {IconComponent} from '@consta/uikit/Icon'
import {IconWorldStroked} from '@consta/uikit/IconWorld'
import {IconBook} from '@consta/uikit/IconBook'
import {IconDocFilled} from '@consta/uikit/IconDocFilled'
import {IconMeatball} from '@consta/uikit/IconMeatball'
import {IconChatStroked} from '@consta/uikit/IconChat'
import {IconCalculator} from '@consta/uikit/IconCalculator'
import {IconTable2} from '@consta/uikit/IconTable2'
import {IconTeam} from '@consta/uikit/IconTeam'
import {IconExit} from '@consta/uikit/IconExit'
import {IconEyeClose} from '@consta/uikit/IconEyeClose'
import {IconUser} from '@consta/uikit/IconUser'
import {IconDinosaur} from '@consta/uikit/IconDinosaur'

export type IFactorsConfig = {
  [key in keyof IFactors]: { component: IconComponent; content: string }
}
export const factorsConfig: IFactorsConfig = {
  /* eslint-disable camelcase*/
  web_sites: { component: IconWorldStroked, content: 'Использование веб-сайтов' },
  books: { component: IconBook, content: 'Использование книг' },
  papersheet: { component: IconDocFilled, content: 'Использование черновиков' },
  messengers: { component: IconChatStroked, content: 'Использование мессенджеров' },
  calculator: { component: IconCalculator, content: 'Использование калькулятора' },
  excel: { component: IconTable2, content: 'Использование Excel' },
  human_assistant: { component: IconTeam, content: 'Помощь людей' },
  absence: { component: IconExit, content: 'Выход из поля обзора веб-камеры' },
  gaze_averted: { component: IconEyeClose, content: 'Увод взгляда' },
  // TODO сменить иконку на новую, когда конста добавит
  voices: { component: IconUser, content: 'Голоса' },
  custom_rules: { component: IconMeatball, content: 'Дополнительные правила отсутствуют' },

  // Не учитывать
  asynchronous: { component: IconDinosaur, content: 'Не учитывается' }
  /* eslint-enable camelcase*/
}
