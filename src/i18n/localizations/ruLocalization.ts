import { ILocalization } from './engLocalization'

export const ruLocalization: ILocalization = {
  translation: {
    unauthorized: {
      auth: {
        login: 'Логин',
        password: 'Пароль',
        signIn: 'Войти',
        or: 'или',
        openEdu: 'войти через “Открытое образование”'
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
      users: {}
    },
    shared: {
      examTypes: {
        true: 'Асинхронный',
        false: 'Синхронный'
      },
      minutesPlurals: {
        counter_zero: '{{count}} минут',
        counter_one: '{{count}} минута',
        counter_two: '{{count}} минуты',
        counter_few: '{{count}} минуты',
        counter_many: '{{count}} минут'
      },
      genders: {
        male: 'Мужской',
        female: 'Женский'
      },
      providers: {
        local: 'Локальный',
        openedu: 'OpenEdu'
      },
      roles: {
        1: 'Слушатель',
        2: 'Проктор',
        3: 'Администратор',
        expert: 'Эксперт'
      },
      active: {
        true: 'Активный',
        false: 'Не активный'
      }
    }
  }
}
