import React, { FC } from 'react'
import cl from './ModalTitle.module.scss'
import { Text } from '@consta/uikit/Text'
import CloseModalButton from '../../../admin/modals/CloseModalButton/CloseModalButton'

// TYPES

const ModalTitles = {
  exam: 'Карточка экзамена',
  proctor: 'Профиль пользователя',
  listener: 'Профиль пользователя'
}

export type ModalTitlesList = keyof typeof ModalTitles

interface IModalTitleProp {
  title: ModalTitlesList
}

const ModalTitle: FC<IModalTitleProp> = ({ title }) => {
  return (
    <div className={cl.title}>
      <Text size={'s'}>{ModalTitles[title]}</Text> <CloseModalButton />
    </div>
  )
}

export default ModalTitle
