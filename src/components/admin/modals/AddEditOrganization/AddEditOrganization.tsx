import React, { FC, useEffect, useState } from 'react'
import cl from './AddEditOrganization.module.scss'
import { IOrganizationFull } from '../../../../ts/interfaces/IOrganizations'
import { request } from '../../../../api/axios/request'
import ModalTitle from '../../../shared/ModalView/ModalTitle/ModalTitle'
import { SkeletonText } from '@consta/uikit/Skeleton'
import { cnMixSpace } from '@consta/uikit/MixSpace'
import FilterConstructor from '../../../shared/Filter/FilterConstructor'
import { TextField } from '@consta/uikit/TextField'
import { Button } from '@consta/uikit/Button'
import { IconCheck } from '@consta/uikit/IconCheck'
import { number, object, string } from 'yup'

// TYPES
interface IAddEditOrganizationProp {
  organizationId?: string
  onSubmit?: () => void
}

// CONSTANTS
// const requiredFieldsKeys: (keyof IOrganizationFull)[] = [
//   'openeduId',
//   'registrationNumber',
//   'fullNameRU',
//   'shortNameRU'
// ]

const AddEditOrganization: FC<IAddEditOrganizationProp> = ({ organizationId }) => {
  const [organization, setOrganization] = useState<IOrganizationFull>({
    _id: null,
    fullNameRU: '',
    shortNameRU: null,
    fullNameEN: null,
    shortNameEN: null,
    code: null,
    openeduId: null,
    registrationNumber: null
  })

  const [isLoad, setIsLoad] = useState<boolean>(false)

  useEffect(() => {
    if (organizationId) {
      setIsLoad(true)
      request.organizations.getFullOrganization(organizationId).then((r) => {
        console.log(r.data)
        setIsLoad(false)
        setOrganization(r.data)
      })
    }
  }, [organizationId])

  // const isValid = useMemo(
  //   () => !requiredFieldsKeys.map((key) => organization[key]).includes(null),
  //   [
  //     organization.openeduId,
  //     organization.registrationNumber,
  //     organization.fullNameRU,
  //     organization.shortNameRU
  //   ]
  // )

  return (
    <div>
      <ModalTitle title={'exam'} />
      {isLoad ? (
        <SkeletonText rows={10} fontSize='s' lineHeight={'l'} />
      ) : (
        <div className={cnMixSpace({ pH: '2xs' })}>
          <FilterConstructor
            items={[
              {
                key: 1,
                components: [
                  {
                    key: 11,
                    component: (
                      <TextField
                        size={'s'}
                        type='text'
                        placeholder='Код'
                        label={'Код'}
                        value={organization.code}
                        width={'full'}
                        onChange={({ value }) =>
                          setOrganization((prevState) => ({ ...prevState, code: value }))
                        }
                      />
                    ),
                    flex: 2
                  },
                  {
                    key: 12,
                    component: (
                      <TextField
                        size={'s'}
                        type='number'
                        placeholder='Идентификатор НПОО'
                        label={'Идентификатор НПОО'}
                        width={'full'}
                        value={String(organization.openeduId)}
                        onChange={({ value }) =>
                          setOrganization((prevState) => ({
                            ...prevState,
                            openeduId: value ? +value : null
                          }))
                        }
                      />
                    ),
                    flex: 3
                  }
                ]
              },
              {
                key: 2,
                components: [
                  {
                    key: 21,
                    component: (
                      <TextField
                        size={'s'}
                        type='text'
                        placeholder='ОГРН'
                        label={'ОГРН'}
                        width={'full'}
                        value={organization.registrationNumber}
                        onChange={({ value }) =>
                          setOrganization((prevState) => ({
                            ...prevState,
                            registrationNumber: value
                          }))
                        }
                      />
                    ),
                    flex: 1
                  }
                ]
              },
              {
                key: 3,
                components: [
                  {
                    key: 31,
                    component: (
                      <TextField
                        size={'s'}
                        type='textarea'
                        rows={2}
                        placeholder='Полное название (рус.)'
                        label={'Полное название (рус.)'}
                        width={'full'}
                        required={true}
                        status={organization.fullNameRU ? undefined : 'alert'}
                        value={organization.fullNameRU}
                        onChange={({ value }) =>
                          setOrganization((prevState) => ({
                            ...prevState,
                            fullNameRU: value || ''
                          }))
                        }
                      />
                    ),
                    flex: 1
                  }
                ]
              },
              {
                key: 4,
                components: [
                  {
                    key: 41,
                    component: (
                      <TextField
                        size={'s'}
                        type='text'
                        placeholder='Короткое название (рус.)'
                        label={'Короткое название (рус.)'}
                        width={'full'}
                        value={organization.shortNameRU}
                        onChange={({ value }) =>
                          setOrganization((prevState) => ({ ...prevState, shortNameRU: value }))
                        }
                      />
                    ),
                    flex: 1
                  }
                ]
              },
              {
                key: 5,
                components: [
                  {
                    key: 51,
                    component: (
                      <TextField
                        size={'s'}
                        type='textarea'
                        rows={2}
                        placeholder='Полное название (англ.)'
                        label={'Полное название (англ.)'}
                        width={'full'}
                        value={organization.fullNameEN}
                        onChange={({ value }) =>
                          setOrganization((prevState) => ({ ...prevState, fullNameEN: value }))
                        }
                      />
                    ),
                    flex: 1
                  }
                ]
              },
              {
                key: 6,
                components: [
                  {
                    key: 61,
                    component: (
                      <TextField
                        size={'s'}
                        type='text'
                        placeholder='Короткое название (англ.)'
                        label={'Короткое название (англ.)'}
                        width={'full'}
                        value={organization.shortNameEN}
                        onChange={({ value }) =>
                          setOrganization((prevState) => ({ ...prevState, shortNameEN: value }))
                        }
                      />
                    ),
                    flex: 1
                  }
                ]
              }
            ]}
          />
          <div className={cl.footer}>
            <Button
              size={'s'}
              label={'Сохранить'}
              iconLeft={IconCheck}
              onClick={() => {
                const IOrganiz = object({
                  _id: string().nullable(),
                  fullNameRU: string().required(),
                  shortNameRU: string().nullable(),
                  fullNameEN: string().nullable(),
                  shortNameEN: string().nullable(),
                  code: string().nullable(),
                  openeduId: string().nullable(),
                  registrationNumber: number().nullable()
                })

                console.log(IOrganiz.isValidSync(organization))

                // Promise.resolve(
                //   organizationId
                //     ? request.organizations.putOrganization(organization)
                //     : request.organizations.postOrganization(organization)
                // )
                //   .then(() => {
                //     if (onSubmit) {
                //       onSubmit()
                //     }
                //     console.log('onSubmit')
                //   })
                //   .then(() => closeModal())
                //   .catch((e) => console.log(e))
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default AddEditOrganization
