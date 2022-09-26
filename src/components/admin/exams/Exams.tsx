import React, {FC} from 'react';
import cl from './exams.module.scss'
import {Layout} from "@consta/uikit/LayoutCanary";
import {Card} from "@consta/uikit/Card";
import {Header} from "@consta/header/Header";
import logo from "./Group_12df.svg";
import userLogo from "./UserLogo.png"

const Exams: FC = () => {
    return (
            <Layout className={cl.wrapper} direction={"column"}>
                <Layout>
                    <Header
                        className={cl.header}
                        logo={
                            <img src={logo} alt="LOGO"/>
                        }
                        userLogined={true}
                        userAvatar={userLogo}
                        userName="Наруто Удзумаки"
                        userInfo="Хокаге"
                    />
                </Layout>
                <Layout className={cl.contentWrapper}>
                    <Layout className={cl.card}>
                        <Layout flex={1} className={cl.standardLayout}>
                            <Card
                                className={cl.card}
                                verticalSpace={'2xl'}
                                horizontalSpace={'2xl'}
                            >
                                Ntrcn
                            </Card>
                        </Layout>
                        <Layout flex={5} className={cl.standardLayout}>
                            <Card
                                className={cl.card}
                                verticalSpace={'2xl'}
                                horizontalSpace={'2xl'}
                            >
                                Ntrcn
                            </Card>
                        </Layout>
                    </Layout>
                </Layout>
            </Layout>
    );
};

export default Exams;