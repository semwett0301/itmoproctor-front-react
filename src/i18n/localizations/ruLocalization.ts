import { ILocalization } from './engLocalization'

export const ruLocalization: ILocalization = {
  translation: {
    unauthorized: {
      auth: {
        login: 'Логин',
        password: 'Пароль',
        signIn: 'Войти'
      },
      installing: {
        name: 'Система прокторинга от ИТМО',
        download: 'Скачать',
        version: 'версия',
        from: 'от',
        other: 'Другие версии приложения',
        forEach: 'Для',
        prevVersion: 'Предыдущая версия',
        nextVersion: 'Следующая версия'
      }
    },
    student: {
      name: 'Имя студента'
    },
    proctor: {},
    admin: {
      users: {
        table: {
          roles: {
            1: 'Слушатель',
            2: 'Проктор',
            3: 'Администратор',
            expert: 'Эксперт'
          },
          providers: {
            local: 'Локальный',
            openedu: 'OpenEdu'
          }
        }
      }
    },
    shared: {}
  }
}
