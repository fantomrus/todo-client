import React, {FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {authLogin} from "../../../store/reducers/ActionCreator";
import style from "./loginForm.module.scss"

const LoginForm: FC = () => {
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const dispatch = useAppDispatch()
    const {error} = useAppSelector(state => state.authReducer)
    const handleSubmit = () => {
        dispatch(authLogin({login, password}))
    }
    return (
        <div className={style.loginForm}>
            <h1>Добро пожаловать</h1>
            <p>Для продолжения работы необходима авторизация</p>
            <input
                onChange={event => setLogin(event.target.value)}
                value={login}
                type={"text"}
                required={true}
                placeholder={"Введите логин"}
            />
            <input
                onChange={event => setPassword(event.target.value)}
                value={password}
                type={"text"}
                required={true}
                placeholder={"Введите Пароль"}
            />
            <div className={style.loginForm__error}>
                {error && <span>{error}</span>}
            </div>
            <button onClick={handleSubmit}>Логин</button>
        </div>
    );
};

export default LoginForm;