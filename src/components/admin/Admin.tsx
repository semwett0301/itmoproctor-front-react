import React, {useState} from 'react';
import {Layout} from "@consta/uikit/Layout";
import cl from "./Admin.module.scss";
import {Header, HeaderLogin, HeaderLogo, HeaderModule} from "@consta/uikit/Header";
import logo from "../../mockData/logos/Group_12df.svg";
import userLogo from "../../mockData/logos/UserLogo.png";
import Sidebar from "./Sidebar/Sidebar";
import {NavigateFunction, Outlet, useNavigate} from "react-router-dom";
import {Card} from "@consta/uikit/Card";
import {Tabs} from "@consta/uikit/Tabs";
import TabWithCross from "./exams/components/TabWithCross/TabWithCross";
import {TabItem} from "./exams/Exams";
import {Button} from "@consta/uikit/Button";
import {useRequest} from "../../hooks/requestHooks";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {IRequest} from "../../api/axios/request";
import {AppDispatch} from "../../store";
import {dropUserActionCreator} from "../../store/reducers/userReducer/userActionCreators";
import {useLogout} from "../../hooks/authHooks";

const Admin = () => {
    const [tabItems, setItems] = useState<TabItem[] | []>([{id: 100, title: 'Один'}]);
    const [value, setValue] = useState<TabItem | null>(null);
    const [isLogged, setIsLogged] = useState<boolean>(true)

    const closeTab = (tabItem: TabItem) => {
        setItems(tabItems.filter(item => item.id !== tabItem.id))
    }

    const openTab = (item: TabItem) => {
        setItems(prevState => {
            if (!(prevState.find((i) => i.id === item.id))) {
                return [...prevState, item]
            }
            return [...prevState]
        })
    }

    const request: IRequest = useRequest();
    const userId: string = useAppSelector(state => state.user._id)
    const dispatch: AppDispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const clickHandler = useLogout();

    return (
        <Layout className={cl.wrapper} direction={"column"}>
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
                            <HeaderModule indent='m'>
                                <Button label='Выход' onClick={clickHandler} view={'secondary'}/>
                            </HeaderModule>
                            <HeaderModule>
                                <HeaderLogin
                                    isLogged={isLogged}
                                    personName="Наруто Удзумаки"
                                    personInfo="Хокаге"
                                    personStatus="available"
                                    personAvatarUrl={userLogo}
                                />
                            </HeaderModule>
                        </>
                    }
                />

            <Layout className={cl.contentWrapper} direction="row">
                <Layout className={cl.standardLayout}>
                    <Sidebar/>
                </Layout>

                <Layout flex={1} className={cl.standardLayout} direction={"column"}>
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

                        <Outlet context={{openTab}}/>

                    </Card>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Admin;
