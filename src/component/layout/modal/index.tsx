import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {modalSlice} from "../../../store/reducers/ModalSlice";
import style from './modal.module.scss'

type ModalProps = {
    children: React.ReactNode
}
const Modal: React.FC<ModalProps> = ({children}) => {
    const dispatch = useAppDispatch()
    const {setIsOpenModal, setTodoId} = modalSlice.actions
    const {isOpen} = useAppSelector(state => state.ModalReducer)
    if(!isOpen) {
        return null
    }
    const close = () => {
        dispatch(setIsOpenModal(false))
        dispatch(setTodoId(''))
    }
    return (
        <div className={style.modal}>
            <div className={style.modal__content}>
                <button className={style.modal__content__close} onClick={close}>x</button>
                {children}
            </div>
        </div>
    )
}

export default Modal;