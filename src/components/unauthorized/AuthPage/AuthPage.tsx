import React, {FC, useState} from 'react'
import classes from './AuthPage.module.scss'
import {useTranslation} from 'react-i18next'
import SwitchLanguage from '../../shared/SwitchLanguage/SwitchLanguage'
import Logo from '../../shared/Logo/Logo'
import {TextField} from '@consta/uikit/TextField'
import {Text} from '@consta/uikit/Text'
import {Button} from '@consta/uikit/Button'
import {Controller, SubmitHandler, useForm} from 'react-hook-form'
import {AppDispatch} from '../../../store'
import {Location, NavigateFunction, useLocation, useNavigate} from 'react-router-dom'
import {request} from '../../../api/axios/request'
import {setUserActionCreator} from '../../../store/reducers/userReducer/userActionCreators'
import {Informer} from '@consta/uikit/Informer'
import {cnMixSpace} from '@consta/uikit/MixSpace'
import {useAppDispatch} from '../../../hooks/store/useAppDispatch';

type LogPassType = {
  login: string
  password: string
}

const AuthPage: FC = () => {
  const dispatch: AppDispatch = useAppDispatch()
  const navigateFunction: NavigateFunction = useNavigate()
  const location: Location = useLocation()

  const [requestError, setRequestError] = useState<unknown>(null)

  const { formState, handleSubmit, control, resetField } = useForm<LogPassType>({
    mode: 'all'
  })

  const { t } = useTranslation()

  const onFormSubmit: SubmitHandler<LogPassType> = (form) => {
    request.auth
      .login({ username: form.login, password: form.password })
      .then(async (r) => {
        await dispatch(setUserActionCreator(r.data))
        location.state.from?.pathname
          ? navigateFunction(location.state.from.pathname)
          : navigateFunction('/')
      })
      .catch(setRequestError)
    resetField('password')
  }

  return (
    <div className={classes.whole_container}>
      <div className={classes.header}>
        <SwitchLanguage />
      </div>
      <div className={classes.main_container}>
        <Logo />

        <div className={cnMixSpace({ mT: '4xl' })}>
          <>
            {requestError && (
              <Informer label={'Неверный логин или пароль'} status={'alert'} view={'bordered'} />
            )}
            <form className={classes.auth_container} onSubmit={handleSubmit(onFormSubmit)}>
              <div>
                <Text view={'secondary'} size={'m'} weight={'light'}>
                  {t('unauthorized.auth.login')}
                </Text>
                <Controller
                  rules={{ required: 'Заполните поле' }}
                  control={control}
                  name={'login'}
                  render={({ field, fieldState }) => (
                    <TextField
                      autoComplete={'username'}
                      id={'login'}
                      name={field.name}
                      value={field.value}
                      onChange={({ value }) => {
                        setRequestError(null)
                        field.onChange(value)
                      }}
                      className={classes.input}
                      size={'s'}
                      caption={fieldState.error?.message}
                      status={fieldState.error ? 'alert' : undefined}
                    />
                  )}
                />
              </div>

              <div>
                <Text view={'secondary'} size={'m'} weight={'light'}>
                  {t('unauthorized.auth.password')}
                </Text>
                <Controller
                  rules={{ required: 'Заполните поле' }}
                  control={control}
                  name={'password'}
                  render={({ field, fieldState }) => (
                    <TextField
                      autoComplete={'current-password'}
                      id={'password'}
                      name={field.name}
                      type='password'
                      value={field.value}
                      onChange={({ value }) => {
                        setRequestError(null)
                        field.onChange(value)
                      }}
                      className={classes.input}
                      size={'s'}
                      caption={fieldState.error?.message}
                      status={fieldState.error ? 'alert' : undefined}
                    />
                  )}
                />
              </div>

              <div className={classes.button_wrapper}>
                <Button
                  className={classes.button}
                  size={'m'}
                  view={'primary'}
                  label={t('unauthorized.auth.signIn')}
                  type={'submit'}
                  disabled={!!formState.errors.login || !!formState.errors.login}
                />
              </div>
            </form>
          </>
        </div>

        <Text className={classes.link_name} size={'m'} view={'secondary'}>
          {t('unauthorized.auth.or')} <span>{t('unauthorized.auth.openEdu')}</span>
        </Text>
      </div>
    </div>
  )
}

export default AuthPage
