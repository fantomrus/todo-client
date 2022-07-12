import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchUsersTodo, filterTodo} from "../../../store/reducers/ActionCreator";
import style from './todoList.module.scss'

const Filter = () => {
    const {user} = useAppSelector(state => state.authReducer)
    const {usersTodo} = useAppSelector(state => state.userReducer)
    const {todo} = useAppSelector(state => state.todoReducer)
    const [selectedUsers, setSelectedUsers] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>('');

    const dispatch = useAppDispatch()

    const handleChangeUsers = (event: any) => {
        setSelectedUsers(event.target.value)
    }
    const handleChangeDate = (event: any) => {
        setSelectedDate(event.target.value)
    }
    const onFilter = () => {
        if (!selectedUsers && !selectedDate) {
            return
        }
        if (user.role === 'User') {
            return dispatch(filterTodo({user: user.login, date: selectedDate}))
        }
        dispatch(filterTodo({user: selectedUsers, date: selectedDate}))
    }
    useEffect(() => {
        dispatch(fetchUsersTodo())
    }, [todo])
    return (
        <div className={style.filter}>
            <h2>Фильтр задач</h2>
            {user.role === 'User'
                ? null
                :
                <select value={selectedUsers} onChange={handleChangeUsers}>
                    <option hidden>Выберите пользователя</option>
                    <option value={"allUsers"}>Все пользователи</option>
                    {usersTodo.map(item => (<option key={item} value={item}>{item}</option>))}
                </select>
            }
            <select value={selectedDate} onChange={handleChangeDate}>
                <option hidden>Выберите дату</option>
                <option value="allDate">все время</option>
                <option value="today">на сегодня</option>
                <option value="week">на неделю</option>
                <option value="future">на будующее</option>
            </select>
            <button onClick={onFilter}>Фильтр</button>
        </div>
    );
};

export default Filter;