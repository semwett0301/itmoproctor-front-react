import {Item} from '../ts/types/Item';

export const languages: Item[] = [
  {
    label: 'Русский',
    id: 'ru'
  },
  {
    label: 'English',
    id: 'en'
  }
]

export const findLang = (name: string): Item => {
  const item: Item = {
    label: 'Русский',
    id: 'ru'
  }
  const checkItem: Item | undefined = languages.find((i) => i.id === name)
  return checkItem === undefined ? item : checkItem
}
