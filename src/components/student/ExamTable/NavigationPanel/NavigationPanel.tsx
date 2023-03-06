import React, {FC, useState} from 'react';
import {classJoiner} from '../../../../utils/common/styleClassesUtills';
import cn from './NavigationPanel.module.scss';
import {cnMixSpace} from '@consta/uikit/MixSpace';
import {Item} from '../../../../ts/types/Item';
import {ChoiceGroup} from '@consta/uikit/ChoiceGroup';
import {Button} from '@consta/uikit/Button';
import {IconRestart} from '@consta/icons/IconRestart';
import {IconQuestion} from '@consta/icons/IconQuestion';

const choiceItems: Item[] = [
  {
    id: '1',
    label: 'Текущие экзамены',
  },
  {
    id: '2',
    label: 'Все экзамены',
  }
]

type NavigatorPanelProps = {
  setWithHistory: {
    on: () => void;
    off: () => void;
    toggle: () => void;
  },
  update: () => Promise<void>
}

const NavigationPanel: FC<NavigatorPanelProps> = ({setWithHistory, update}) => {
  const [currentExamMode, setCurrentExamMode] = useState<Item>(choiceItems[0])

  return (
    <div className={classJoiner(cn.buttonBlock, cnMixSpace({m: 's'}))}>
      <ChoiceGroup items={choiceItems} size={'s'} view={'primary'} getItemLabel={(item) => item.label}
                   name={'ExamModeNavigatorPanel'}
                   value={currentExamMode} multiple={false} onChange={({value}) => {
        setCurrentExamMode(value)
        setWithHistory.toggle()
      }}/>
      <div className={cn.extraButtons}>
        <Button view={'clear'} label={'Обновить'} size={'s'} iconLeft={IconRestart} onClick={update} color={'proctor'} className={cn.firstButton}/>
        <Button view={'clear'} label={'Помощь'} size={'s'} iconLeft={IconQuestion} color={'proctor'}/>
      </div>
    </div>
  );
};

export default NavigationPanel;
