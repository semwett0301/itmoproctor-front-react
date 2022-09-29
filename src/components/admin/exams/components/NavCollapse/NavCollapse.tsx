import { Card } from '@consta/uikit/Card';
import React, {useState} from 'react';
import {Collapse} from "@consta/uikit/Collapse";
import {NavLink} from "react-router-dom";
import {collapseItems, ICollapseItem} from "./NavCollapseModel";
import cl from './NavCollapse.module.scss'

const NavCollapse = () => {

    const [isOpen, setOpen] = useState<boolean>(false);

    const navMaker = (item: ICollapseItem, key:string) => {
        if(!item.children){
            return <Card
                verticalSpace="m"
                horizontalSpace="xs"
                form="square"
                shadow={false}
                key={key}
                // className={cl.collapseContent}
            >
                <NavLink
                    to={item.link}
                    className={cl.linkContent}
                >
                    <div className={cl.linkIcon}>
                        <item.icon/>
                    </div>
                    {item.title}
                </NavLink>
            </Card>
        }

        if(item.children){
            return <Card
                key={key}
                verticalSpace="m"
                horizontalSpace="xs"
                form="square"
                shadow={false}
                className={cl.collapseContent}
            >
                <div className={cl.collapseIcon}>
                    <item.icon/>
                </div>

                <Collapse
                    label={item.title}
                    isOpen={isOpen}
                    onClick={() => setOpen(!isOpen)}
                    iconPosition={"right"}
                >
                    {item.children.map(item =>
                        <Card
                            key={item.title}
                            verticalSpace="m"
                            horizontalSpace="m"
                            form="square"
                            shadow={false}
                        >

                            <NavLink
                                to={item.link}
                                className={cl.linkContent}
                            >
                                <item.icon/>
                                {item.title}
                            </NavLink>
                        </Card>)}
                </Collapse>
            </Card>
        }
    }

    return (
        <div>
            {collapseItems.map(item => navMaker(item, item.title))}
        </div>
    );
};

export default NavCollapse;