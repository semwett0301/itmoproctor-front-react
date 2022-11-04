import React, {FC, useState} from 'react'
import classes from './AuthPage.module.scss'
import {Card} from '@consta/uikit/Card'
import {TextField} from '@consta/uikit/TextField'
import notALogo from '../../../mockData/logos/NotALogo.png'
import {Button} from '@consta/uikit/Button'
import {useTranslation} from 'react-i18next'
import {useLogin} from '../../../hooks/authHooks'

const AuthPage: FC = () => {

  const [username, setUsername] = useState<string | null>('')
  const loginChange = ({ value }: { value: string | null }): void => setUsername(value)
  const [pass, setPass] = useState<string | null>('')
  const passChange = ({ value }: { value: string | null }): void => setPass(value)

  const login = useLogin(username, pass)

  const { t } = useTranslation()

  return (
    <div className={classes.wrapper}>
      <div>
        <Card verticalSpace='2xl' horizontalSpace='2xl' className={classes.card}>
          <img src={notALogo} alt='Лого заглушка' className={classes.notALogo} />

          <TextField
            required
            onChange={loginChange}
            value={username}
            type='text'
            placeholder={t('unauthorized.auth.login')}
            label={t('unauthorized.auth.login')}
            labelPosition='top'
            width={'full'}
            className={classes.customInput}
          />

          <TextField
            required
            datatype={'password'}
            onChange={passChange}
            value={pass}
            type='password'
            placeholder={t('unauthorized.auth.password')}
            label={t('unauthorized.auth.password')}
            labelPosition='top'
            width={'full'}
            className={classes.customInput}
          />

          <Button
            label={t('unauthorized.auth.signIn')}
            width='full'
            className={classes.send}
            onClick={login}
          />
        </Card>
      </div>
    </div>
  )
}

export default AuthPage
