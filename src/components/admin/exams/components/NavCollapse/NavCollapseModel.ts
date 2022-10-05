import {FC} from "react";
import {IconBag} from "@consta/uikit/IconBag";
import {IconLayers} from "@consta/uikit/IconLayers";
import {IconCalendar} from "@consta/uikit/IconCalendar";
import {IconFolders} from "@consta/uikit/IconFolders";
import {IconLineAndBarChart} from "@consta/uikit/IconLineAndBarChart";
import {IconTeam} from "@consta/uikit/IconTeam";
import {IconOperators} from "@consta/uikit/IconOperators";
import {IconPanelBottom} from "@consta/uikit/IconPanelBottom";

export type ICollapseItem = {
    link: string,
    icon: FC,
    title: string,
    children?: ICollapseItem[]

}

export const collapseItems: ICollapseItem[] = [
    {link:'/exams', icon: IconFolders, title: 'Экзамены'},
    {link:'/ll', icon: IconBag, title: 'Университеты'},
    {link:'', icon: IconLayers, title: 'Курсы'},
    {link:'', icon: IconTeam, title: 'Пользователи'},
    {link:'', icon: IconCalendar, title: 'Расписание'},
    {link:'', icon: IconTeam, title: 'Тех.Работы'},
    {link:'', icon: IconLineAndBarChart, title: 'Стастика', children:
            [
                {link:'', icon: IconTeam, title: 'Пользователи'},
                {link:'', icon: IconPanelBottom, title: 'Экзамены'},
                {link:'', icon: IconCalendar, title: 'Расписание'},
                {link:'', icon: IconOperators, title: 'Прокторы'},
            ]
    }
]