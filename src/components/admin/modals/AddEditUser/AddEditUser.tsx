import React, { FC, useEffect, useState } from 'react'
import cl from './AddEditUser.module.scss'

import ModalTitle from '../../../shared/ModalView/ModalTitle/ModalTitle'
import { classJoiner } from '../../../../utils/styleClassesUtills'
import { cnMixSpace } from '@consta/uikit/MixSpace'
import { SkeletonText } from '@consta/uikit/Skeleton'
import SaveButton from '../../../shared/ModalView/SaveButton/SaveButton'
import FilterConstructor from '../../../shared/Filter/FilterConstructor'
import { TextField } from '@consta/uikit/TextField'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
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
import userStatuses, { getUserStatusItem } from '../../../shared/SmartSelect/Items/userStatuses'
import dayjs from 'dayjs'
import { getCitizenItem } from '../../../shared/SmartSelect/Items/citizenships'
import { getDocumentTypeItem } from '../../../shared/SmartSelect/Items/documents'
import { getGender } from '../../../shared/SmartSelect/Items/genders'
import providers, { getProviderItem } from '../../../shared/SmartSelect/Items/providers'
import roles, { getRoleItem, IRoleSelectType } from '../../../shared/SmartSelect/Items/roles'
import { IUserApp } from '../../../../ts/interfaces/IUserApp'
import { IProfilePost } from '../../../../api/axios/modules/profile'
import { closeModal } from '../../../shared/ModalView/ModalView'

// TYPES
interface IUserForm {
  active: DefaultItem
  address: string
  birthday: Date | null
  citizenship: DefaultItem | null
  description: string
  documentIssueDate: Date | null
  documentNumber: string
  documentType: DefaultItem | null
  email: string
  firstname: string
  gender: DefaultItem
  lastname: string
  middlename: string
  organization: IOrganization
  password: string
  provider: DefaultItem
  role: IRoleSelectType
  username: string
}

interface IAddEditUserProp {
  userId?: string
  onSubmit?: () => void
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
  email: string().email('Неверный формат email').nullable().required('Укажите email'),
  organization: object().nullable().required('Укажите организацию'),

  birthday: date().nullable(),
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

const toRequestData = (form: IUserForm, previousUser: IUserApp | null): IProfilePost => {
  const userData = {
    active: form.active.id.toString(),
    address: form.address,
    birthday: dayjs(form.birthday).format('MM.DD.YYYY'),
    citizenship: form.citizenship ? form.citizenship.id.toString() : null,
    description: form.description,
    documentIssueDate: dayjs(form.documentIssueDate).format('MM.DD.YYYY'),
    documentNumber: form.documentNumber,
    documentType: form.documentType ? form.documentType.id.toString() : null,
    email: form.email,
    firstname: form.firstname,
    gender: form.gender.id.toString(),
    lastname: form.lastname,
    middlename: form.middlename,
    organization: form.organization._id,
    provider: form.provider.id.toString(),
    role: form.role.roleId.toString(),
    username: form.username,
    expert: form.role.expert ? String(form.role.expert) : null,
    password: form.password
  }

  return previousUser
    ? Object.assign(userData, {
        __v: previousUser.__v,
        _id: previousUser._id,
        attach: previousUser.attach,
        created: previousUser.created
      })
    : userData
}

const AddEditUser: FC<IAddEditUserProp> = ({ userId, onSubmit }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const profile = useAppSelector((state) => state.user)

  const [user, setUser] = useState<IUserApp | null>(null)

  const { getOrganizations } = useOrganizations()
  const [organizationList, setOrganizationList] = useState<IOrganization[]>([])

  const { control, formState, reset, handleSubmit } = useForm<IUserForm>({
    mode: 'all',
    resolver: yupResolver(userId ? editUserSchema : addUserSchema),
    defaultValues: {
      provider: providers[0],
      role: roles[0],
      active: userStatuses[0]
    }
  })

  useEffect(() => {
    setIsLoading(true)

    getOrganizations()
      .then((r) => {
        if (profile.role === RoleEnum.ADMIN && profile.organization.code !== 'global') {
          setOrganizationList(r.filter((i) => i.code === profile.organization.code))
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
      .then(() => {
        if (userId) {
          request.users
            .getUser(userId)
            .then((r) => r.data)
            .then((userProfile) => {
              setUser(userProfile)
              console.log(userProfile)
              setOrganizationList((prevState) => [...prevState, userProfile.organization])

              reset({
                active: getUserStatusItem(String(userProfile.active)),
                address: userProfile.address,
                birthday: dayjs(userProfile.birthday, 'DD.MM.YYYY').toDate(),
                citizenship: getCitizenItem(userProfile.citizenship),
                description: userProfile.description,
                documentIssueDate: userProfile.documentIssueDate
                  ? dayjs(userProfile.documentIssueDate).toDate()
                  : null,
                documentNumber: userProfile.documentNumber,
                documentType: getDocumentTypeItem(userProfile.documentType),
                email: userProfile.email,
                firstname: userProfile.firstname,
                gender: getGender(userProfile.gender),
                lastname: userProfile.lastname,
                middlename: userProfile.middlename,
                organization: userProfile.organization,
                provider: getProviderItem(userProfile.provider),
                role: getRoleItem(userProfile.role, userProfile.expert),
                username: userProfile.username
              })
            })
        }
        setIsLoading(false)
      })
  }, [userId])

  const onFormSubmit: SubmitHandler<IUserForm> = (data) => {
    Promise.resolve(
      user
        ? request.profile.updateProfile(user._id, toRequestData(data, user))
        : request.profile.addProfile(toRequestData(data, user))
    )
      .then(() => {
        if (onSubmit) {
          onSubmit()
        }
        closeModal()
      })
      .catch((e) => console.log(e))
  }

  return (
    <>
      <ModalTitle title='user' />
      <div className={classJoiner(cnMixSpace({ pH: '2xs' }), cl.wrapper)}>
        {isLoading ? (
          <SkeletonText rows={15} />
        ) : (
          <form noValidate onSubmit={handleSubmit(onFormSubmit)}>
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
                          render={({ field }) => (
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
                  key: 33,
                  components: [
                    {
                      key: 331,
                      flex: 1,
                      component: (
                        <Controller
                          name={'gender'}
                          control={control}
                          render={({ field, fieldState }) => (
                            <SmartSelect
                              withLabel
                              required
                              value={field.value}
                              onChange={({ value }) => field.onChange(value)}
                              itemsType={'genders'}
                              status={fieldState.error ? 'alert' : undefined}
                              caption={fieldState.error?.message}
                            />
                          )}
                        />
                      )
                    },
                    {
                      key: 332,
                      flex: 1,
                      component: (
                        <Controller
                          name={'birthday'}
                          control={control}
                          render={({ field, fieldState }) => (
                            <DatePicker
                              size='s'
                              label={'Дата рождения'}
                              value={field.value}
                              onChange={({ value }) => field.onChange(value)}
                              status={fieldState.error ? 'alert' : undefined}
                              caption={fieldState.error ? 'Укажите дату рождения' : undefined}
                            />
                          )}
                        />
                      )
                    },
                    { key: 333, flex: 1, component: <></> }
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
                          render={({ field }) => (
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
                          render={({ field }) => (
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
                          render={({ field }) => (
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
                          render={({ field }) => (
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
                          render={({ field }) => (
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
                          render={({ field }) => (
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
      </div>
    </>
  )
}

export default AddEditUser
