import React, {FC} from 'react'
import {IconSearch} from '@consta/uikit/IconSearch'
import {TextField, TextFieldPropOnChange} from '@consta/uikit/TextField'

interface ISearchFieldProp {
  value: string | null
  onChange: TextFieldPropOnChange
  placeholder?: string
}

const SearchField: FC<ISearchFieldProp> = ({ value, onChange, placeholder }) => {
  return (
    <TextField
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      leftSide={IconSearch}
      width={'full'}
      size='s'
    />
  )
}

export default SearchField
