import { IVideos } from '../../../../ts/interfaces/IExam'
import {getTime} from '../../../../utils/common/times';

export interface violationsStatsConfig {
  title: string
  tooltipContent: string
  withIcon: boolean
  value: string | number
}

export const violationsTitles = {
  noFaces: 'Отсутствие лиц',
  severalFaces: 'Несколько лиц',
  noSounds: 'Отсутствие звуков'
}

export const getViolationsStatsConfig = (videos: IVideos): violationsStatsConfig[] => {
  const totalViolationsPart =
    videos.stats.noFaces + videos.stats.noSounds + videos.stats.severalFaces
  const totalViolationsTime = videos.totalTime

  return [
    {
      title: 'Всего нарушений',
      tooltipContent: 'Всего нарушений',
      withIcon: true,
      value: (totalViolationsPart * 100).toFixed(2) + '%'
    },
    {
      title: 'Длительность нарушений',
      tooltipContent: '',
      withIcon: false,
      value: getTime(totalViolationsTime)
    },
    {
      title: 'Отсутствие звуков',
      tooltipContent: 'Отсутствие звуков',
      withIcon: true,
      value: (videos.stats.noSounds * 100).toFixed(2) + '%'
    },
    {
      title: 'Отсутствие лиц',
      tooltipContent: 'Отсутствие лиц',
      withIcon: true,
      value: (videos.stats.noFaces * 100).toFixed(2) + '%'
    },
    {
      title: 'Несколько лиц',
      tooltipContent: 'Несколько лиц',
      withIcon: true,
      value: (videos.stats.severalFaces * 100).toFixed(2) + '%'
    },
    {
      title: 'Рейтинг доверия',
      tooltipContent: 'Рейтинг доверия',
      withIcon: true,
      value: (0.62 * 100).toFixed(2) + '%'
    }
  ]
}

// export interface VialtionTimeLineItem {}
//
// export const getViolationsTimeline = (results: IResult[]): VialtionTimeLineItem[] => {}
