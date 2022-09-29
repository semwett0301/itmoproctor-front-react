import {TableColumn} from "@consta/uikit/Table";
import {examTableRow} from "../../mockData/examTableData";
// import {FC} from "react";

// type row ={
//     id:string,
//     check: FC,
//     listener: string,
//     proctor: string,
//     exam: string,
//     type: string,
//     start: string,
//     status: string,
//     video: FC,
//     more: FC
// }

export const columns: TableColumn<typeof examTableRow[number]>[] = [
    {
        title: '',
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