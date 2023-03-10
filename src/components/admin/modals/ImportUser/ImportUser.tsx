import React, {FC, MutableRefObject, Ref, useCallback, useEffect, useRef, useState} from 'react'
import ModalTitle from '../../../shared/ModalView/ModalTitle/ModalTitle'
import {classJoiner} from '../../../../utils/common/styleClassesUtills'
import {cnMixSpace} from '@consta/uikit/MixSpace'
import cl from './ImportUser.module.scss'
import FilterConstructor from '../../../shared/Filter/FilterConstructor'
import SmartSelect from '../../../shared/SmartSelect/SmartSelect'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {DefaultItem} from '@consta/uikit/Select'
import {IOrganization} from '../../../../ts/interfaces/IOrganizations'
import {Combobox} from '@consta/uikit/Combobox'
import {useOrganizations} from '../../../../hooks/admin/useOrganizations'
import {RoleEnum} from '../../../../config/router/authСonfig'
import {useAppSelector} from '../../../../hooks/store/useAppSelector'
import {SkeletonText} from '@consta/uikit/Skeleton'
import {Button} from '@consta/uikit/Button'
import {Text} from '@consta/uikit/Text'
import SmartFileField from '../../../shared/SmartFileField/SmartFileField'
import downloadImportExample from '../../../../utils/admin/users/downloadImportExample'
import {IconUpload} from '@consta/icons/IconUpload'
import {IconCustomSave} from '../../../../customIcons/IconCustomDownload/IconCustomSave'
import {request} from '../../../../api/axios/request';
import {closeModal} from '../../../shared/ModalView/ModalView';
import {object} from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

interface IImportUserForm {
  provider: DefaultItem,
  organization: IOrganization
  file: File | undefined
}

// CONSTANTS
const importUserSchema = object({
  provider: object().nullable().required('Укажите провайдера'),
  organization: object().nullable().required('Укажите организацию'),
  file: object().nullable().required('Добавьте файл')
})


const ImportUser: FC = () => {
  const {control, formState, handleSubmit, setValue} = useForm<IImportUserForm>({
    mode: 'all',
    resolver: yupResolver(importUserSchema)
  })

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const profile = useAppSelector((state) => state.user)

  const fileInput = useRef<HTMLInputElement>() as MutableRefObject<HTMLInputElement>

  const {getOrganizations} = useOrganizations()
  const [organizationList, setOrganizationList] = useState<IOrganization[]>([])
  const [notificationList, setNotificationList] = useState<string[]>([])


  useEffect(() => {
    setIsLoading(true)

    Promise.resolve(getOrganizations())
      .then((r) => {
        if (profile.role === RoleEnum.ADMIN && profile.organization.code !== 'global') {
          setOrganizationList(r.filter((i) => i._id === profile.organization._id))
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
      .then(() => setIsLoading(false))
  }, [])

  const onFormSubmit = useCallback<SubmitHandler<IImportUserForm>>(async (data) => {
    const fileData: string = await data.file?.text() ?? ''

    setNotificationList([])

    await request.users.importUsers({
      organization: data.organization,
      fileData: fileData
    }).then(() => closeModal())
  }, [])

  return (
    <>
      <ModalTitle title={'importUser'}/>
      <div className={classJoiner(cnMixSpace({pH: '2xs'}), cl.wrapper)}>
        {isLoading ? <SkeletonText rows={15}/> :
          <form noValidate onSubmit={handleSubmit(onFormSubmit)}>
            <FilterConstructor items={[
              {
                key: 1,
                components: [
                  {
                    key: 11,
                    flex: 1,
                    component: (
                      <Controller
                        name={'provider'}
                        control={control}
                        render={({field, fieldState}) => (
                          <SmartSelect
                            id={field.name}
                            name={field.name}
                            required
                            itemsType={'localProvider'}
                            label={'Провайдер'}
                            withLabel
                            value={field.value}
                            onChange={({value}) => field.onChange(value)}
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
                        name={'organization'}
                        control={control}
                        render={({field, fieldState}) => (
                          <Combobox
                            size="s"
                            required
                            label="Правообладатель"
                            placeholder="Правообладатель"
                            items={organizationList}
                            value={field.value}
                            getItemLabel={(item) => item.shortName ?? item.fullName}
                            getItemKey={(item) => item._id}
                            onChange={({value}) => {
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
                key: 3,
                components: [
                  {
                    key: 31,
                    flex: 1,
                    component: (
                      <Controller
                        name={'file'}
                        control={control}
                        render={({field, fieldState}) => (
                          <SmartFileField className={cl.inputFileBlock} type={'input'} id={'UsersImportFile'}
                                          label={'Файл'}
                                          required={true}
                                          fileName={field.value?.name}
                                          fileNamePlaceholder={'CSV файл (с заголовком)'}
                                          buttonLabel={'Выбрать'}
                                          inputRef={fileInput}
                                          onInputFile={() => {
                                            if (fileInput.current?.files) {
                                              field.onChange(fileInput.current.files[0])
                                            }
                                          }}
                                          status={fieldState.error ? 'alert' : undefined}
                                          caption={fieldState.error?.message}/>
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
                      <SmartFileField className={cl.outputFileBlock} type={'output'} label={'Пример файла'}
                                      iconLeft={IconCustomSave}
                                      buttonLabel={'Загрузить'}
                                      downloadFunction={downloadImportExample}/>
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
                      <div className={cl.uploadButtonWrapper}>
                        <Button disabled={!formState.isValid} size={'s'} label={'Импорт'} iconLeft={IconUpload}/>
                      </div>
                    )
                  }
                ]
              }
            ]}/>
          </form>
        }
        {
          notificationList.map(text => (
            <Text key={text}>{text}</Text>
          ))
        }
      </div>
    </>
  )
}

export default ImportUser
