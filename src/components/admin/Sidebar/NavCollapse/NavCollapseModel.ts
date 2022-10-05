import {IconBag} from "@consta/uikit/IconBag";
import {IconLayers} from "@consta/uikit/IconLayers";
import {IconCalendar} from "@consta/uikit/IconCalendar";
import {IconFolders} from "@consta/uikit/IconFolders";
import {IconLineAndBarChart} from "@consta/uikit/IconLineAndBarChart";
import {IconTeam} from "@consta/uikit/IconTeam";
import {IconOperators} from "@consta/uikit/IconOperators";
import {IconPanelBottom} from "@consta/uikit/IconPanelBottom";
import {IconComponent} from "@consta/uikit/Icon";

export type ICollapseItem = {
    path: string,
    icon: IconComponent,
    title: string,
    children?: ICollapseItem[]
}

export const collapseItems: ICollapseItem[] = [
    {path:'exams', icon: IconFolders, title: 'Экзамены'},
    {path:'users', icon: IconTeam, title: 'Пользователи'},
    {path:'schedule', icon: IconCalendar, title: 'Расписание'},
    {path:'courses', icon: IconLayers, title: 'Курсы'},
    {path:'organizations', icon: IconBag, title: 'Университеты'},
    {path:'maintenance', icon: IconTeam, title: 'Тех.Работы'},
    {path:'', icon: IconLineAndBarChart, title: 'Стастика', children:
            [
                {path:'', icon: IconTeam, title: 'Пользователи'},
                {path:'', icon: IconPanelBottom, title: 'Экзамены'},
                {path:'', icon: IconCalendar, title: 'Расписание'},
                {path:'', icon: IconOperators, title: 'Прокторы'},
            ]
    }
]
