import { createIcon } from '@consta/icons/Icon'
import { SVGProps } from 'react'

const IconCustomSaveS = (props: SVGProps<SVGSVGElement>) => (
  <svg width="20" height="20" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path fillRule="evenodd" clipRule="evenodd" d="M1.25 0C0.559644 0 0 0.559644 0 1.25V8.75C0 9.44036 0.559644 10 1.25 10H8.75C9.44036 10 10 9.44036 10 8.75V3.01777C10 2.68625 9.8683 2.3683 9.63388 2.13388L7.86612 0.366117C7.6317 0.131696 7.31376 0 6.98223 0H1.25ZM6.98223 1H1V3.01777H6.98223V1ZM4.5 8C5.32843 8 6 7.32843 6 6.5C6 5.67157 5.32843 5 4.5 5C3.67157 5 3 5.67157 3 6.5C3 7.32843 3.67157 8 4.5 8Z"/>
  </svg>
);

export const IconCustomSave = createIcon({
  l: IconCustomSaveS,
  m: IconCustomSaveS,
  s: IconCustomSaveS,
  xs: IconCustomSaveS,
  name: 'IconCustomDownload',
  renderType: {
    s: 'default'
  },
  color: 'mono'
})
