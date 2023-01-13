import React, { FC, useEffect, useState } from 'react'
import ModalTitle from '../../../shared/ModalView/ModalTitle/ModalTitle'
import { classJoiner } from '../../../../utils/styleClassesUtills'
import { cnMixSpace } from '@consta/uikit/MixSpace'
import cn from './AddEditExam.module.scss'
import { SkeletonText } from '@consta/uikit/Skeleton'
import FilterConstructor from '../../../shared/Filter/FilterConstructor'
import SaveButton from '../../../shared/ModalView/SaveButton/SaveButton'
import { IOrganization } from '../../../../ts/interfaces/IOrganizations'
import { DefaultItem, Select } from '@consta/uikit/Select'
import {
  fullVerificationItems,
  getPostVerificstions,
  getVerifications,
  IFullVerificationItem
} from '../../../../ts/types/Verifications'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { array, date, number, object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { TextField } from '@consta/uikit/TextField'
import SmartSelect from '../../../shared/SmartSelect/SmartSelect'
import { DatePicker } from '@consta/uikit/DatePicker'
import { useOrganizations } from '../../../../hooks/organizationsHooks'
import { Combobox } from '@consta/uikit/Combobox'
import { useAppSelector } from '../../../../hooks/reduxHooks'
import { RoleEnum } from '../../../../config/authСonfig'
import { request } from '../../../../api/axios/request'
import { IUsersRow } from '../../../../ts/interfaces/IUsers'
import { getFullName } from '../../../../utils/nameHelper'
import { examTypesObj } from '../../../shared/SmartSelect/Items/examTypes'
import resolutions, { ResolutionsType } from '../../../shared/SmartSelect/Items/resolutions'
import { closeModal } from '../../../shared/ModalView/ModalView'

// TYPES
export interface ISessionCode {
  _id: string
  sessionCode: string
}

interface IExamForm {
  subject: string
  examId: string
  organization: IOrganization
  // course: ICourse
  courseCode: string
  sessionCode: ISessionCode
  assignment: string
  // Код экзамена в LMS
  examCode: string
  async: DefaultItem
  verifications: IFullVerificationItem[]
  // Сроки
  terms: {
    leftDate: Date
    rightDate: Date
  }
  // Пдановые даты
  planDates: {
    beginDate: Date
    endDate: Date
  }
  // Фактические даты
  factDates: {
    startDate: Date
    stopDate: Date
  }
  duration: number
  student: IUsersRow
  expertOrInspector: IUsersRow
  resolution: ResolutionsType
  // Комментарий
  comment: string
  // Информация
  info: string
  // Примечание для администратора
  note: string
}

// CONSTANTS
const examSchema = object({
  subject: string().nullable().required('Укажите название экзамена'),
  examId: string().nullable().required('Укажите идентификатор экзамена'),
  organization: object().nullable().required('Укажите правообладателя'),
  courseCode: string().nullable().required('Укажите курс'),
  sessionCode: object().nullable().required('Укажите сессию'),
  assignment: string().nullable().required('Укажите испытание'),
  async: object().nullable().required('Укажите тип экзамена'),
  examCode: string().nullable(),
  verifications: array().required(),
  terms: object({
    leftDate: date().nullable().required('Укажите дату'),
    rightDate: date().nullable().required('Укажите дату')
  })
    .nullable()
    .required('Укажите плановые даты'),
  planDates: object({
    beginDate: date().optional().nullable(),
    endDate: date().optional().nullable()
  }),
  factDates: object({
    startDate: date().optional().nullable(),
    stopDate: date().optional().nullable()
  }),
  duration: number()
    .optional()
    .nullable()
    .min(1, 'Минимальная длительность экзамена 1 минута')
    .max(600, 'Максимальная длительность экзамена 600 минут')
    .integer('Длительность экзамена не может быть отрицательной')
    .required('Укажите длительность экзамена'),
  student: object().required('Укажите слушателя'),
  expertOrInspector: object().nullable(),
  resolution: object().nullable(),
  comment: string().nullable(),
  info: string().nullable(),
  note: string().nullable()
})

// DEFAULT FUNCTIONS

const toRequestData = (data: IExamForm, examId?: string) => {
  console.log(data.verifications)
  return {
    assignment: data.assignment,
    async: data.async.id,
    beginDate: data.planDates.beginDate ? data.planDates.beginDate.toISOString() : null,
    comment: data.comment,
    course: data.sessionCode._id,
    duration: data.duration,
    endDate: data.planDates.endDate ? data.planDates.endDate.toISOString() : null,
    examCode: data.examCode,
    examId: data.examId,
    expert: data.async.id === 'true' && data.expertOrInspector ? data.expertOrInspector._id : null,
    info: data.info,
    inspector:
      data.async.id === 'false' && data.expertOrInspector ? data.expertOrInspector._id : null,
    leftDate: data.terms.leftDate.toISOString(),
    note: data.note,
    organization: data.organization._id,
    resolution: data.resolution.value,
    rightDate: data.terms.rightDate.toISOString(),
    startDate: data.factDates.startDate ? data.factDates.startDate.toISOString() : null,
    stopDate: data.factDates.stopDate ? data.factDates.stopDate.toISOString() : null,
    student: data.student._id,
    subject: data.subject,
    verifications: getPostVerificstions(data.verifications),
    _id: examId ?? null
  }
}

interface IAddEditExamProp {
  examId?: string
  onSubmit?: () => void
}

const AddEditExam: FC<IAddEditExamProp> = ({ examId, onSubmit }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [organizationsList, setOrganizationsList] = useState<IOrganization[]>([])
  const [courseCodes, setCourseCodes] = useState<string[]>([])
  const [sessionCodes, setSessionCodes] = useState<ISessionCode[]>([])

  const [isStudentsLoading, setIsStudentsLoading] = useState<boolean>(false)
  const [isProctorsLoading, setIsProctorsLoading] = useState<boolean>(false)

  const [studentsList, setStudentsList] = useState<IUsersRow[]>([])
  const [proctorsList, setProctorsList] = useState<IUsersRow[]>([])

  const [examType, setExamType] = useState<boolean>(true)

  const user = useAppSelector((state) => state.user)

  const { getOrganizations } = useOrganizations()

  const { control, setValue, reset, handleSubmit, resetField, formState, getValues } =
    useForm<IExamForm>({
      mode: 'all',
      resolver: yupResolver(examSchema),
      defaultValues: {
        examId: 'course-v1',
        duration: 1,
        async: { id: 'true', label: 'Асинхронный' },
        resolution: resolutions[2],
        verifications: [fullVerificationItems[4]]
      }
    })

  const getCourseCodes = (organizationId: string): void => {
    request.courses.getCourseCodesByOrganizationId(organizationId).then((r) => {
      console.log(r.data.rows)
      setCourseCodes(r.data.rows)
    })
  }

  const getSessionCodes = (courseCode: string): void => {
    const organizationId = getValues('organization')._id
    console.log(organizationId, courseCode)
    request.courses.getSessionCodes(organizationId, courseCode).then((r) => {
      console.log(r.data.rows)
      setSessionCodes(r.data.rows)
    })
  }

  const getStudents = (query: string): void => {
    setIsStudentsLoading(true)
    request.users.getListOfUsers({ role: '1', rows: 20, text: query }).then(({ data }) => {
      setIsStudentsLoading(false)
      setStudentsList(data.rows)
    })
  }

  const getProctors = (query: string): void => {
    setIsProctorsLoading(true)
    const async = getValues('async')
    console.log(async)
    if (async) {
      request.users
        .getListOfUsers({
          role: async.id === 'true' ? 'expert,3' : '2,expert',
          rows: 20,
          text: query
        })
        .then(({ data }) => {
          setIsProctorsLoading(false)
          setProctorsList(data.rows)
        })
    }
  }

  useEffect(() => {
    getProctors('')
    getStudents('')

    getOrganizations()
      .then((r) => r.filter((i) => i.code && i.code !== 'global' && i.code !== 'notStudent'))
      .then((r) => {
        if (user.role === RoleEnum.ADMIN && user.organization.code !== 'global') {
          const organization = r.filter((i) => i._id === user.organization._id)
          if (organization.length) {
            setValue('organization', organization[0])
          }
          return organization
        }
        return r
      })
      .then((r) => setOrganizationsList(r))
      .then(() => (examId ? request.exam.getExam(examId).then((r) => r.data) : null))
      .then((exam) => {
        console.log(exam)
        if (exam) {
          reset({
            subject: exam.subject,
            examId: exam.examId,
            organization: exam.organization,
            courseCode: exam.course?.courseCode,
            sessionCode: { _id: exam.course?._id, sessionCode: exam.course?.sessionCode },
            assignment: exam.assignment,
            examCode: exam.examCode,
            async: examTypesObj[String(exam.async)],
            verifications: getVerifications(exam.verifications),
            terms: {
              leftDate: exam.leftDate ? new Date(exam.leftDate) : undefined,
              rightDate: exam.rightDate ? new Date(exam.rightDate) : undefined
            },
            planDates: {
              beginDate: exam.beginDate ? new Date(exam.beginDate) : undefined,
              endDate: exam.endDate ? new Date(exam.endDate) : undefined
            },
            factDates: {
              startDate: exam.startDate ? new Date(exam.startDate) : undefined,
              stopDate: exam.stopDate ? new Date(exam.stopDate) : undefined
            },
            duration: exam.duration,
            student: exam.student,
            expertOrInspector: exam.expert ?? exam.inspector,
            resolution:
              exam.resolution === null
                ? resolutions[2]
                : exam.resolution
                ? resolutions[0]
                : resolutions[1],
            comment: exam.comment,
            info: exam.info,
            note: exam.note
          })
        }
      })
  }, [])

  const onFormSubmit: SubmitHandler<IExamForm> = (data) => {
    console.log(data.verifications)
    Promise.resolve(
      examId
        ? request.exam.editExam(toRequestData(data, examId), examId)
        : request.exam.addExam(toRequestData(data))
    )
      .then(() => {
        closeModal()
        if (onSubmit) {
          onSubmit()
        }
      })
      .catch(console.log)
  }

  return (
    <>
      <ModalTitle title={'exam'} />
      <div className={classJoiner(cnMixSpace({ pH: '2xs' }), cn.wrapper)}>
        {isLoading ? (
          <SkeletonText fontSize='l' rows={40} />
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
                          control={control}
                          name='subject'
                          render={({ field, fieldState }) => (
                            <TextField
                              size='s'
                              value={field.value}
                              onChange={({ value }) => field.onChange(value)}
                              label={'Экзамен'}
                              required
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
                      key: 22,
                      flex: 1,
                      component: (
                        <Controller
                          control={control}
                          name='examId'
                          render={({ field, fieldState }) => (
                            <TextField
                              size='s'
                              value={field.value}
                              onChange={({ value }) => field.onChange(value)}
                              label={'Идентификатор экзамена'}
                              required
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
                          control={control}
                          name='organization'
                          render={({ field, fieldState }) => (
                            <Combobox
                              size='s'
                              required
                              label='Правообладатель'
                              placeholder='Правообладатель'
                              items={organizationsList}
                              value={field.value}
                              getItemLabel={(item) => item.shortName ?? item.fullName}
                              getItemKey={(item) => item._id}
                              onChange={({ value }) => {
                                console.log('log')

                                resetField('sessionCode')
                                resetField('courseCode')
                                setSessionCodes([])
                                setCourseCodes([])

                                if (value) {
                                  getCourseCodes(value._id)
                                }

                                field.onChange(value)
                              }}
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
                          control={control}
                          name='courseCode'
                          render={({ field }) => (
                            <Select
                              size='s'
                              label='Курс'
                              required
                              items={courseCodes}
                              getItemLabel={(item) => item}
                              getItemKey={(item) => item}
                              value={field.value}
                              onChange={({ value }) => {
                                resetField('sessionCode')
                                if (value) {
                                  getSessionCodes(value)
                                }
                                field.onChange(value)
                              }}
                            />
                          )}
                        />
                      )
                    },
                    {
                      key: 42,
                      flex: 1,
                      component: (
                        <Controller
                          control={control}
                          name='sessionCode'
                          render={({ field }) => (
                            <Select
                              size='s'
                              label='Сессия'
                              required
                              items={sessionCodes}
                              value={field.value}
                              getItemKey={(item) => item._id}
                              getItemLabel={(item) => item.sessionCode}
                              onChange={({ value }) => {
                                console.log(value)
                                field.onChange(value)
                              }}
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
                          control={control}
                          name='assignment'
                          render={({ field, fieldState }) => (
                            <TextField
                              size='s'
                              value={field.value}
                              onChange={({ value }) => field.onChange(value)}
                              label={'Испытание'}
                              required
                              status={fieldState.error ? 'alert' : undefined}
                              caption={fieldState.error?.message}
                            />
                          )}
                        />
                      )
                    },
                    {
                      key: 52,
                      flex: 1,
                      component: (
                        <Controller
                          control={control}
                          name='async'
                          render={({ field, fieldState }) => (
                            <SmartSelect
                              withLabel
                              itemsType={'examTypes'}
                              value={field.value}
                              onChange={({ value }) => {
                                if (value) setExamType(value.id === 'true')
                                field.onChange(value)
                              }}
                              required
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
                          control={control}
                          name='examCode'
                          render={({ field }) => (
                            <TextField
                              size='s'
                              value={field.value}
                              onChange={({ value }) => field.onChange(value)}
                              label={'Код'}
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
                          control={control}
                          name='verifications'
                          render={({ field }) => (
                            <Combobox
                              label={'Верификации'}
                              placeholder={'Виды верификации'}
                              size={'s'}
                              multiple
                              items={fullVerificationItems}
                              value={field.value}
                              onChange={({ value }) => {
                                if (!value || value.includes(fullVerificationItems[4])) {
                                  field.onChange([fullVerificationItems[4]])
                                } else if (value.includes(fullVerificationItems[3])) {
                                  field.onChange([fullVerificationItems[3]])
                                } else if (
                                  value.includes(fullVerificationItems[0]) ||
                                  value.includes(fullVerificationItems[1]) ||
                                  value.includes(fullVerificationItems[2])
                                ) {
                                  const val = value.filter(
                                    (item) =>
                                      JSON.stringify(item) !==
                                        JSON.stringify(fullVerificationItems[3]) &&
                                      JSON.stringify(item) !==
                                        JSON.stringify(fullVerificationItems[4])
                                  )
                                  field.onChange(val)
                                }
                              }}
                              getItemKey={(item) => item.label}
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
                      component: (
                        <Controller
                          control={control}
                          name='terms'
                          render={({ field, fieldState }) => (
                            <DatePicker
                              placeholder={'ДД.ММ.ГГГГ ЧЧ.ММ'}
                              format={'dd.MM.yyyy HH:mm'}
                              multiplicitySeconds={0}
                              label={'Сроки'}
                              required
                              labelPosition={'top'}
                              size={'s'}
                              type={'date-time-range'}
                              value={
                                field.value ? [field.value.leftDate, field.value.rightDate] : null
                              }
                              onChange={({ value }) =>
                                field.onChange(
                                  value ? { leftDate: value[0], rightDate: value[1] } : null
                                )
                              }
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
                  key: 9,
                  components: [
                    {
                      key: 91,
                      component: (
                        <Controller
                          control={control}
                          name='planDates'
                          render={({ field, fieldState }) => (
                            <DatePicker
                              label={'Плановые даты'}
                              labelPosition={'top'}
                              size={'s'}
                              type={'date-time-range'}
                              placeholder={'ДД.ММ.ГГГГ ЧЧ.ММ'}
                              format={'dd.MM.yyyy HH:mm'}
                              multiplicitySeconds={0}
                              value={
                                field.value ? [field.value.beginDate, field.value.endDate] : null
                              }
                              onChange={({ value }) =>
                                field.onChange(
                                  value ? { beginDate: value[0], endDate: value[1] } : null
                                )
                              }
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
                  key: 10,
                  components: [
                    {
                      key: 101,
                      component: (
                        <Controller
                          control={control}
                          name='factDates'
                          render={({ field, fieldState }) => (
                            <DatePicker
                              placeholder={'ДД.ММ.ГГГГ ЧЧ.ММ'}
                              format={'dd.MM.yyyy HH:mm'}
                              multiplicitySeconds={0}
                              size={'s'}
                              type={'date-time-range'}
                              label={'Фактические даты'}
                              labelPosition={'top'}
                              value={
                                field.value ? [field.value.startDate, field.value.stopDate] : null
                              }
                              onChange={({ value }) =>
                                field.onChange(
                                  value ? { startDate: value[0], stopDate: value[1] } : null
                                )
                              }
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
                  key: 11,
                  components: [
                    {
                      key: 111,
                      component: (
                        <Controller
                          control={control}
                          name='duration'
                          render={({ field, fieldState }) => (
                            <TextField
                              type={'number'}
                              min={1}
                              max={600}
                              size='s'
                              label='Длительность'
                              required
                              value={String(field.value)}
                              onChange={({ value }) => field.onChange(Number(value))}
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
                  key: 12,
                  components: [
                    {
                      key: 121,
                      flex: 1,
                      component: (
                        <Controller
                          control={control}
                          name='student'
                          render={({ field, fieldState }) => (
                            <Combobox
                              size={'s'}
                              label={'Слушатель'}
                              required
                              items={studentsList}
                              value={field.value}
                              onChange={({ value }) => field.onChange(value)}
                              onInputChange={(vale) => {
                                console.log(vale)
                                vale.value && getStudents(vale.value)
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
                              isLoading={isStudentsLoading}
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
                  key: 13,
                  components: [
                    {
                      key: 131,
                      flex: 1,
                      component: (
                        <Controller
                          control={control}
                          name='expertOrInspector'
                          render={({ field }) => (
                            <Combobox
                              size={'s'}
                              label={examType ? 'Эксперт' : 'Проктор'}
                              items={proctorsList}
                              value={field.value}
                              onChange={({ value }) => field.onChange(value)}
                              onInputChange={({ value }) => {
                                value && getProctors(value)
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
                      )
                    }
                  ]
                },
                {
                  key: 14,
                  components: [
                    {
                      key: 141,
                      flex: 1,
                      component: (
                        <Controller
                          control={control}
                          name='resolution'
                          render={({ field, fieldState }) => (
                            <SmartSelect
                              withLabel
                              itemsType={'resolutions'}
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
                  key: 15,
                  components: [
                    {
                      key: 151,
                      flex: 1,
                      component: (
                        <Controller
                          control={control}
                          name='comment'
                          render={({ field }) => (
                            <TextField
                              label='Комменарий'
                              size='s'
                              type='textarea'
                              maxRows={3}
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
                  key: 16,
                  components: [
                    {
                      key: 161,
                      flex: 1,
                      component: (
                        <Controller
                          control={control}
                          name='note'
                          render={({ field }) => (
                            <TextField
                              label='Примечание для администратора'
                              size='s'
                              type='textarea'
                              maxRows={3}
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
                  key: 17,
                  components: [
                    {
                      key: 171,
                      flex: 1,
                      component: (
                        <Controller
                          control={control}
                          name='info'
                          render={({ field }) => (
                            <TextField
                              label='Информация'
                              size='s'
                              type='textarea'
                              maxRows={3}
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

export default AddEditExam
