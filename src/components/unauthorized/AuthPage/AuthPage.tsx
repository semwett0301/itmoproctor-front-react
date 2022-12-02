import React, { FC, useState } from 'react'
import classes from './AuthPage.module.scss'
import { useTranslation } from 'react-i18next'
import { useLogin } from '../../../hooks/authHooks'
import SwitchLanguage from '../../shared/SwitchLanguage/SwitchLanguage'
import Logo from '../../shared/Logo/Logo'
import { TextField } from '@consta/uikit/TextField'
import { Text } from '@consta/uikit/Text'
import { Checkbox } from '@consta/uikit/Checkbox'
import { Button } from '@consta/uikit/Button'

const AuthPage: FC = () => {
  const [username, setUsername] = useState<string | null>('')
  const loginChange = ({ value }: { value: string | null }): void => setUsername(value)
  const [pass, setPass] = useState<string | null>('')
  const passChange = ({ value }: { value: string | null }): void => setPass(value)

  const login = useLogin(username, pass)

  const { t } = useTranslation()

  const [remember, setRemember] = useState<boolean>(false)

  return (
    <div className={classes.whole_container}>
      <div className={classes.header}>
        <SwitchLanguage />
      </div>
      <div className={classes.main_container}>
        <Logo />

        <div className={classes.auth_container}>
          <div className={classes.input_fields_wrapper}>
            <div className={classes.input_wrapper}>
              <Text view={'secondary'} size={'m'} weight={'light'}>
                {t('unauthorized.auth.login')}
              </Text>
              <TextField
                value={username}
                onChange={loginChange}
                className={classes.input}
                size={'s'}
              />
            </div>
            <div className={classes.input_wrapper}>
              <Text view={'secondary'} size={'m'} weight={'light'}>
                {t('unauthorized.auth.password')}
              </Text>
              <TextField
                type='password'
                value={pass}
                onChange={passChange}
                className={classes.input}
                size={'s'}
              />
            </div>
          </div>

          <div className={classes.button_wrapper}>
            <Button
              className={classes.button}
              size={'m'}
              view={'primary'}
              label={t('unauthorized.auth.signIn')}
              onClick={login}
            />
          </div>
        </div>

        <Text className={classes.link_name} size={'m'} view={'secondary'}>
          {t('unauthorized.auth.or')} <span>{t('unauthorized.auth.openEdu')}</span>
        </Text>
      </div>
    </div>
  )
}

export default AuthPage
