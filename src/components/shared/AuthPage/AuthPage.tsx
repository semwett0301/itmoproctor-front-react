import React, {FC, useState} from 'react';
import classes from './AuthPage.module.css'
import {Card} from "@consta/uikit/Card";
import {TextField} from "@consta/uikit/TextField";
import notALogo from './NotALogo.png'
import {Button} from "@consta/uikit/Button";

const AuthPage:FC = () => {

    const [login, setLogin] = useState<string | null>(null);
    const loginChange = ({ value }: { value: string | null }) => setLogin(value);

    const [pass, setPass] = useState<string | null>(null);
    const passChange = ({ value }: { value: string | null }) => setPass(value);




    return (
        <div className={classes.wrapper}>
            <div>
                <Card
                    verticalSpace="2xl"
                    horizontalSpace="2xl"
                    className={classes.card}
                >
                    <img src={notALogo} alt="Лого зглушка" className={classes.notALogo}/>
                    <TextField
                        required
                        onChange={loginChange}
                        value={login}
                        type="text"
                        placeholder="Логин"
                        label="Логин"
                        labelPosition="top"
                        width={"full"}
                        className={classes.customInput}

                    />

                    <TextField
                        required
                        datatype={"password"}
                        onChange={passChange}
                        value={pass}
                        type="password"
                        placeholder="Пароль"
                        label="Пароль"
                        labelPosition="top"
                        width={"full"}
                        className={classes.customInput}
                    />

                    <Button label="Отправить" width="full" className={classes.send}/>
                </Card>
            </div>

        </div>
    );
};

export default AuthPage;