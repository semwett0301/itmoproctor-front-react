import { tagStatusesDeclaration } from '../StatusTag/StatusTag'

export const statuses: tagStatusesDeclaration = {
  unplanned: { label: 'Не запланирован', className: 'unplanned' },
  missed: { label: 'Пропущен', className: 'missed' },
  planned: { label: 'Запланирован', className: 'planned' },
  success: { label: 'Принят', className: 'success' },
  waiting: { label: 'Ожидает ', className: 'waiting' },
  conclusionWaiting: { label: 'Ожидает заключение', className: 'conclusionWaiting' },
  async: { label: 'Асинхронно', className: 'async' },
  withProctor: { label: 'С проктором', className: 'withProctor' },
  forming: { label: 'Формируется', className: 'forming' },
  review: { label: 'На проверке', className: 'review' },
  withoutProctor: { label: 'Без проктора', className: 'withoutProctor' },
  rejected: { label: 'Отклонен', className: 'rejected' },
  noAppearance: { label: 'Неявка', className: 'noAppearance' },
  exceptPlanned: { label: 'Кроме запланированных', className: 'exceptPlanned' },
  interrupted: { label: 'Прерван', className: 'interrupted' },
  reset: { label: 'Сброшен', className: 'interrupted' },
  notReset: { label: 'Не сброшен', className: 'forming' }
}
