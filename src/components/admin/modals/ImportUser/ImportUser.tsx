import React, {FC, useEffect, useState} from 'react';
import ModalTitle from '../../../shared/ModalView/ModalTitle/ModalTitle';
import {classJoiner} from '../../../../utils/common/styleClassesUtills';
import {cnMixSpace} from '@consta/uikit/MixSpace';
import cl from './ImportUser.module.scss'
import FilterConstructor from '../../../shared/Filter/FilterConstructor';
import SmartSelect from '../../../shared/SmartSelect/SmartSelect';
import {Controller, useForm} from 'react-hook-form';
import {DefaultItem} from '@consta/uikit/Select';
import {IOrganization} from '../../../../ts/interfaces/IOrganizations';
import {Combobox} from '@consta/uikit/Combobox';
import {useOrganizations} from '../../../../hooks/admin/useOrganizations';
import {RoleEnum} from '../../../../config/router/authСonfig';
import {useAppSelector} from '../../../../hooks/store/useAppSelector';
import {SkeletonText} from '@consta/uikit/Skeleton';
import SmartFileField from '../../../shared/SmartFileField/SmartFileField';
import {IconSave} from '@consta/icons/IconSave';
import downloadImportExample from '../../../../utils/admin/users/downloadImportExample';

interface IImportUserForm {
  provider: DefaultItem,
  organization: IOrganization
  file: File | undefined
}

const ImportUser: FC = () => {
  const {control, formState, reset, handleSubmit, setValue} = useForm<IImportUserForm>()

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const profile = useAppSelector((state) => state.user)

  const {getOrganizations, getOrganization} = useOrganizations()
  const [organizationList, setOrganizationList] = useState<IOrganization[]>([])

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

  return (
    <>
      <ModalTitle title={'importUser'}/>
      <div className={classJoiner(cnMixSpace({pH: '2xs'}), cl.wrapper)}>
        {isLoading ? <SkeletonText rows={15}/> :
          <form noValidate>
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
                            itemsType={'providers'}
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
                          <SmartFileField type={'input'} label={'Файл'} fileName={field.value?.name}
                                          fileNamePlaceholder={'CSV файл (с заголовком)'} buttonLabel={'Выбрать'}/>
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
                      <SmartFileField type={'output'} label={'Пример файла'} iconLeft={IconSave} buttonLabel={'Загрузить'}
                                      downloadFunction={downloadImportExample}/>
                    )
                  }
                ]
              }
            ]}/>
          </form>
        }
      </div>
    </>
  );
};

export default ImportUser;
