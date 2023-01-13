import React, { FC, useEffect, useState } from 'react'
import ModalTitle from '../../../shared/ModalView/ModalTitle/ModalTitle'
import { DatePicker } from '@consta/uikit/DatePicker'
import { IconCalendar } from '@consta/uikit/IconCalendar'
import FilterConstructor from '../../../shared/Filter/FilterConstructor'
import { TextField } from '@consta/uikit/TextField'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Button } from '@consta/uikit/Button'
import { date, number, object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { cnMixSpace } from '@consta/uikit/MixSpace'
import cl from './AddEditSchedule.module.scss'
import { classJoiner } from '../../../../utils/styleClassesUtills'
import { AutoComplete } from '@consta/uikit/__internal__/src/components/AutoCompleteCanary/AutoCompleteCanary'
import { IUsersRow } from '../../../../ts/interfaces/IUsers'
import { getFullName } from '../../../../utils/nameHelper'
import { request } from '../../../../api/axios/request'
import { IconCheck } from '@consta/uikit/IconCheck'
import { SkeletonText } from '@consta/uikit/Skeleton'
import { closeModal } from '../../../shared/ModalView/ModalView'
import { ISchedulePost } from '../../../../api/axios/modules/admin/schedule'
import dayjs from 'dayjs'

// TYPES

interface IFormInput {
  beginDate: Date
  endDate: Date
  concurrent: string
  inspector: string
  maxExamsBeginnings: string
}

interface IAddEditScheduleProp {
  scheduleId?: string
  onSubmit?: () => void
}

// CONSTANTS
const organizationSchema = object({
  inspector: string().required('Необходимо указать проктора').nullable(),
  beginDate: date().nullable().required('Укажите дату начала'),
  endDate: date().nullable().required('Укажите дату окончания'),
  concurrent: number().required('Необходимо указать количество сессий').nullable(),
  maxExamsBeginnings: number().required('Необходимо указать количество стартов').nullable()
})

// DEFAULT FUNCTIONS
const toRequestData = (data: IFormInput, inspector: IUsersRow): ISchedulePost => ({
  beginDate: dayjs(data.beginDate).startOf('hour').toISOString(),
  endDate: dayjs(data.endDate).startOf('hour').toISOString(),
  concurrent: data.concurrent,
  inspector: inspector._id,
  maxExamsBeginnings: data.maxExamsBeginnings
})

const AddEditSchedule: FC<IAddEditScheduleProp> = ({ scheduleId, onSubmit }) => {
  const [users, setUsers] = useState<IUsersRow[]>([])
  const [currentInspector, setInspector] = useState<IUsersRow | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { control, handleSubmit, setError, formState, reset } = useForm<IFormInput>({
    mode: 'onChange',
    resolver: yupResolver(organizationSchema)
  })

  useEffect(() => {
    setIsLoading(true)
    request.users
      .getListOfUsers({ role: '2,expert' })
      .then((r) => {
        setUsers(r.data.rows)
        return r.data.rows
      })
      .then((rows) => {
        if (scheduleId)
          return request.schedule.getSchedule(scheduleId).then((r) => {
            const inspector = rows.find((item) => item._id === r.data.inspector)
            if (inspector) {
              setInspector(inspector)
              reset({
                beginDate: new Date(r.data.beginDate),
                endDate: new Date(r.data.endDate),
                concurrent: r.data.concurrent,
                inspector:
                  getFullName(inspector.lastname, inspector.middlename, inspector.firstname) +
                  ` (${inspector.username})`,
                maxExamsBeginnings: r.data.maxExamsBeginnings
              })
            }
          })
      })
      .then(() => {
        setIsLoading(false)
      })
  }, [reset, scheduleId])

  const onFormSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data, scheduleId)

    if (currentInspector) {
      Promise.resolve(
        scheduleId
          ? request.schedule.editSchedule(toRequestData(data, currentInspector), scheduleId)
          : request.schedule.addSchedule(toRequestData(data, currentInspector))
      )
        .then(() => {
          if (onSubmit) {
            onSubmit()
          }
          closeModal()
        })
        .catch((e) => console.log(e))
    }
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
                          render={({ field, fieldState }) => (
                            <AutoComplete
                              size={'s'}
                              items={users}
                              value={field.value}
                              width={'full'}
                              label={'Проктор'}
                              onChange={({ value }) => {
                                const insp =
                                  users.find(
                                    (i) =>
                                      getFullName(i.lastname, i.middlename, i.firstname) +
                                        ` (${i.username})` ===
                                      field.value
                                  ) || null

                                if (insp) {
                                  setInspector(insp)
                                } else {
                                  setError('inspector', { message: 'Инспектор не найден' })
                                }

                                field.onChange(value)
                              }}
                              getItemLabel={({ firstname, middlename, lastname, username }) =>
                                getFullName(lastname, middlename, firstname) + ` (${username})`
                              }
                              getItemKey={(item) => item._id}
                              status={fieldState.error ? 'alert' : undefined}
                              caption={
                                !currentInspector ? 'Проктор не найден' : fieldState.error?.message
                              }
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
