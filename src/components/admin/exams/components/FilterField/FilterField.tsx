import React, {FC, useState} from 'react';
import cl from './FilterField.module.scss'
import {Button} from "@consta/uikit/Button";
import {DatePicker} from "@consta/uikit/DatePicker";
import {IconCalendar} from "@consta/uikit/IconCalendar";
import {TextField} from "@consta/uikit/TextField";
import {FieldGroup} from "@consta/uikit/FieldGroup";
import {IconSearch} from "@consta/uikit/IconSearch";
import {Select} from "@consta/uikit/Select";
import {IconAdd} from "@consta/uikit/IconAdd";
import {IconTrash} from "@consta/uikit/IconTrash";
import {IconUpload} from "@consta/uikit/IconUpload";
import {IconRevert} from "@consta/uikit/IconRevert";
import {IconSave} from "@consta/uikit/IconSave";
import {IconCopy} from "@consta/uikit/IconCopy";
import {Layout} from "@consta/uikit/Layout";
import {presetGpnDefault, Theme} from "@consta/uikit/Theme";
import {Grid, GridItem} from "@consta/uikit/Grid";
import {IconDownload} from "@consta/uikit/IconDownload";

const FilterField: FC = () => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [examType, setExamType] = useState<Item | null>();

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

    type Item = {
        label: string;
        id: number;
    };

    const items: Item[] = [
        {
            label: 'Первый',
            id: 1,
        },
        {
            label: 'Второй',
            id: 2,
        },
        {
            label: 'Третий',
            id: 3,
        },
    ];


    return (
        <Theme preset={presetGpnDefault}>
            <Layout direction="row" className={cl.wrapper}>
                <Grid cols="1" colGap="xs" rowGap={"s"}>
                    <GridItem className={cl.firstRow}>
                        <FieldGroup size='s'>
                            <DatePicker value={startDate} onChange={({value}) => setStartDate(value)} rightSide={IconCalendar}/>
                            <DatePicker value={endDate} onChange={({value}) => setEndDate(value)} rightSide={IconCalendar} />
                        </FieldGroup>
                        <TextField placeholder="Поиск по экзамену" rightSide={IconSearch} width={"full"} className={cl.searchField} size='s'/>


                    </GridItem>
                    <GridItem className={cl.firstRow}>
                        <Grid cols="10" gap="xs" className={cl.rowGrid}>
                            <GridItem col="1">
                                <Select items={items} onChange={({value}) => setExamType(value)} placeholder="Тип" size='s'/>
                            </GridItem>

                            <GridItem col="2">
                                <Select items={items} onChange={({value}) => setExamType(value)} placeholder="Статус" size='s'/>
                            </GridItem>

                            <GridItem col="4">
                                <Select items={items} onChange={({value}) => setExamType(value)} placeholder="Правообладатель" size='s'/>
                            </GridItem>

                            <GridItem col="3">
                                <Select items={items} onChange={({value}) => setExamType(value)} placeholder="Попытки" size='s'/>
                            </GridItem>
                        </Grid>

                    </GridItem>

                </Grid>


                <Grid cols="3" colGap="xs" rowGap={"xs"} className={cl.buttonGroup} xAlign="center" yAlign="center">

                    <GridItem className={cl.buttonGridItem}>
                        <Button size='s' view="secondary" onlyIcon={true} iconRight={IconAdd}/>
                    </GridItem>

                    <GridItem className={cl.buttonGridItem}>
                        <Button size='s' view="secondary" onlyIcon={true} iconRight={IconDownload}/>
                    </GridItem>

                    <GridItem className={cl.buttonGridItem}>
                        <Button size='s' view="secondary" onlyIcon={true} iconRight={IconUpload}/>
                    </GridItem>

                    <GridItem className={cl.buttonGridItem}>
                        <Button size='s' view="secondary" onlyIcon={true} iconRight={IconRevert} disabled={buttonDisabled}/>
                    </GridItem>

                    <GridItem className={cl.buttonGridItem}>
                        <Button size='s' view="secondary" onlyIcon={true} iconRight={IconCopy} disabled={buttonDisabled}/>
                    </GridItem>

                    <GridItem className={cl.buttonGridItem}>
                        <Button size='s' view="secondary" onlyIcon={true} iconRight={IconTrash} disabled={buttonDisabled}/>
                    </GridItem>

                </Grid>

            </Layout>
        </Theme>
    );
};

export default FilterField;