import dayjs, {Dayjs} from 'dayjs'

// type getStringDateType = (date: Date | string, format?: string) => string

export const getStrDate = (date: Date | string, format = 'DD.MM.YYYY hh:mm'): string =>
  dayjs(date).format(format)

export const getInitialDateRange = (): [Dayjs, Dayjs] => [
  dayjs().startOf('day'),
  dayjs().endOf('day')
]
