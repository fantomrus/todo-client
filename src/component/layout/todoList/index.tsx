import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchTodo, fetchTodoPriority, fetchTodoStatus, filterTodo,} from "../../../store/reducers/ActionCreator";
import moment from "moment"
import Filter from "./filter";
import {modalSlice} from "../../../store/reducers/ModalSlice";
import ContentWrapper from "../contentWrapper";
import style from "./todoList.module.scss";
import Preloader from "../preloader";

const TodoList = () => {
    const formatDate = 'DD.MM.YYYY HH:mm'
    const dispatch = useAppDispatch()
    const {todo, isLoading, error} = useAppSelector(state => state.todoReducer)
    const {user} = useAppSelector(state => state.authReducer)
    const {setIsOpenModal, setTodoId} = modalSlice.actions

    const editButton = (id: string) => {
        dispatch(setIsOpenModal(true))
        dispatch(setTodoId(id))
    }
    useEffect(() => {
        dispatch(fetchTodoPriority())
        dispatch(fetchTodoStatus())
        if (user.role === 'User') {
            dispatch(filterTodo({user: user.login, date: 'allDate'}))
        } else {
            dispatch(fetchTodo())
        }
    }, [])

    const colorTitle = (completed: string, status: string) => {
        const date = new Date()
        if(status === 'Выполнена') {
            return 'competed_green'
        }
        if(new Date(completed) < date) {
            return 'competed_red'
        }
    }

    return (
        <ContentWrapper>
            {isLoading && <Preloader/>}
            <div className={style.todolist}>
                <Filter/>
                <div>
                    {todo && todo.map((item) => (
                        <div key={item._id} className={style.todolist__item}>
                            <div className={style.todolist__item__title}>
                                <div>
                                    <h2 className={colorTitle(item.dateCompletion, item.status)}>{item.title}</h2>
                                    <p>{item.description}</p>
                                </div>
                                <div className={style.todolist__item__title__user}>
                                    <div>
                                        <span>Создатель </span>
                                        <h4>{item.userCreator}</h4>
                                    </div>
                                    <div>
                                        <span>Ответственный </span>
                                        <h4>{item.userResponsible}</h4>
                                    </div>
                                </div>
                            </div>
                            <div className={style.todolist__item__date}>
                                <div>
                                    <span>Дата окончания</span>
                                    <h4>{moment(item.dateCompletion).format(formatDate)}</h4>
                                </div>
                                <div>
                                    <span>Дата создания</span>
                                    <h4>{moment(item.createdAt).format(formatDate)}</h4>
                                </div>
                                <div>
                                    <span>Дата обновления</span>
                                    <h4>{moment(item.updatedAt).format(formatDate)}</h4>
                                </div>
                            </div>
                            <div className={style.todolist__item__status}>
                                <span>статус</span>
                                <h2>{item.status}</h2>
                                <button onClick={() => editButton(item._id)}>Редактировать</button>
                            </div>
                        </div>
                    ))}
                </div>
                {error && <h1>{error}</h1>}
            </div>
        </ContentWrapper>
    )
}
export default TodoList