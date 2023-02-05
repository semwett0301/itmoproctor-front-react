import React, { FC, useEffect, useState } from 'react'
import { IReport, ViolationsNames } from '../../../../ts/interfaces/IExam'
import { Histogram, HistogramProps } from '@consta/charts/Histogram'

// CONSTANTS

type ALlViolationsNames = ViolationsNames | 'many'
const violationsColors: {
  [key in ALlViolationsNames]: string
} = {
  noFaces: '#EB5757',
  severalFaces: '#F01DB5',
  noSounds: '#E99311',
  many: '#A71753'
}

// DEFAULT FUNCTIONS

type DataType = {
  value: number
  name?: string
  color?: string
}

interface ITimeLineHistProp {
  report: IReport
}

const TimeLineHist: FC<ITimeLineHistProp> = ({ report }) => {
  const [data, setData] = useState<DataType[]>([])

  useEffect(() => {
    let da: DataType[] = []
    da = report.videos.results.reduce((acc, item) => {
      const arr = Array(Math.floor(item.endTime - item.startTime))
        .fill(1)
        .map((val, i) => {
          const name = item.violations.length > 1 ? 'many' : null

          return {
            value: item.startTime + i,
            name: name ?? item.violations[0].name,
            color: violationsColors[name ?? item.violations[0].name]
          }
        })

      return [...acc, ...arr]
    }, [] as DataType[])

    setData(da)
  }, [report])

  const options: Omit<HistogramProps, 'data'> = {
    legend: {
      position: 'left'
    },
    binField: 'value',
    stackField: 'name',
    color: (item) => {
      return violationsColors[item['name'] as ALlViolationsNames]
    },
    // ['#33ACF2', '#FFA217', '#04BC7F', '#A71753'],
    binNumber: data.length,
    binWidth: 1,
    height: 1,
    columnStyle: {
      strokeOpacity: 0
    },
    yAxis: {
      tickInterval: 1
    },
    tooltip: {
      formatter: () => {
        return { name: 'Что-то', value: 'еще что-то' }
      }
    },
    xAxis: {
      max: report.videos.totalTime,
      tickMethod: (config) => {
        console.log(config)
        const max = Math.floor(report.videos.totalTime)
        const arr = Array(Math.floor(max / 30))
          .fill(1)
          .map((v, i) => (i + 1) * 30)
        if (max - arr[arr.length - 1] < 15) arr.pop()
        return [0, ...arr, max]
      }
    }
  }

  return <Histogram data={data} {...options} />
}

export default TimeLineHist
