import React, { FC, useState } from 'react'
import classes from './AuthPage.module.scss'
import { Card } from '@consta/uikit/Card'
import { TextField } from '@consta/uikit/TextField'
import notALogo from '../../../mockData/logos/NotALogo.png'
import { Button } from '@consta/uikit/Button'
import { Select } from '@consta/uikit/Select'
import { useTranslation } from 'react-i18next'
import { useLogin } from '../../../hooks/authHooks'

const AuthPage: FC = () => {
  type Item = {
    label: string
    id: string
  }

  const items: Item[] = [
    {
      label: 'Русский',
      id: 'ru'
    },
    {
      label: 'English',
      id: 'en'
    }
  ]

  const findLang: (name: string) => Item = (name) => {
    const item: Item = {
      label: 'Русский',
      id: 'ru'
    }
    const checkItem: Item | undefined = items.find((i) => i.id === name)
    return checkItem === undefined ? item : checkItem
  }

  const [username, setUsername] = useState<string | null>('')
  const loginChange = ({ value }: { value: string | null }) => setUsername(value)
  const [pass, setPass] = useState<string | null>('')
  const passChange = ({ value }: { value: string | null }) => setPass(value)

  const login = useLogin(username, pass)

  const { t, i18n } = useTranslation()

  const [lang, setLang] = useState<Item | null>(findLang(i18n.language))
  console.log()

  const selectChangeHandler: (value: Item | null) => void = (value) => {
    if (value !== null) {
      i18n.changeLanguage(value.id)
    }
    setLang(value)
  }

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
            placeholder={t('shared.auth.login')}
            label={t('shared.auth.login')}
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
            placeholder={t('shared.auth.password')}
            label={t('shared.auth.password')}
            labelPosition='top'
            width={'full'}
            className={classes.customInput}
          />

          <Button
            label={t('shared.auth.signIn')}
            width='full'
            className={classes.send}
            onClick={login}
          />
        </Card>
        <Select
          className={classes.popup}
          size='s'
          view='clear'
          items={items}
          value={lang}
          onChange={({ value }) => selectChangeHandler(value)}
        />
      </div>
    </div>
  )
}

export default AuthPage
