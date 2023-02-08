import React, {FC, useEffect, useState} from 'react'
import cl from './ListenerView.module.scss'
import ModalTitle from '../../../shared/ModalView/ModalTitle/ModalTitle'
import {SkeletonText} from '@consta/uikit/Skeleton'
import {cnMixSpace} from '@consta/uikit/MixSpace'
import ModalViewConstructor, {IRowViewItem} from '../TwoBlockModalRow/ModalViewConstructor'
import {useTranslation} from 'react-i18next'
import {request} from '../../../../api/axios/request'
import {getFullName} from '../../../../utils/common/nameHelper'
import {Button} from '@consta/uikit/Button'
import {closeModal} from '../../../shared/ModalView/ModalView'
import {IUserApp} from '../../../../ts/interfaces/IUserApp'
import {openUserExams} from '../../../../utils/admin/openUserExams'
import {getCitizenItem} from '../../../shared/SmartSelect/items/citizenships'
import {getDocumentTypeItem} from '../../../shared/SmartSelect/items/documents'
import {TabItem} from '../../../shared/NavTabs/NavTabs';

// TYPES
interface IListenerViewProp {
  profileId: string
  openTab?: (item: TabItem) => void
}

const ListenerView: FC<IListenerViewProp> = ({ profileId, openTab }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'shared' })

  const [items, setItems] = useState<IRowViewItem[]>([])
  const [user, setUser] = useState<IUserApp>()

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
          content: getCitizenItem(data.citizenship)?.label ?? 'empty'
        },
        {
          title: 'Тип документа',
          content: getDocumentTypeItem(data.documentType)?.label ?? 'empty'
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
