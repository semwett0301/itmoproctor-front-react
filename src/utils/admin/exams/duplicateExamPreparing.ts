import {IExam} from '../../../ts/interfaces/IExam';
import {request} from '../../../api/axios/request';

export default function(item: IExam): IExam {
  const deletedProperties: Array<keyof IExam> = [
    '_id',
    'examCode',
    'inspector',
    'expert',
    'inCheck',
    'verified',
    'beginDate',
    'endDate',
    'startDate',
    'stopDate',
    'planDate',
    'resolution',
    'comment',
    'note',
  ]

  deletedProperties.forEach(e => Reflect.deleteProperty(item, e))
  return item
}
