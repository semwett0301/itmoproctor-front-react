import {ILocalization} from './engLocalization'

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
      usersImport: {
        "title": "Импорт пользователей",
        "importButton": "Импорт",
        "closeButton": "Закрыть",
        "filebox": "Файл",
        "fileboxButton": "Выбрать",
        "fileboxPrompt": "CSV файл (с заголовком)",
        "exampleFile": "Пример файла",
        "exampleFileButton": "Загрузить",
        "fields": {
          "lastname": "Фамилия",
          "firstname": "Имя",
          "middlename": "Отчество",
          "role": "Роль (\"слушатель\", \"проктор\", \"эксперт\")",
          "gender": "Пол (\"м\", \"ж\")",
          "birthday": "Дата рождения (\"DD.MM.YYYY\")",
          "email": "Электронный адрес",
          "citizenship": "Гражданство (трехбуквенный код)",
          "address": "Почтовый адрес",
          "documentType": "Тип документа",
          "documentNumber": "Номер документа",
          "documentIssueDate": "Дата выдачи документа (\"DD.MM.YYYY\")",
          "username": "Логин",
          "password": "Пароль"
        },
        "successText": "Загружено %{actual} из %{expected} пользователей",
        "errorTitle": "Ошибки",
        "errors": {
          "unknown": "Неизвестная ошибка",
          "requestTooLarge": "Файл слишком большой",
          "incorrectRowCount": "Некорректное число строк: %{actual} вместо %{expected}",
          "incorrectColumnCount": "Строка %{rowNumber}: Некорректное число столбцов: %{actual} вместо %{expected}",
          "incorrectField": "Строка %{rowNumber}: Поле «<i>%{field}</i>» некорректное: «<i>%{value}</i>». Причина: %{reason}"
        },
        "errorReasons": {
          "required": "Обязательное поле",
          "incorrectFormat": "Некорректный формат"
        }
      }
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
      },
      settings: {
        errors: {
          webcam: {
            InvalidStateError: 'Неизвестная ошибка, попробуйте запустить видеосвязь повторно',
            NotAllowedError: 'Не даны разрешения на использование веб-камеры или микрофона, или разрешения были отклонены пользователем',
            NotAllowedErrorState: 'Не даны разрешения на трансляцию видеосвязи, или разрешения были отклонены пользователем',
            NotAllowedErrorPermission: 'Разрешение на использование веб-камеры или микрофона было отклонено пользователем',
            NotAllowedErrorPermissionSystem: 'Не даны разрешения на использование веб-камеры или микрофона',
            NotAllowedErrorRequest: 'Разрешение на использование веб-камеры или микрофона было отклонено пользователем',
            NotFoundError: 'Не даны разрешения на использование веб-камеры, либо устройства не подключены к компьютеру или отключены в системе',
            NotFoundErrorDevice: 'Веб-камера или микрофон не подключены к компьютеру или отключены в системе',
            NotFoundErrorObjectNotFound: 'Веб-камера или микрофон не подключены к компьютеру или отключены в системе',
            NotReadableError: 'Не даны разрешения на использование микрофона, или веб-камера уже используется',
            NotReadableErrorStartVideo: 'Веб-камера уже используется другим приложением',
            NotReadableErrorAllocateVideo: 'Не даны разрешения на использование веб-камеры, или веб-камера уже используется',
            OverconstrainedError: 'Установлены некорректные настройки',
            TypeError: 'Веб-камера или микрофон не подключены к компьютеру или отключены в системе',
            Default: 'Неизвестная ошибка, попробуйте запустить видеосвязь повторно'
          },
          screen: {
            NotAllowedErrorPermission: 'Разрешение на трансляцию экрана было отклонено пользователем',
            NotAllowedErrorRequest: 'Разрешение на трансляцию экрана было отклонено пользователем'
          }
        }
      }
    }
  }
}
