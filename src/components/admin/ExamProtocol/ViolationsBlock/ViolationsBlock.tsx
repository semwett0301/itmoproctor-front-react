import React, {FC, Fragment} from 'react'
import cn from './ViolationsBlock.module.scss'
import {IReport} from '../../../../ts/interfaces/IExam'
import {Text} from '@consta/uikit/Text'
import {Layout} from '@consta/uikit/Layout'
import {cnMixSpace} from '@consta/uikit/MixSpace'
import IconWithTooltip from '../../../shared/IconWithTooltip/IconWithTooltip'
import {IconQuestion} from '@consta/uikit/IconQuestion'
import {getViolationsStatsConfig, violationsTitles} from './ViolationStatsConfig'
import ViolationIcon from './ViolationIcon/ViolationIcon'
import {getTime} from '../../../../utils/common/times';
import {classJoiner} from '../../../../utils/common/styleClassesUtills';

// TYPES
interface IViolationsBlockProp {
  report?: IReport
}

const ViolationsBlock: FC<IViolationsBlockProp> = ({ report }) => {
  return !report ? (
    <></>
  ) : (
    <div className={cn.wrapper}>
      <Layout className={cn.layout}>
        <Layout flex={1} className={classJoiner(cnMixSpace({ pH: 's', pV: 'xs' }), cn.stats)}>
          {getViolationsStatsConfig(report.videos).map((item) => (
            <div className={cn.statsRow} key={item.title}>
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
            </div>
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
                    <Text size={'xs'}>
                      {violationsTitles[violation.name]}({(violation.probability * 100).toFixed(0)}
                      %)
                    </Text>
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
