import React, { FC, Fragment } from 'react'
import cn from './ViolationsBlock.module.scss'
import { IReport } from '../../../../ts/interfaces/IExam'
import { Loader } from '@consta/uikit/Loader'
import { Text } from '@consta/uikit/Text'
import { Layout } from '@consta/uikit/Layout'
import { classJoiner } from '../../../../utils/styleClassesUtills'
import { cnMixSpace } from '@consta/uikit/MixSpace'
import IconWithTooltip from '../../../shared/IconWithTooltip/IconWithTooltip'
import { IconQuestion } from '@consta/uikit/IconQuestion'
import { getViolationsStatsConfig, violationsTitles } from './ViolationStatsConfig'
import { getTime } from '../../../../utils/times'
import ViolationIcon from './ViolationIcon/ViolationIcon'

// TYPES
interface IViolationsBlockProp {
  report?: IReport
}

const ViolationsBlock: FC<IViolationsBlockProp> = ({ report }) => {
  return !report ? (
    <Loader />
  ) : (
    <div className={cn.wrapper}>
      <Layout className={cn.layout}>
        <Layout flex={1} className={classJoiner(cnMixSpace({ pH: 's', pV: 'xs' }), cn.stats)}>
          {getViolationsStatsConfig(report.videos).map((item) => (
            <Fragment key={item.title}>
              <div className={cn.row}>
                <Text size={'xs'} view={'secondary'} className={cn.title}>
                  {item.title}
                </Text>
                {item.withIcon && (
                  <span className={cn.icon}>
                    <IconWithTooltip
                      icon={IconQuestion}
                      tooltipProps={{ content: item.tooltipContent }}
                      iconProps={{ size: 'xs' }}
                    />
                  </span>
                )}
              </div>
              <Text size={'xs'}>{item.value}</Text>
            </Fragment>
          ))}
        </Layout>
        <Layout flex={1} className={classJoiner(cnMixSpace({ pH: 's', pV: 'xs' }), cn.details)}>
          {report.videos.results.map((item) => (
            <Fragment key={item.startTime}>
              <Text view={'secondary'} size={'xs'}>
                {getTime(item.startTime)} - {getTime(item.endTime)}
              </Text>

              <div className={cn.violationWrap}>
                {item.violations.map((violation, i) => (
                  <div key={i} className={cn.violation}>
                    <ViolationIcon violationName={violation.name} />
                    <Text size={'xs'}>{violationsTitles[violation.name]}</Text>
                  </div>
                ))}
              </div>
            </Fragment>
          ))}
        </Layout>
      </Layout>
    </div>
  )
}

export default ViolationsBlock
