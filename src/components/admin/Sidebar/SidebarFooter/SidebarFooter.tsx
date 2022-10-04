import React, {FC} from 'react';
import {Grid, GridItem} from "@consta/uikit/Grid";
import {Link} from "react-router-dom";
import {IconRestart} from "@consta/uikit/IconRestart";
import {IconInfo} from "@consta/uikit/IconInfo";
import classes from './SidebarFooter.module.css'
import {classWatcher} from "../../../../utils/styleClassesUtills";
import {Button} from "@consta/uikit/Button";
import {IconRevert} from "@consta/uikit/IconRevert";

interface ISidebarProps{
    flag: boolean
}

const SidebarFooter: FC<ISidebarProps> =({flag}) => {

    return (
        <Grid cols={1} className={classes.footerGrid} rowGap={'m'}>
            <GridItem row={1}>
                <Link to={'/update'} className={classes.item}>
                    <Button
                        size="s"
                        iconLeft={IconRestart}
                        label="Обновления"
                        onlyIcon={flag}
                    />
                </Link>
            </GridItem>

            <GridItem row={2}>
                <Link to={'/info'} className={classes.item}>
                    <Button size="s" iconLeft={IconInfo} label="О системе"/>
                </Link>
            </GridItem>
        </Grid>
    );
};

export default SidebarFooter;