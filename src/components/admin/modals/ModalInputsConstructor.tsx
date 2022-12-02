import React, { FC } from 'react'
import { Layout } from '@consta/uikit/Layout'
import { TextField } from '@consta/uikit/TextField'

type baseProps = {
  label: string
  flex?: number
}

interface InputItem extends baseProps {
  // type: 'text' | 'textarea' | 'number'
  placeholder: string
  value: string | null
  // onChange: (value: string) => void
  rows?: number
  required?: boolean
}

// type SelectItem = {
//   type: 'text' | 'textarea' | 'number'
//   placeholder: string
//   label: string
//   value: string | null
//   onChange: (value: string) => void
//   rows?: number
//   required?: boolean
//   flex?: number
// }

type ModalItem = InputItem

type ItemArray = ModalItem | ModalItem[]

interface IModalInputsConstructor {
  items: ItemArray[]
}

const ModalInputsConstructor: FC<IModalInputsConstructor> = ({ items }) => {
  return (
    <Layout direction={'column'}>
      {items.map((item) => {
        if (Array.isArray(item)) {
          return (
            <div key={undefined} style={{ display: 'flex' }}>
              {item.map((i) => (
                <div key={i.label}>
                  <TextField label={i.label} value={i.value} placeholder={i.placeholder} />
                </div>
              ))}
            </div>
          )
        } else {
          return (
            <div key={item.label}>
              {<TextField label={item.label} value={item.value} placeholder={item.placeholder} />}
            </div>
          )
        }
      })}
    </Layout>
  )
}

export default ModalInputsConstructor
