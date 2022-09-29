import React, {FC, useEffect, useState} from 'react';
import {Table} from "@consta/uikit/Table";
import cl from './ExamTable.module.scss'
import {Checkbox} from "@consta/uikit/Checkbox";
import {Text} from "@consta/uikit/Text";
import {columns, ITableRow} from "./tableRowModel";
import {responseTableData} from "../../mockData/examTableData";
import {Button} from "@consta/uikit/Button";
import {IconVideo} from "@consta/uikit/IconVideo";
import {IconBento} from "@consta/uikit/IconBento";


const ExamTable:FC = () => {

    const [fullRows, setFullRows] = useState<ITableRow[]>([])

    useEffect(()=>{
        let obj = responseTableData.map(item => {
            return{
                ...item,
                check: <Checkbox checked={true}/>,
                video: <Button onlyIcon iconRight={IconVideo}/>,
                more: <Button onlyIcon iconRight={IconBento}/>
            }
        })

        setFullRows(obj)
    }, [])
    return (
            <Table
                rows={fullRows}
                columns={columns}
                zebraStriped={'odd'}
                borderBetweenColumns
                borderBetweenRows
                className={cl.table}
                emptyRowsPlaceholder={<Text>ajshfjl</Text>}
            />
    );
};

export default ExamTable;