import { Card } from '@consta/uikit/Card';
import React, {useState} from 'react';
import {Collapse} from "@consta/uikit/Collapse";
import {NavLink, useNavigate} from "react-router-dom";
import {collapseItems, ICollapseItem} from "./NavCollapseModel";
import cl from './NavCollapse.module.scss'
import {Button} from "@consta/uikit/Button";

const NavCollapse = () => {

    const [isOpen, setOpen] = useState<boolean>(false);

    const nav = useNavigate()

    const navMaker = (item: ICollapseItem, key:string) => {
        if(!item.children){
            return <Button
                        size='m'
                        view='clear'
                        onClick={()=>nav(item.link)}
                        iconLeft={item.icon}
                        key={key}
                        label={item.title}
                    />
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
        <div className={cl.collapse}>
            {collapseItems.map(item => navMaker(item, item.title))}
        </div>
    );
};

export default NavCollapse;