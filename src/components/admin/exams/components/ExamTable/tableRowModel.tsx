import {TableColumn} from "@consta/uikit/Table";
import React, {ReactNode} from "react";
import {Checkbox} from "@consta/uikit/Checkbox";

export interface ITableRow {
    id:string,
    check: ReactNode,
    listener: string,
    proctor: string,
    exam: string,
    type: string,
    start: string,
    status: string,
    video: ReactNode,
    more: ReactNode
}

export const columns: TableColumn<ITableRow>[] = [
    {
        title: '№',
        accessor: 'id',
        align: 'center',
        hidden: true
    },
    {
        title: <Checkbox checked={true}/>,
        accessor: 'check',
        align: 'center'
    },
    {
        title: 'Слушатель',
        accessor: 'listener',
        align:"left"
    },
    {
        title: 'Проктор',
        accessor:'proctor',
        align:"left"
    },
    {
        title: 'Экзамен',
        accessor:'exam',
        align:"left"
    },
    {
        title: 'Тип',
        accessor:'type',
        align:"left"
    },
    {
        title: 'Начало',
        accessor:'start',
        align:"left"
    },
    {
        title: 'Статус',
        accessor: 'status',
        align:"left"
    },
    {
        title: '',
        accessor: 'video',
        align:"center"
    },
    {
        title: '',
        accessor: 'more',
        align:"center"
    }

];