import {IUsersRow} from '../../ts/interfaces/IUsers';
import {getShortName} from '../common/nameHelper';
import {IUserApp} from '../../ts/interfaces/IUserApp';
import {TabItem} from '../../components/shared/NavTabs/NavTabs';

export function openUserExams(openTab: (item: TabItem) => void, user: IUsersRow | IUserApp): void {
  openTab({
    id: `userExams/${user._id}`,
    title: `${getShortName(
      user.firstname,
      user.middlename,
      user.lastname
    )}`,
    path: `userExams/${user._id}`,
    type: 'user-exams'
  })
}
