import React, { FC, useEffect, useState } from 'react'
import cl from './AddEditUser.module.scss'

import ModalTitle from '../../../shared/ModalView/ModalTitle/ModalTitle'
import { classJoiner } from '../../../../utils/styleClassesUtills'
import { cnMixSpace } from '@consta/uikit/MixSpace'
import { SkeletonText } from '@consta/uikit/Skeleton'
import SaveButton from '../../../shared/ModalView/SaveButton/SaveButton'
import FilterConstructor from '../../../shared/Filter/FilterConstructor'
import { TextField } from '@consta/uikit/TextField'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { date, object, string } from 'yup'
import { DefaultItem, Select } from '@consta/uikit/Select'
import { IOrganization } from '../../../../ts/interfaces/IOrganizations'
import SmartSelect from '../../../shared/SmartSelect/SmartSelect'
import { IconCalendar } from '@consta/uikit/IconCalendar'
import { DatePicker } from '@consta/uikit/DatePicker'
import EmptyLabel from '../../../shared/ModalView/EmptyLabel/EmptyLabel'
import { RoleEnum } from '../../../../config/authСonfig'
import { request } from '../../../../api/axios/request'
import { useOrganizations } from '../../../../hooks/organizationsHooks'
import { useAppSelector } from '../../../../hooks/reduxHooks'
import { getUserStatusItem } from '../../../shared/SmartSelect/Items/userStatuses'
import dayjs from 'dayjs'
import { getCitizenItem } from '../../../shared/SmartSelect/Items/citizenships'
import { getDocumentTypeItem } from '../../../shared/SmartSelect/Items/documents'
import { getGender } from '../../../shared/SmartSelect/Items/genders'
import { getProviderItem } from '../../../shared/SmartSelect/Items/providers'
import { getRoleItem } from '../../../shared/SmartSelect/Items/roles'
import { Button } from '@consta/uikit/Button'

// TYPES
interface IUserForm {
  active: DefaultItem
  address: string | null
  birthday: Date
  citizenship: DefaultItem | null
  description: string
  documentIssueDate: Date
  documentNumber: string
  documentType: DefaultItem | null
  email: string
  expert: DefaultItem | null
  firstname: string
  gender: DefaultItem | null
  lastname: string
  middlename: string
  organization: IOrganization
  password: string
  provider: DefaultItem
  role: DefaultItem
  username: string
}

interface IAddEditUserProp {
  userId?: string
  onSubmit?: string
}

// CONSTANTS
const addUserSchema = object({
  username: string().nullable().required('Укажите логин'),
  password: string().nullable().required('Укажите пароль'),
  provider: object().nullable().required('Укажите провайдера'),
  role: object().nullable().required('Укажите роль'),
  active: object().nullable().required('Укажите статус'),
  lastname: string().nullable().required('Укажите фамилию'),
  firstname: string().nullable().required('Укажите имя'),
  gender: object().nullable().required('Укажите пол'),
  birthday: date().nullable().required('Укажите дату рождения'),
  email: string().email('Неверный формат email').nullable().required('Укажите email'),
  organization: object().nullable().required('Укажите организацию'),

  middlename: string().nullable(),
  address: string().nullable(),
  citizenship: object().nullable(),
  description: string().nullable(),
  documentIssueDate: string().nullable(),
  documentNumber: string().nullable(),
  documentType: object().nullable(),
  expert: object().nullable()
})

const editUserSchema = object({
  username: string().nullable().required('Укажите логин'),
  provider: object().nullable().required('Укажите провайдера'),
  role: object().nullable().required('Укажите роль'),
  active: object().nullable().required('Укажите статус'),
  lastname: string().nullable().required('Укажите фамилию'),
  firstname: string().nullable().required('Укажите имя'),
  gender: object().nullable().required('Укажите пол'),
  birthday: date().nullable().required('Укажите дату рождения'),
  email: string().email('Неверный формат email').nullable().required('Укажите email'),
  organization: object().nullable().required('Укажите организацию'),

  password: string().nullable(),
  middlename: string().nullable(),
  address: string().nullable(),
  citizenship: object().nullable(),
  description: string().nullable(),
  documentIssueDate: string().nullable(),
  documentNumber: string().nullable(),
  documentType: object().nullable(),
  expert: object().nullable()
})

// DEFAULT FUNCTIONS

const AddEditUser: FC<IAddEditUserProp> = ({ userId, onSubmit }) => {
  const [isLoading, setIsLoading] = useState<boolean>()
  const user = useAppSelector((state) => state.user)
  const { getOrganizations } = useOrganizations()
  const [organizationList, setOrganizationList] = useState<IOrganization[]>([])

  const { control, formState, reset } = useForm<IUserForm>({
    mode: 'all',
    resolver: yupResolver(userId ? editUserSchema : addUserSchema)
  })

  useEffect(() => {
    console.log(userId)

    getOrganizations()
      .then((r) => {
        if (user.role === RoleEnum.ADMIN && user.organization) {
          setOrganizationList(r.filter((i) => i.code === user.organization.code))
        } else {
          setOrganizationList(
            r
              .filter((i) => i.code !== 'global' && i.code !== 'notStudent')
              .sort((a, b) =>
                a.shortName && b.shortName
                  ? a.shortName?.toLowerCase().localeCompare(b.shortName.toLowerCase())
                  : a.fullName.toLowerCase().localeCompare(b.fullName.toLowerCase())
              )
          )
        }
        return r
      })
      .then((organizations) => {
        console.log(userId)
        if (userId) {
          request.users.getUser(userId).then((r) => {
            console.log(r.data)
            setOrganizationList((prevState) => [...prevState, r.data.organization])
            reset({
              active: getUserStatusItem(String(r.data.active)),
              address: r.data.address,
              birthday: dayjs(user.birthday, 'MM.DD.YYYY').toDate(),
              citizenship: getCitizenItem(r.data.citizenship),
              description: r.data.description,
              documentIssueDate: new Date(r.data.documentIssueDate),
              documentNumber: r.data.documentNumber,
              documentType: getDocumentTypeItem(r.data.documentType),
              email: r.data.email,
              expert: { id: String(r.data.expert), label: 'Нет' },
              firstname: r.data.firstname,
              gender: getGender(r.data.gender),
              lastname: r.data.lastname,
              middlename: r.data.middlename,
              organization: r.data.organization,
              provider: getProviderItem(r.data.provider),
              role: getRoleItem(r.data.role.toString()),
              username: r.data.username
            })
          })
        }
      })
  }, [userId])

  return (
    <>
      <ModalTitle title='user' />
      <div className={classJoiner(cnMixSpace({ pH: '2xs' }), cl.wrapper)}>
        {isLoading ? (
          <SkeletonText rows={15} />
        ) : (
          <form noValidate onSubmit={(data) => console.log(data)}>
            <FilterConstructor
              items={[
                {
                  key: 1,
                  components: [
                    {
                      key: 11,
                      flex: 1,
                      component: (
                        <Controller
                          name={'username'}
                          control={control}
                          render={({ field, fieldState }) => (
                            <TextField
                              id={field.name}
                              name={field.name}
                              label={'Логин'}
                              required
                              size='s'
                              width='full'
                              placeholder={'Логин'}
                              value={field.value}
                              onChange={({ e }) => field.onChange(e)}
                              status={fieldState.error ? 'alert' : undefined}
                              caption={fieldState.error?.message}
                            />
                          )}
                        />
                      )
                    },
                    {
                      key: 12,
                      flex: 1,
                      component: (
                        <Controller
                          name={'password'}
                          control={control}
                          render={({ field, fieldState }) => (
                            <TextField
                              autoComplete='new-password'
                              id={field.name}
                              name={field.name}
                              required
                              label={'Пароль'}
                              size='s'
                              width='full'
                              placeholder={'********'}
                              type='password'
                              value={field.value}
                              onChange={({ e }) => field.onChange(e)}
                              status={fieldState.error ? 'alert' : undefined}
                              caption={fieldState.error?.message}
                            />
                          )}
                        />
                      )
                    }
                  ]
                },
                {
                  key: 2,
                  components: [
                    {
                      key: 21,
                      flex: 1,
                      component: (
                        <Controller
                          name={'provider'}
                          control={control}
                          render={({ field, fieldState }) => (
                            <SmartSelect
                              id={field.name}
                              name={field.name}
                              required
                              itemsType={'providers'}
                              label={'Провайдер'}
                              withLabel
                              value={field.value}
                              onChange={({ value }) => field.onChange(value)}
                              status={fieldState.error ? 'alert' : undefined}
                              caption={fieldState.error?.message}
                            />
                          )}
                        />
                      )
                    },
                    {
                      key: 22,
                      flex: 1,
                      component: (
                        <Controller
                          name={'role'}
                          control={control}
                          render={({ field, fieldState }) => (
                            <SmartSelect
                              id={field.name}
                              name={field.name}
                              required
                              itemsType={'roles'}
                              withLabel
                              value={field.value}
                              onChange={({ value }) => field.onChange(value)}
                              status={fieldState.error ? 'alert' : undefined}
                              caption={fieldState.error?.message}
                            />
                          )}
                        />
                      )
                    },
                    {
                      key: 23,
                      flex: 1,
                      component: (
                        <Controller
                          name={'active'}
                          control={control}
                          render={({ field, fieldState }) => (
                            <SmartSelect
                              id={field.name}
                              name={field.name}
                              required
                              itemsType={'userStatuses'}
                              withLabel
                              value={field.value}
                              onChange={({ value }) => field.onChange(value)}
                              status={fieldState.error ? 'alert' : undefined}
                              caption={fieldState.error?.message}
                            />
                          )}
                        />
                      )
                    }
                  ]
                },
                {
                  key: 3,
                  components: [
                    {
                      key: 31,
                      flex: 1,
                      component: (
                        <Controller
                          name={'lastname'}
                          control={control}
                          render={({ field, fieldState }) => (
                            <TextField
                              id={field.name}
                              name={field.name}
                              required
                              label={'Полное имя'}
                              placeholder={'Фамилия'}
                              size='s'
                              width='full'
                              value={field.value}
                              onChange={({ value }) => field.onChange(value)}
                              status={fieldState.error ? 'alert' : undefined}
                              caption={fieldState.error?.message}
                            />
                          )}
                        />
                      )
                    },
                    {
                      key: 32,
                      flex: 1,
                      component: (
                        <Controller
                          name={'firstname'}
                          control={control}
                          render={({ field, fieldState }) => (
                            <>
                              <EmptyLabel />
                              <TextField
                                id={field.name}
                                name={field.name}
                                placeholder={'Имя'}
                                required
                                size='s'
                                width='full'
                                value={field.value}
                                onChange={({ value }) => field.onChange(value)}
                                status={fieldState.error ? 'alert' : undefined}
                                caption={fieldState.error?.message}
                              />
                            </>
                          )}
                        />
                      )
                    },
                    {
                      key: 33,
                      flex: 1,
                      component: (
                        <Controller
                          name={'middlename'}
                          control={control}
                          render={({ field, fieldState }) => (
                            <>
                              <EmptyLabel />
                              <TextField
                                id={field.name}
                                name={field.name}
                                placeholder={'Отчество'}
                                size='s'
                                width='full'
                                value={field.value}
                                onChange={({ value }) => field.onChange(value)}
                              />
                            </>
                          )}
                        />
                      )
                    }
                  ]
                },
                {
                  key: 4,
                  components: [
                    {
                      key: 41,
                      flex: 1,
                      component: (
                        <Controller
                          name={'email'}
                          control={control}
                          render={({ field, fieldState }) => (
                            <TextField
                              id={field.name}
                              name={field.name}
                              required
                              label={'Электронный адрес'}
                              size='s'
                              width='full'
                              value={field.value}
                              onChange={({ value }) => field.onChange(value)}
                              status={fieldState.error ? 'alert' : undefined}
                              caption={fieldState.error?.message}
                            />
                          )}
                        />
                      )
                    }
                  ]
                },
                {
                  key: 5,
                  components: [
                    {
                      key: 51,
                      flex: 1,
                      component: (
                        <Controller
                          name={'organization'}
                          control={control}
                          render={({ field, fieldState }) => (
                            <Select
                              id={field.name}
                              name={field.name}
                              required
                              label={'Университет'}
                              size='s'
                              items={organizationList}
                              value={field.value}
                              getItemKey={(item) => item._id}
                              getItemLabel={(item) => item.shortName || item.fullName || item._id}
                              onChange={({ value }) => field.onChange(value)}
                              status={fieldState.error ? 'alert' : undefined}
                              caption={fieldState.error?.message}
                            />
                          )}
                        />
                      )
                    }
                  ]
                },
                {
                  key: 6,
                  components: [
                    {
                      key: 61,
                      flex: 1,
                      component: (
                        <Controller
                          name={'address'}
                          control={control}
                          render={({ field, fieldState }) => (
                            <TextField
                              id={field.name}
                              name={field.name}
                              label={'Почтовый адрес'}
                              size='s'
                              width='full'
                              value={field.value}
                              onChange={({ value }) => field.onChange(value)}
                            />
                          )}
                        />
                      )
                    }
                  ]
                },
                {
                  key: 7,
                  components: [
                    {
                      key: 71,
                      flex: 1,
                      component: (
                        <Controller
                          name={'citizenship'}
                          control={control}
                          render={({ field, fieldState }) => (
                            <SmartSelect
                              id={field.name}
                              name={field.name}
                              withLabel
                              itemsType={'citizenship'}
                              value={field.value}
                              onChange={({ value }) => field.onChange(value)}
                            />
                          )}
                        />
                      )
                    },
                    {
                      key: 72,
                      flex: 1,
                      component: (
                        <Controller
                          name={'documentType'}
                          control={control}
                          render={({ field, fieldState }) => (
                            <SmartSelect
                              id={field.name}
                              name={field.name}
                              withLabel
                              itemsType={'documents'}
                              value={field.value}
                              onChange={({ value }) => field.onChange(value)}
                            />
                          )}
                        />
                      )
                    }
                  ]
                },
                {
                  key: 8,
                  components: [
                    {
                      key: 81,
                      flex: 1,
                      component: (
                        <Controller
                          name={'documentNumber'}
                          control={control}
                          render={({ field, fieldState }) => (
                            <TextField
                              id={field.name}
                              name={field.name}
                              label={'Серия и номер'}
                              placeholder={'Серия и номер документа'}
                              size='s'
                              width='full'
                              value={field.value}
                              onChange={({ value }) => field.onChange(value)}
                            />
                          )}
                        />
                      )
                    },
                    {
                      key: 82,
                      flex: 1,
                      component: (
                        <Controller
                          name={'documentIssueDate'}
                          control={control}
                          render={({ field, fieldState }) => (
                            <DatePicker
                              id={field.name}
                              name={field.name}
                              label='Дата выдачи'
                              size='s'
                              rightSide={IconCalendar}
                              value={field.value}
                              onChange={({ value }) => field.onChange(value)}
                            />
                          )}
                        />
                      )
                    }
                  ]
                },
                {
                  key: 9,
                  components: [
                    {
                      key: 91,
                      flex: 1,
                      component: (
                        <Controller
                          name={'description'}
                          control={control}
                          render={({ field, fieldState }) => (
                            <TextField
                              id={field.name}
                              name={field.name}
                              label={'Образование'}
                              placeholder={
                                'Уровень образования, степень, квалификация, образовательная организация'
                              }
                              type={'textarea'}
                              minRows={2}
                              maxRows={2}
                              size='s'
                              width='full'
                              value={field.value}
                              onChange={({ value }) => field.onChange(value)}
                            />
                          )}
                        />
                      )
                    }
                  ]
                }
              ]}
            />

            <SaveButton valid={formState.isValid} />
          </form>
        )}
        <Button
          onClick={() => {
            console.log(formState.isValid)
          }}
        />
      </div>
    </>
  )
}

export default AddEditUser
