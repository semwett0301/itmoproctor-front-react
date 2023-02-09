import React, { FC } from 'react'
import cn from './TimelineGuideModal.module.scss'
import ModalTitle from '../../../../shared/ModalView/ModalTitle/ModalTitle'
import { Text } from '@consta/uikit/Text'
import { classJoiner } from '../../../../../utils/common/styleClassesUtills'
// TYPES

// CONSTANTS

// DEFAULT FUNCTIONS

const TimelineGuideModal: FC = () => {
  return (
    <div>
      <ModalTitle titleString={'Информация по диаграмме нарушений'} />
      <div className={cn.content}>
        <Text size={'s'}>
          На диаграмме представлены возможные нарушения, обнаруженные автоматической системой на
          основе видео с экзамена.
          <br />
          <br />
          Данные могут быть неточными и неполными и предназначены для помощи эксперту в выставлении
          заключения.
          <br />
          <br />
          На временной диаграмме цветными полосами обозначены нарушения различных типов,
          обнаруженных в данный период времени.
          <br /> Приняты следующие обозначения:
        </Text>

        <br />

        <div className={cn.violationMapping}>
          <div className={classJoiner(cn.colorBlock, cn.noFaces)} />
          <Text size={'s'}>
            Отсутствие лиц (слушатель частично скрыл лицо, отвернулся или вышел из кадра)
          </Text>
          <div className={classJoiner(cn.colorBlock, cn.severalFaces)} />
          <Text size={'s'}>Несколько лиц (обнаружено несколько лиц в кадре)</Text>
          <div className={classJoiner(cn.colorBlock, cn.noSound)} />
          <Text size={'s'}>Отсутствие звуков (микрофон отключен)</Text>
          <div className={classJoiner(cn.colorBlock, cn.many)} />
          <Text size={'s'}>Несколько нарушений</Text>
        </div>

        <br />

        <Text size={'s'}>
          При наведении на цветные полосы показывается дополнительная информация о нарушениях. В
          скобках после типа нарушения указана длительность нарушения в процентном соотношении.
        </Text>
      </div>
    </div>
  )
}

export default TimelineGuideModal
