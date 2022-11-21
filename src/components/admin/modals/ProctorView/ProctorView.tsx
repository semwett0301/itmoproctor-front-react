import React, { FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ModalViewConstructor, { IRowViewItem } from '../TwoBlockModalRow/ModalViewConstructor'
import { request } from '../../../../api/axios/request'
import { getStrDate } from '../../../../utils/dateUtils'
import { getFullName } from '../../../../utils/nameHelper'
import cl from '../ExamView/ExamView.module.scss'
import ModalTitle from '../../../shared/ModalView/ModalTitle/ModalTitle'
import { SkeletonText } from '@consta/uikit/Skeleton'
import { cnMixSpace } from '@consta/uikit/MixSpace'

// TYPES
interface IProctorViewProp {
  profileId: string
}

const ProctorView: FC<IProctorViewProp> = ({ profileId }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'shared' })

  const [isLoad, setIsLoad] = useState<boolean>(true)
  const [items, setItems] = useState<IRowViewItem[]>([])

  useEffect(() => {
    request.exam.getProfile(profileId).then((r) => {
      const data = r.data
      console.log(data)
      const ii: IRowViewItem[] = [
        {
          title: 'Логин',
          content: data.username
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
          content: getStrDate(data.birthday, 'DD.MM.YYYY')
        },
        {
          title: 'Электронная почта',
          content: data.email
        },
        {
          title: 'Университет',
          content:
            data.organization.shortName || data.organization.fullName || data.organization._id
        }
      ]
      setIsLoad(false)
      setItems(ii)
    })
  }, [profileId, t])

  return (
    <div className={cl.wrapper}>
      <ModalTitle title={'proctor'} />
      {isLoad ? (
        <SkeletonText rows={10} fontSize='s' lineHeight={'l'} />
      ) : (
        <div className={cnMixSpace({ pH: 'm', pV: 's' })}>
          <ModalViewConstructor items={items} />
        </div>
      )}
    </div>
  )
}

export default ProctorView
