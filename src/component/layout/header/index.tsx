import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {modalSlice} from "../../../store/reducers/ModalSlice";
import {logout} from "../../../store/reducers/ActionCreator";
import ContentWrapper from "../contentWrapper";
import style from "./header.module.scss"

const Header: FC = () => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.authReducer)

    const {setIsOpenModal} = modalSlice.actions

    const openModal = () => {
        dispatch(setIsOpenModal(true))
    }
    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <div className={style.header}>
            <ContentWrapper>
                <div className={style.header__logo}>
                    <button onClick={openModal}>Добавить новую задачу</button>
                </div>
                <div className={style.header__logout}>
                    <span>{`Пользователь авторизован под логином: ${user.login}`}</span>
                    <button onClick={handleLogout}>выйти</button>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default Header;