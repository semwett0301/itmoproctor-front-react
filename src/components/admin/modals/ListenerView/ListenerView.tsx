import React, { FC, useEffect, useState } from 'react'
import cl from './ListenerView.module.scss'
import ModalTitle from '../../../shared/ModalView/ModalTitle/ModalTitle'
import { SkeletonText } from '@consta/uikit/Skeleton'
import { cnMixSpace } from '@consta/uikit/MixSpace'
import ModalViewConstructor, { IRowViewItem } from '../TwoBlockModalRow/ModalViewConstructor'
import { useTranslation } from 'react-i18next'
import { request } from '../../../../api/axios/request'
import { getFullName, getShortName } from '../../../../utils/nameHelper'
import { Button } from '@consta/uikit/Button'
import { closeModal } from '../../../shared/ModalView/ModalView'
import { TabItem } from '../../Admin'
import { IUser } from '../../../../ts/interfaces/IUser'
import {openUserExams} from '../../../../utils/openUserExams';

// TYPES
interface IListenerViewProp {
  profileId: string
  openTab?: (item: TabItem) => void
}

const ListenerView: FC<IListenerViewProp> = ({ profileId, openTab }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'shared' })

  const [items, setItems] = useState<IRowViewItem[]>([])
  const [user, setUser] = useState<IUser>()

  useEffect(() => {
    request.exam.getProfile(profileId).then((r) => {
      const data = r.data
      setUser(data)
      const ii: IRowViewItem[] = [
        {
          title: 'Логин',
          content: data.username
        },
        {
          title: 'Провайдер',
          content: t(`providers.${data.provider}`)
        },
        {
          title: 'Роль в системе',
          content: t(`roles.${data.role}`)
        },
        {
          title: 'Статус',
          content: t(`active.${data.active}`)
        },
        {
          title: 'ФИО',
          content: getFullName(data.lastname, data.firstname, data.middlename)
        },
        {
          title: 'Пол',
          content: t(`genders.${data.gender}`)
        },
        {
          title: 'Дата рождения',
          content: data.birthday
        },
        {
          title: 'Электронная почта',
          content: data.email
        },
        {
          title: 'Университет',
          content:
            data.organization.shortName || data.organization.fullName || data.organization._id
        },
        {
          title: 'Гражданство',
          content: data.citizenship
        },
        {
          title: 'Тип документа',
          content: data.documentType
        },
        {
          title: 'Серия и номер',
          content: data.documentNumber
        },
        {
          title: 'Дата выдачи',
          content: data.documentIssueDate
        },
        {
          title: 'Почтовый адресс',
          content: data.address
        },
        {
          title: 'Образование',
          content: data.description
        }
      ]
      setItems(ii)
    })
  }, [profileId, t])
  return (
    <div className={cl.wrapper}>
      <ModalTitle title={'listener'} />
      {!user ? (
        <SkeletonText rows={10} fontSize='s' lineHeight={'l'} />
      ) : (
        <div className={cnMixSpace({ pH: 'm', pV: 's' })}>
          <>
            <ModalViewConstructor items={items} />
            {openTab && (
              <Button
                label={'Все экзамены'}
                view={'secondary'}
                size={'s'}
                onClick={() => {
                  if (openTab) {
                    openUserExams(openTab, user)
                  }
                  closeModal()
                }}
              />
            )}
          </>
        </div>
      )}
    </div>
  )
}

export default ListenerView
