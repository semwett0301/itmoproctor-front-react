import React, { FC } from 'react'
import { IconSearch } from '@consta/uikit/IconSearch'
import { TextField, TextFieldPropOnChange } from '@consta/uikit/TextField'

interface ISearchFieldProp {
  value: string | null
  onChange: TextFieldPropOnChange
}

const SearchField: FC<ISearchFieldProp> = ({ value, onChange }) => {
  return (
    <TextField
      onChange={onChange}
      value={value}
      placeholder='Поиск по экзамену'
      leftSide={IconSearch}
      width={'full'}
      size='s'
    />
  )
}

export default SearchField
