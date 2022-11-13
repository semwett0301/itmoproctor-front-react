import React, { FC } from 'react';
import { withTooltip } from '@consta/uikit/withTooltip';
import { Text } from '@consta/uikit/Text';
import cl from './TextWithTooltip.module.scss';

// TYPES
interface ITextWithTooltipProp {
  children?: never;
  text: string;
  tooltipText: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const TextWithTooltip: FC<ITextWithTooltipProp> = ({ text, tooltipText, onClick }) => {
  const WithToolTip = withTooltip({
    content: tooltipText,
    direction: 'upStartLeft',
    possibleDirections: ['upStartRight', 'downLeft'],
    size: 'l'
  })(Text);
  return <>
    <WithToolTip
      as={'div'}
      onClick={onClick}
      size={'s'}
      truncate={true}
      className={cl.text}
    >
      {text}
    </WithToolTip>
  </>;
};

export default TextWithTooltip;
