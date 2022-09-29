import React, {FC, useEffect, useState} from 'react';
import cl from './exams.module.scss'
import {Layout} from "@consta/uikit/Layout";
import {Card} from "@consta/uikit/Card";
import logo from "../../../mockData/logos/Group_12df.svg";
import userLogo from "../../../mockData/logos/UserLogo.png"
import {Header, HeaderLogin, HeaderLogo, HeaderModule} from "@consta/uikit/Header";
import {presetGpnDisplay, Theme} from "@consta/uikit/Theme";
import {Tabs} from "@consta/uikit/Tabs";
import {Pagination} from "@consta/uikit/Pagination";
import NavCollapse from "./components/NavCollapse/NavCollapse";
import ExamTable from "./components/ExamTable/ExamTable";
import FilterField from "./components/FilterField/FilterField";

type Item = string;

const items: Item[] = ['Один', 'Два', 'Три'];

const Exams: FC = () => {


    const [value, setValue] = useState<Item | null>(items[0]);

    return (
            <Layout className={cl.wrapper} direction={"column"}>
                <Layout>
                    <Header
                        leftSide={
                            <>
                                <HeaderModule>
                                    <HeaderLogo>
                                        <img src={logo} alt="LOGO"/>
                                    </HeaderLogo>
                                </HeaderModule>
                            </>
                        }
                        rightSide={
                            <>
                                <HeaderModule>
                                    <HeaderLogin
                                        isLogged={true}
                                        personName="Наруто Удзумаки"
                                        personInfo="Хокаге"
                                        personStatus="available"
                                        personAvatarUrl={userLogo}
                                    />
                                </HeaderModule>
                            </>
                        }
                    />
                </Layout>

                <Layout className={cl.contentWrapper} direction="row">
                    <Theme preset={presetGpnDisplay} className={cl.standardLayout}>
                    <Layout flex={1}>
                            <Card
                                verticalSpace={'xl'}
                                horizontalSpace={'xl'}
                                className={cl.navbar}
                            >
                                <NavCollapse/>
                            </Card>
                    </Layout>
                    </Theme>


                    <Layout flex={10} className={cl.standardLayout} direction={"column"}>
                        <Card
                            className={cl.contentCard}
                        >
                            <Card verticalSpace={"s"} horizontalSpace={"s"} shadow={false}>
                                <Tabs
                                    value={value}
                                    onChange={({ value }) => setValue(value)}
                                    items={items}
                                    getItemLabel={(item) => item}
                                />
                            </Card>

                            <FilterField/>

                            <Layout className={cl.fillLayout}>
                                <div className={cl.card}>
                                    <ExamTable/>
                                </div>
                            </Layout>

                            <Pagination
                                currentPage={1}
                                totalPages={2}
                                onChange={(item) => console.log(item)}
                                className={cl.minLayout}
                            />
                        </Card>
                    </Layout>
                </Layout>
            </Layout>
    );
};

export default Exams;

