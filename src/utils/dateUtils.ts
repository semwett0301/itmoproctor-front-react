import dayjs from 'dayjs'

// type getStringDateType = (date: Date | string, format?: string) => string

export const getStrDate = (date: Date | string, format = 'DD.MM.YYYY hh:mm'): string =>
  dayjs(date).format(format)
