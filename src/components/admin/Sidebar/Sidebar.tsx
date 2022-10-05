import React, {FC, useState} from 'react';
import {Card} from "@consta/uikit/Card";
import cl from './Sidebar.module.scss'
import NavCollapse from "./NavCollapse/NavCollapse";
import {Button} from "@consta/uikit/Button";
import {IconArrowRight} from "@consta/uikit/IconArrowRight";
import {classWatcher} from "../../../utils/styleClassesUtills";
import {useTheme} from "@consta/uikit/Theme";
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
                    iconLeft={IconArrowRight}
                    iconSize='xs'
                    form='round'
                    size='xs'
                    onClick={() => setExpandState(!expandSate)}
                />

                <NavCollapse isOpen={expandSate}/>
                <SidebarFooter flag={expandSate}/>
            </Card>

    );
};

export default Sidebar;
