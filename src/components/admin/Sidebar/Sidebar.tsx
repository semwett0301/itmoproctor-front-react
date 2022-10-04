import React, {FC, useState} from 'react';
import {Card} from "@consta/uikit/Card";
import cl from './Sidebar.module.scss'
import NavCollapse from "../exams/components/NavCollapse/NavCollapse";
import {Button} from "@consta/uikit/Button";
import {IconArrowRight} from "@consta/uikit/IconArrowRight";

import {classWatcher} from "../../../utils/styleClassesUtills";
import {presetGpnDark, presetGpnDisplay, Theme, useTheme} from "@consta/uikit/Theme";
import {useThemeVars} from "@consta/uikit/useThemeVars";
import SidebarFooter from "./SidebarFooter/SidebarFooter";

const Sidebar: FC= () => {
    const [expandSate, setExpandState] = useState<boolean>(true)

    const { themeClassNames } = useTheme()
    return (
            <Card
                className={classWatcher(expandSate, cl.expand, cl.collapse, cl.sidebar, themeClassNames.color.invert)}
            >
                <Button
                    className={classWatcher(expandSate, cl.sideBtnActive, cl.sideBtnCollapse, cl.sideBtn)}
                    onlyIcon={true}
                    iconRight={IconArrowRight}
                    iconSize='s'
                    form='round'
                    size='xs'
                    onClick={() => setExpandState(!expandSate)}
                />

                <NavCollapse/>
                <SidebarFooter flag={expandSate}/>
            </Card>

    );
};

export default Sidebar;