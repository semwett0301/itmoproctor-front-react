import React, {FC, useEffect, useState} from 'react';
import cl from './exams.module.scss'
import {Layout} from "@consta/uikit/Layout";
import {Card} from "@consta/uikit/Card";
import logo from "../../../mockData/logos/Group_12df.svg";
import userLogo from "../../../mockData/logos/UserLogo.png"
import {Header, HeaderLogin, HeaderLogo, HeaderModule} from "@consta/uikit/Header";
import {Tabs} from "@consta/uikit/Tabs";
import {Pagination} from "@consta/uikit/Pagination";
import ExamTable from "./components/ExamTable/ExamTable";
import FilterField from "./components/FilterField/FilterField";
import Sidebar from "../Sidebar/Sidebar";
import TabWithCross from "./components/TabWithCross/TabWithCross";


export interface TabItem {
    id: number,
    title: string
};


const Exams: FC = () => {
    const [tabItems, setItems] = useState<TabItem[] | []>([{id: 100, title:'Один'}]);
    const [value, setValue] = useState<TabItem | null>(null);

    const closeTab = (tabItem:TabItem) => {
        setItems(tabItems.filter(item => item.id !== tabItem.id))
    }

    const openTab = (item: TabItem) => {
        setItems(prevState => {
            if(!(prevState.find((i)=>i.id===item.id))) {
                return [...prevState, item]
            }
            return [...prevState]
        })
    }

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
                <Layout flex={1} className={cl.standardLayout}>
                    <Sidebar/>
                </Layout>

                <Layout flex={30} className={cl.standardLayout} direction={"column"}>
                    <Card
                        className={cl.contentCard}
                    >
                        <Card verticalSpace={"s"} horizontalSpace={"s"} shadow={false}>
                            <Tabs
                                value={value}
                                onChange={({value}) => setValue(value)}
                                items={tabItems}
                                getItemLabel={(item) => item.title}
                                renderItem={({item, onChange, checked}) => (
                                    <TabWithCross
                                        item={item}
                                        onChange={onChange}
                                        checked={checked}
                                        onCrossClick={closeTab}
                                    />
                                )}
                            />
                        </Card>

                        <FilterField/>

                        <Layout className={cl.fillLayout}>
                            <div className={cl.card}>
                                <ExamTable
                                    onVideoBtnClick={openTab}
                                />
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

