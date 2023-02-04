import {TabItem} from '../components/admin/Admin';
import {IUsersRow} from '../ts/interfaces/IUsers';
import {getShortName} from './nameHelper';
import {IUserApp} from '../ts/interfaces/IUserApp';

export function openUserExams(openTab: (item: TabItem) => void, user: IUsersRow | IUserApp): void {
  openTab({
    id: `userExams/${user._id}`,
    title: `Экзамены-${getShortName(
      user.firstname,
      user.middlename,
      user.lastname
    )}`,
    path: `userExams/${user._id}`,
    type: 'tab'
  })
}
