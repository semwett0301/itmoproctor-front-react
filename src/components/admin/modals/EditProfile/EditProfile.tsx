import React, { FC, useState } from 'react'
import cl from './EditProfile.module.scss'
import ModalTitle from '../../../shared/ModalView/ModalTitle/ModalTitle'
import { SkeletonText } from '@consta/uikit/Skeleton'
import FilterConstructor from '../../../shared/Filter/FilterConstructor'
import { classJoiner } from '../../../../utils/styleClassesUtills'
import { cnMixSpace } from '@consta/uikit/MixSpace'
import SaveButton from '../../../shared/ModalView/SaveButton/SaveButton'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { DefaultItem, Select } from '@consta/uikit/Select'
import { TextField } from '@consta/uikit/TextField'
import SmartSelect from '../../../shared/SmartSelect/SmartSelect'
import { DatePicker } from '@consta/uikit/DatePicker'
import { IOrganization } from '../../../../ts/interfaces/IOrganizations'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { getGender } from '../../../shared/SmartSelect/Items/genders'
import { date, object, string } from 'yup'
import EmptyLabel from '../../../shared/ModalView/EmptyLabel/EmptyLabel'
import { request } from '../../../../api/axios/request'
import { closeModal } from '../../../shared/ModalView/ModalView'
import { IUser } from '../../../../ts/interfaces/IUser'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { updateUserActionCreator } from '../../../../store/reducers/userReducer/userActionCreators'

dayjs.extend(customParseFormat)

// TYPES
interface IProfileForm {
  lastname: string
  firstname: string
  middlename: string
  gender: DefaultItem
  birthday: Date
  email: string
  organization: IOrganization
}

// CONSTANTS
const profileSchema = object({
  lastname: string().required('Укажите фамилию'),
  firstname: string().required('Укажите имя'),
  gender: object().required('Укажите пол'),
  birthday: date().required('Укажите дату рождения'),
  email: string().email().required('Укажите email'),
  middlename: string().nullable(),
  organization: object().required('Укажите организацию')
})

// DEFAULT FUNCTIONS
const toRequestData = (profile: IProfileForm, user: IUser): IUser => ({
  ...user,
  lastname: profile.lastname,
  firstname: profile.firstname,
  middlename: profile.middlename,
  gender: String(getGender(user.gender).id),
  birthday: dayjs(profile.birthday).format('MM.DD.YYYY'),
  email: profile.email,
  organization: profile.organization
})

const EditProfile: FC = () => {
  const [isLoading] = useState<boolean>(false)
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  console.log(user)

  const { control, handleSubmit, formState, reset } = useForm<IProfileForm>({
    mode: 'all',
    resolver: yupResolver(profileSchema),
    defaultValues: {
      lastname: user.lastname,
      firstname: user.firstname,
      middlename: user.middlename,
      gender: getGender(user.gender),
      birthday: dayjs(user.birthday, 'MM.DD.YYYY').toDate(),
      email: user.email,
      organization: user.organization
    }
  })

  const onFormSubmit: SubmitHandler<IProfileForm> = (data) =>
    request.profile
      .updateProfile(user._id, toRequestData(data, user))
      .then((r) => {
        dispatch(updateUserActionCreator(r.data))
      })
      .then(() => closeModal())
      .catch((e) => console.log(e))

  return (
    <>
      <ModalTitle title={'user'} />
      <div className={classJoiner(cnMixSpace({ pH: '2xs' }), cl.wrapper)}>
        {isLoading ? (
          <SkeletonText
            fontSize={'3xl'}
            lineHeight={'l'}
            rows={5}
            className={classJoiner(
              cnMixSpace({
                pH: 's',
                pV: 's'
              }),
              cl.skeleton
            )}
          />
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
                          name={'firstname'}
                          control={control}
                          render={({ field, fieldState }) => (
                            <>
                              <EmptyLabel />
                              <TextField
                                id={field.name}
                                name={field.name}
                                placeholder={'Имя'}
                                size='s'
                                width='full'
                                value={field.value}
                                onChange={({ e }) => field.onChange(e)}
                                status={fieldState.error ? 'alert' : undefined}
                                caption={fieldState.error?.message}
                              />
                            </>
                          )}
                        />
                      )
                    },
                    {
                      key: 13,
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
                                onChange={({ e }) => field.onChange(e)}
                                status={fieldState.error ? 'alert' : undefined}
                                caption={fieldState.error?.message}
                              />
                            </>
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
                          name={'gender'}
                          control={control}
                          render={({ field, fieldState }) => (
                            <SmartSelect
                              withLabel
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
                      key: 22,
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
                    { key: 23, flex: 1, component: <></> }
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
                  key: 4,
                  components: [
                    {
                      key: 41,
                      flex: 1,
                      component: (
                        <Controller
                          name={'organization'}
                          control={control}
                          render={({ field, fieldState }) => (
                            <Select
                              disabled
                              label='Университет'
                              size='s'
                              items={[field.value]}
                              onChange={({ e }) => field.onChange(e)}
                              getItemLabel={(item) => item.shortName || item.fullName || item._id}
                              getItemKey={(item) => item._id}
                              value={field.value}
                              status={fieldState.error ? 'alert' : undefined}
                              caption={fieldState.error?.message}
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

export default EditProfile
