import React, { FC } from 'react'
import { Responses403 } from '@consta/uikit/Responses403'

const AccessDenied: FC = () => {
      return (
            <div
                  style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: '5em',
                  }}
            >
                  <Responses403 />
            </div>
      )
}

export default AccessDenied
