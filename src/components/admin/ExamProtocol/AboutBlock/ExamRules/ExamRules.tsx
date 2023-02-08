import React, { FC, useEffect } from 'react'
import cn from './ExamRules.module.scss'
import { IFactors, IFactorsKeys } from '../../../../../ts/interfaces/IExam'
import { factorsConfig } from '../../../../../config/admin/protocol/factorsConfig'
import IconWithTooltip from '../../../../shared/IconWithTooltip/IconWithTooltip'
import { Text } from '@consta/uikit/Text'
// TYPES

// CONSTANTS

// DEFAULT FUNCTIONS

interface IExamRulesProp {
  factors?: IFactors
}

const ExamRules: FC<IExamRulesProp> = ({ factors }) => {
  return factors ? (
    <div className={cn.wrapper}>
      {(Object.keys(factorsConfig) as Array<IFactorsKeys>).map((key) => {
        if (key !== 'asynchronous') {
          return (
            <IconWithTooltip
              key={key}
              icon={factorsConfig[key].component}
              iconProps={{ view: factors[key] ? 'primary' : 'secondary' }}
              tooltipProps={{
                content: factorsConfig[key].content,
                direction: 'upCenter',
                possibleDirections: ['upCenter', 'upRight', 'upLeft'],
                spareDirection: 'upCenter'
              }}
            />
          )
        }
      })}
    </div>
  ) : (
    <Text size={'xs'} view={'secondary'} lineHeight={'xs'}>
      Правила для данного экзамена не установлены
    </Text>
  )
}

export default ExamRules
