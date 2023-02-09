import React, { FC, useMemo, useState } from 'react'
import cn from './TimeLineHist.module.scss'
import { IReport, ViolationsNames } from '../../../../ts/interfaces/IExam'
import { Text } from '@consta/uikit/Text'
import EChartsReact from 'echarts-for-react'
import videojs from 'video.js'
import { cnMixCard } from '@consta/uikit/MixCard'
import { classJoiner } from '../../../../utils/common/styleClassesUtills'
import { DefaultItem, Select } from '@consta/uikit/Select'
import { IconQuestion } from '@consta/icons/IconQuestion'
import { openModal } from '../../../shared/ModalView/ModalView'
import TimelineGuideModal from '../modals/TimelineGuideModal/TimelineGuideModal'

// TYPES
type ALlViolationsNames = ViolationsNames | 'many'

// type DataType = {
//   value: number
//   name?: string
//   color?: string
// }

// CONSTANTS
const violationsColors: {
  [key in ALlViolationsNames]: string
} = {
  noFaces: '#EB5757',
  severalFaces: '#F01DB5',
  noSounds: '#E99311',
  many: '#A71753'
}

const violationsTitles: {
  [key in ViolationsNames]: string
} = {
  noFaces: 'Нет лица',
  severalFaces: 'Несколько лиц',
  noSounds: 'Нет звуков'
}

// DEFAULT FUNCTIONS

interface ITimeLineHistProp {
  report: IReport
  player: videojs.Player | null
}

const items: DefaultItem[] = [
  { id: 'noFaces', label: 'Нет лица' },
  { id: 'severalFaces', label: 'Несколько лиц' },
  { id: 'noSounds', label: 'Нет звуков' },
  { id: 'many', label: 'Все нарушения' }
]

const TimeLineHist: FC<ITimeLineHistProp> = ({ report, player }) => {
  const [item, setItem] = useState<DefaultItem | null>({ id: 'many', label: 'Все нарушения' })

  const newData = useMemo(
    () =>
      report?.videos
        ? report.videos.results.map((v) => {
            const { startTime, endTime, violations } = v
            if (
              item?.id !== 'many' &&
              !violations
                .map(({ name }) => name)
                .includes(`${(item?.id as ViolationsNames) ?? 'many'}`)
            )
              return

            const newItem = [
              startTime,
              endTime,
              violations.map((i) => violationsTitles[i.name]).join(', ')
            ]

            const violationName = violations[0].name as ViolationsNames

            return {
              value: newItem,
              tooltip: false,
              itemStyle: {
                color:
                  violations.length === 1
                    ? violationsColors[violationName]
                    : violationsColors['many']
              }
            }
          })
        : [],
    [report, item?.id]
  )

  const options = {
    tooltip: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      position: function (pos, params, el, elRect, size) {
        const obj = { top: 10 }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30
        return obj
      }
    },
    grid: {
      left: 4,
      top: 0,
      bottom: 20,
      right: 15
    },
    xAxis: {
      min: 0,
      max: report?.videos ? Math.ceil(report.videos.totalTime) : 0,
      axisTick: {
        show: false
      },
      axisLabel: {
        interval: 30
      }
    },
    yAxis: { show: false, min: 0, max: 1 },
    series: [
      {
        type: 'custom',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        renderItem: (params, api) => {
          const yValue = 1
          const start = api.coord([api.value(0), 1])
          const size = api.size([(api.value(1) as number) - (api.value(0) as number), yValue])
          const style = api.style()

          return {
            type: 'rect',
            shape: {
              x: start[0],
              y: start[1],
              width: size[0],
              height: size[1]
            },
            style: style
          }
        },
        label: {
          show: false,
          position: 'bottom'
        },
        dimensions: ['с', 'до', 'Нарушения'],
        encode: {
          x: [0, 1],
          y: 2,
          tooltip: [0, 1, 2],
          itemName: 3
        },
        data: newData
      }
    ]
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const onChartClick = (params: any): void => {
    console.log(params)
    const timeOffset = Math.round(
      ((params.value[1] - params.value[0]) * (params.event.offsetX - params.event.target.shape.x)) /
        params.event.target.shape.width
    )

    if (player) {
      if (timeOffset < 5) player.currentTime(params.value[0])
      else player.currentTime(params.value[0] + timeOffset)
    }
  }

  const onEvents = {
    click: onChartClick
  }

  return report ? (
    <>
      <div className={cn.title}>
        <Text view={'secondary'} size={'s'} className={cn.titleText}>
          Таймлайн
          <IconQuestion
            size={'xs'}
            className={cn.icon}
            onClick={() => openModal(<TimelineGuideModal />)}
          />
        </Text>
        <Select
          value={item}
          items={items}
          size={'xs'}
          className={cn.select}
          dropdownClassName={cn.dropdown}
          onChange={({ value }) => setItem(value)}
        />
      </div>
      <div className={cn.violationTimeline}>
        <div className={classJoiner(cnMixCard({ border: true, form: 'round' }), cn.timeWrap)}></div>
        <EChartsReact option={options} onEvents={onEvents} style={{ height: '43px' }} />
      </div>
    </>
  ) : (
    <></>
  )
}

export default TimeLineHist
