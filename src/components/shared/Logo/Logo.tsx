import React, { FC } from 'react'
import { Text } from '@consta/uikit/Text'
import classes from './Logo.module.scss'

const Logo: FC = () => {
  return (
    <div
      className={classes.logo}
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        width: 172,
        height: 148
      }}
    >
      <svg
        viewBox='0 0 97 89'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        style={{ width: 100, height: 100 }}
      >
        <path style={{ width: '100%', height: '100%' }} d='M0 0H97V89H0V0Z' fill='url(#pattern0)' />
        <defs>
          <pattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'>
            <use
              xlinkHref='#image0_612_14953'
              transform='translate(-0.00622112) scale(0.0079097 0.00862069)'
            />
          </pattern>
          <image
            id='image0_612_14953'
            width='128'
            height='116'
            xlinkHref='data:image/png;base64,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'
          />
        </defs>
      </svg>
      <Text className={classes.text} view={'linkMinor'} size={'2xl'} weight={'bold'}>
        ITMOproctor
      </Text>
    </div>
  )
}

export default Logo
