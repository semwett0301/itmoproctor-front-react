import React, { FC, useCallback, useEffect, useState } from 'react'
import ModalTitle from '../../../shared/ModalView/ModalTitle/ModalTitle'
import { DatePicker } from '@consta/uikit/DatePicker'
import { IconCalendar } from '@consta/uikit/IconCalendar'
import FilterConstructor from '../../../shared/Filter/FilterConstructor'
import { TextField } from '@consta/uikit/TextField'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@consta/uikit/Button'
import { date, number, object } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { cnMixSpace } from '@consta/uikit/MixSpace'
import cl from './AddEditSchedule.module.scss'
import { classJoiner } from '../../../../utils/common/styleClassesUtills'
import { IUsersRow } from '../../../../ts/interfaces/IUsers'
import { getFullName } from '../../../../utils/common/nameHelper'
import { request } from '../../../../api/axios/request'
import { IconCheck } from '@consta/uikit/IconCheck'
import { SkeletonText } from '@consta/uikit/Skeleton'
import { closeModal } from '../../../shared/ModalView/ModalView'
import { ISchedulePost } from '../../../../api/axios/modules/admin/schedule'
import dayjs from 'dayjs'
import { Combobox } from '@consta/uikit/Combobox'

// TYPES

interface IFormInput {
  beginDate: Date
  endDate: Date
  concurrent: string
  inspector: IUsersRow | null
  maxExamsBeginnings: string
}

interface IAddEditScheduleProp {
  scheduleId?: string
  onSubmit?: () => void
}

// CONSTANTS
const organizationSchema = object({
  inspector: object().required('Укажите проктора'),
  beginDate: date().nullable().required('Укажите дату начала'),
  endDate: date().nullable().required('Укажите дату окончания'),
  concurrent: number().required('Необходимо указать количество сессий').nullable(),
  maxExamsBeginnings: number().required('Необходимо указать количество стартов').nullable()
})

// DEFAULT FUNCTIONS
const toRequestData = (data: IFormInput): ISchedulePost => ({
  beginDate: dayjs(data.beginDate).startOf('hour').toISOString(),
  endDate: dayjs(data.endDate).startOf('hour').toISOString(),
  concurrent: data.concurrent,
  inspector: data.inspector?._id ?? '',
  maxExamsBeginnings: data.maxExamsBeginnings
})

const AddEditSchedule: FC<IAddEditScheduleProp> = ({ scheduleId, onSubmit }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isProctorsLoading, setIsProctorsLoading] = useState<boolean>(false)
  const [proctorsList, setProctorsList] = useState<IUsersRow[]>([])

  const [emptyLabel, setLabelEmpty] = useState<string>('Введите имя проктора')

  const getProctors = useCallback<(query: string | null) => void>((query) => {
    setIsProctorsLoading(true)
    request.users
      .getListOfUsers({
        role: '2,expert',
        rows: 20,
        text: query
      })
      .then(({ data }) => {
        setProctorsList(data.rows)
        setIsProctorsLoading(false)
      })
  }, [])

  const { control, handleSubmit, formState, reset, resetField } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: yupResolver(organizationSchema)
  })

  useEffect(() => {
    setIsLoading(true)
    request.users
      .getListOfUsers({ role: '2,expert' })
      .then((users) => {
        if (scheduleId)
          return request.schedule.getSchedule(scheduleId).then((r) => {
            console.log(r)
            const inspector = users.data.rows.find((item) => item._id === r.data.inspector)
            if (inspector) {
              reset({
                beginDate: new Date(r.data.beginDate),
                endDate: new Date(r.data.endDate),
                concurrent: r.data.concurrent,
                inspector: inspector
              })

              setProctorsList([inspector])
            }
          })
      })
      .then(() => {
        setIsLoading(false)
      })
  }, [reset, scheduleId])

  const onFormSubmit: SubmitHandler<IFormInput> = (data) => {
    Promise.resolve(
      scheduleId
        ? request.schedule.editSchedule(toRequestData(data), scheduleId)
        : request.schedule.addSchedule(toRequestData(data))
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
    <div>
      <ModalTitle title={'schedule'} />
      <div className={classJoiner(cnMixSpace({ pH: '2xs' }), cl.wrapper)}>
        {isLoading ? (
          <SkeletonText
            rows={10}
            fontSize='s'
            lineHeight={'l'}
            className={classJoiner(cnMixSpace({ p: 's' }), cl.skeleton)}
          />
        ) : (
          <form noValidate onSubmit={handleSubmit(onFormSubmit)}>
            <FilterConstructor
              items={[
                {
                  key: 0,
                  components: [
                    {
                      key: '01',
                      component: (
                        <Controller
                          name='inspector'
                          control={control}
                          render={({ field }) => (
                            <Combobox
                              size={'s'}
                              label={'Проктор'}
                              labelForNotFound={'Проктор не найден'}
                              labelForEmptyItems={emptyLabel}
                              items={proctorsList}
                              value={field.value}
                              onChange={({ value }) => {
                                if (value === null) {
                                  setProctorsList([])
                                  setLabelEmpty('Введите имя проктора')
                                } else {
                                  proctorsList.length > 1 && setProctorsList([value])
                                }

                                return field.onChange(value)
                              }}
                              onInputChange={({ value }) => {
                                if (!field.value) {
                                  if (value && value.length >= 3) {
                                    getProctors(value)
                                    setLabelEmpty('Проктор не найден')
                                  } else {
                                    setProctorsList([])
                                    setLabelEmpty('Введите имя проктора')
                                  }
                                }
                              }}
                              getItemLabel={(item) =>
                                getFullName(
                                  item.lastname,
                                  item.firstname,
                                  item.middlename,
                                  `(${item.username})`
                                )
                              }
                              getItemKey={(item) => item._id}
                              isLoading={isProctorsLoading}
                            />
                          )}
                        />
                      ),
                      flex: 1
                    }
                  ]
                },
                {
                  key: 1,
                  components: [
                    {
                      key: 11,
                      component: (
                        <Controller
                          name='beginDate'
                          control={control}
                          render={({ field, fieldState }) => (
                            <DatePicker
                              size={'s'}
                              type={'date-time'}
                              format={'dd.MM.yyyy HH:mm'}
                              multiplicitySeconds={0}
                              placeholder='ММ.ДД.ГГГГ ЧЧ:ММ'
                              label={'Дата начала'}
                              rightSide={IconCalendar}
                              value={field.value}
                              inputRef={field.ref}
                              name={field.name}
                              id={field.name}
                              onBlur={field.onBlur}
                              onChange={({ value }) => field.onChange(value)}
                              status={fieldState.error ? 'alert' : undefined}
                              caption={fieldState.error?.message}
                            />
                          )}
                        />
                      ),
                      flex: 1
                    },
                    {
                      key: 12,
                      component: (
                        <Controller
                          name='endDate'
                          control={control}
                          render={({ field, fieldState }) => (
                            <DatePicker
                              size={'s'}
                              type={'date-time'}
                              format={'dd.MM.yyyy HH:mm'}
                              placeholder='ММ.ДД.ГГГГ ЧЧ:ММ'
                              label={'Дата окончания'}
                              multiplicitySeconds={0}
                              rightSide={IconCalendar}
                              value={field.value}
                              inputRef={field.ref}
                              name={field.name}
                              id={field.name}
                              onBlur={field.onBlur}
                              onChange={({ value }) => field.onChange(value)}
                              status={fieldState.error ? 'alert' : undefined}
                              caption={fieldState.error?.message}
                            />
                          )}
                        />
                      ),
                      flex: 1
                    }
                  ]
                },
                {
                  key: 2,
                  components: [
                    {
                      key: 21,
                      component: (
                        <Controller
                          name='concurrent'
                          control={control}
                          defaultValue={'1'}
                          render={({ field, fieldState }) => (
                            <TextField
                              size={'s'}
                              label={'Сессии'}
                              width={'full'}
                              type={'number'}
                              max={9}
                              min={1}
                              value={String(field.value)}
                              ref={field.ref}
                              name={field.name}
                              id={field.name}
                              onBlur={field.onBlur}
                              onChange={({ value }) => field.onChange(value ? +value : null)}
                              status={fieldState.error ? 'alert' : undefined}
                            />
                          )}
                        />
                      ),
                      flex: 1
                    },
                    {
                      key: 22,
                      component: (
                        <Controller
                          name='maxExamsBeginnings'
                          control={control}
                          defaultValue={'1'}
                          render={({ field, fieldState }) => (
                            <TextField
                              size={'s'}
                              label={'Старты'}
                              width={'full'}
                              max={9}
                              min={1}
                              value={String(field.value)}
                              ref={field.ref}
                              name={field.name}
                              id={field.name}
                              onBlur={field.onBlur}
                              type={'number'}
                              onChange={({ value }) => field.onChange(value ? +value : null)}
                              status={fieldState.error ? 'alert' : undefined}
                            />
                          )}
                        />
                      ),
                      flex: 1
                    }
                  ]
                }
              ]}
            />
            <div
              style={{ display: 'flex', flexDirection: 'row-reverse' }}
              className={cnMixSpace({ pH: 'm', mB: 's' })}
            >
              <Button
                label={'ghfhj'}
                iconLeft={IconCheck}
                size={'s'}
                onClick={() => resetField('inspector')}
              />

              <Button
                type={'submit'}
                label={'Сохранить'}
                iconLeft={IconCheck}
                size={'s'}
                disabled={!formState.isValid}
                onClick={handleSubmit(onFormSubmit)}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default AddEditSchedule
