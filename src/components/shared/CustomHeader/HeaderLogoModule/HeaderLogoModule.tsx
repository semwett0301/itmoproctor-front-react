import React, {FC} from 'react'
import {HeaderLogo, HeaderModule} from '@consta/uikit/Header'
import logo from '../../../../mockData/logos/Group_12df.svg'

const HeaderLogoModule: FC = () => {
  return (
    <HeaderModule>
      <HeaderLogo>
        <img src={logo} alt='LOGO' />
      </HeaderLogo>
    </HeaderModule>
  )
}

export default HeaderLogoModule
