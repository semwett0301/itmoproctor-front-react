import React, {FC, useEffect, useState} from 'react'
import ModalTitle from '../../../shared/ModalView/ModalTitle/ModalTitle'
import cl from './AddEditCourse.module.scss'
import FilterConstructor from '../../../shared/Filter/FilterConstructor'
import {IOrganization} from '../../../../ts/interfaces/IOrganizations'
import {useOrganizations} from '../../../../hooks/admin/useOrganizations'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {TextField} from '@consta/uikit/TextField'
import {verificationItems, VerificationsItemsType} from '../../../../ts/types/Verifications'
import {Combobox} from '@consta/uikit/Combobox'
import OrganizationCombobox from '../../../shared/Filter/OrganizationCombobox/OrganizationCombobox'
import SaveButton from '../../../shared/ModalView/SaveButton/SaveButton'
import {classJoiner} from '../../../../utils/common/styleClassesUtills'
import {cnMixSpace} from '@consta/uikit/MixSpace'
import {array, object, string} from 'yup'
import {request} from '../../../../api/axios/request'
import {closeModal} from '../../../shared/ModalView/ModalView'
import {ICoursePost} from '../../../../api/axios/modules/admin/сourses'
import {RoleEnum} from '../../../../config/router/authСonfig'
import {ICoursesTableModel} from '../../Courses/coursesTableModel'
import {SkeletonText} from '@consta/uikit/Skeleton'
import {useAppSelector} from '../../../../hooks/store/useAppSelector';

// TYPES
interface ICourseForm {
  accessAllowed: IOrganization[] | null
  name: string
  courseCode: string
  organization: IOrganization
  sessionCode: string
  verifications: VerificationsItemsType[] | null
}

interface IAddEditCourseProp {
  courseId?: string
  onSubmit: () => Promise<ICoursesTableModel[]>
}

// CONSTANTS
const courseSchema = object({
  organization: object().nullable().required('Укажите организацию'),
  courseCode: string().required('Укажите код курса'),
  sessionCode: string().required('Укажите код сессии'),
  name: string().nullable(),
  accessAllowed: array(object()).nullable(),
  verifications: array(object()).nullable()
})

// DEFAULT FUNCTIONS
const toRequestData = ({
  accessAllowed,
  courseCode,
  organization,
  sessionCode,
  verifications,
  name
}: ICourseForm): ICoursePost => ({
  accessAllowed: accessAllowed ? accessAllowed.map((i) => i._id) : null,
  courseCode: courseCode,
  organization: organization._id,
  sessionCode: sessionCode,
  name: name ?? null,
  verifications: verifications ? verifications.map((i) => i.id) : null
})

const AddEditCourse: FC<IAddEditCourseProp> = ({ courseId, onSubmit }) => {
  const user = useAppSelector((state) => state.user)
  const [organizationList, setOrganizationList] = useState<IOrganization[]>([])
  const { loading, getOrganizations, getOrganization } = useOrganizations()

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { control, handleSubmit, formState, reset, setValue } = useForm<ICourseForm>({
    mode: 'all',
    resolver: yupResolver(courseSchema),
    defaultValues: { verifications: verificationItems }
  })

  useEffect(() => {
    Promise.resolve(getOrganizations())
      .then((r) => {
        if (user.role === RoleEnum.ADMIN && user.organization.code !== 'global') {
          setOrganizationList(r.filter((i) => i._id === user.organization._id))
          if (!courseId) {
            setValue('organization', getOrganization(user.organization._id))
          }
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
        setIsLoading(false)
        if (courseId) {
          setIsLoading(true)
          request.courses.getCourse(courseId).then((r) => {
            setIsLoading(false)

            if (
              r.data.organization !== user.organization._id &&
              user.organization.code !== 'glodal'
            )
              setOrganizationList((prevState) => [
                ...prevState,
                getOrganization(r.data.organization)
              ])

            reset({
              organization: organizations.find((item) => item._id === r.data.organization),
              sessionCode: r.data.sessionCode,
              courseCode: r.data.courseCode,
              name: r.data.name,
              verifications: verificationItems.filter((item) =>
                r.data.verifications.includes(item.id)
              ),
              accessAllowed: organizations.filter((item) => r.data.accessAllowed.includes(item._id))
            })
          })
        }
      })
  }, [courseId])

  const onFormSubmit: SubmitHandler<ICourseForm> = (data) => {
    Promise.resolve(
      courseId
        ? request.courses.editCourse(toRequestData(data), courseId)
        : request.courses.addCourse(toRequestData(data))
    )
      .then(closeModal)
      .then(onSubmit)
      .catch(console.log)
  }

  return (
    <>
      <ModalTitle title={'course'} />
      <div className={classJoiner(cnMixSpace({ pH: '2xs' }), cl.wrapper)}>
        {isLoading || loading ? (
          <SkeletonText fontSize='l' rows={6} />
        ) : (
          <form noValidate onSubmit={handleSubmit(onFormSubmit)}>
            <FilterConstructor
              items={[
                {
                  key: 1,
                  components: [
                    {
                      key: 1,
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
                              items={organizationList}
                              value={field.value}
                              getItemLabel={(item) => item.shortName ?? item.fullName}
                              getItemKey={(item) => item._id}
                              onChange={({ value }) => {
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
                  key: 2,
                  components: [
                    {
                      key: 21,
                      flex: 2,
                      component: (
                        <Controller
                          name='courseCode'
                          control={control}
                          render={({ field, fieldState }) => (
                            <TextField
                              required
                              label={'Код курса'}
                              placeholder={'Пример: WEBDEV'}
                              width='full'
                              size='s'
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
                      key: 22,
                      flex: 3,
                      component: (
                        <Controller
                          name='sessionCode'
                          control={control}
                          render={({ field, fieldState }) => (
                            <TextField
                              label={'Код сессии'}
                              placeholder={'Пример: spring_2022'}
                              required
                              width='full'
                              size='s'
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
                  key: 22,
                  components: [
                    {
                      key: 221,
                      flex: 2,
                      component: (
                        <Controller
                          name='name'
                          control={control}
                          render={({ field }) => (
                            <TextField
                              label={'Название курса'}
                              placeholder={'Название курса'}
                              width='full'
                              size='s'
                              value={field.value}
                              onChange={({ e }) => field.onChange(e)}
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
                          name='accessAllowed'
                          control={control}
                          render={({ field }) => (
                            <OrganizationCombobox
                              label={'Разрешен доступ'}
                              placeholder={'Разрешен доступ'}
                              value={field.value}
                              onChange={({ value }) => field.onChange(value)}
                              isIdsLoading={false}
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
                          name='verifications'
                          control={control}
                          render={({ field }) => (
                            <Combobox
                              label={'Верификации'}
                              placeholder={'Виды верификации'}
                              size={'s'}
                              multiple
                              items={verificationItems}
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

export default AddEditCourse
