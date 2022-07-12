import React, {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {ITodoFields} from "../../../models/ITodo";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {fetchTodo, fetchUsers, filterTodo, newTodo, updateTodo} from "../../../store/reducers/ActionCreator";
import {modalSlice} from "../../../store/reducers/ModalSlice";
import moment from "moment";
import style from './todoForm.module.scss'

const TodoForm = () => {
    const dispatch = useAppDispatch()
    const {users} = useAppSelector(state => state.userReducer)
    const {register, handleSubmit, formState: {errors}} = useForm<ITodoFields>({
        mode: 'onChange'
    })

    useEffect(() => {
        if (user.role !== 'User') {
            dispatch(fetchUsers())
        }
    }, [])

    const formatDate = 'yyyy-MM-DDThh:mm'

    const {priority, status, todo} = useAppSelector(state => state.todoReducer)
    const {todoId} = useAppSelector(state => state.ModalReducer)
    const {user} = useAppSelector(state => state.authReducer)
    const {setIsOpenModal, setTodoId} = modalSlice.actions

    const newTodoList = todo.filter(item => item._id === todoId)
    const todoData = [...newTodoList][0]

    const isDisabled = () => {
        return !!(user.role === 'User' && todoId);
    }
    const onSubmit: SubmitHandler<ITodoFields> = (data) => {
        if (!todoId) {
            dispatch(newTodo(data))
        } else {
            dispatch(updateTodo({...data, id: todoId}))
        }
        if (user.role === 'User') {
            dispatch(filterTodo({user: user.login, date: 'allDate'}))
        } else {
            dispatch(fetchTodo())
        }
        dispatch(setIsOpenModal(false))
        dispatch(setTodoId(''))
    }

    const [selectedUserResponsible, setSelectedUserResponsible] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [selectedPriority, setSelectedPriority] = useState<string>('');
    const handleChangeUserResponsible = (event: any) => {
        setSelectedUserResponsible(event.target.value)
    }
    const handleChangeStatus = (event: any) => {
        setSelectedStatus(event.target.value)
    }
    const handleChangePriority = (event: any) => {
        setSelectedPriority(event.target.value)
    }

    return (
        <div className={style.todoForm}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Заголовок</label>
                    <input
                        {...register("title", {
                            required: 'поле обязательно к заполнению',
                            value: todoData?.title,
                            disabled: isDisabled()
                        })} type="text" placeholder="Введите название задачи"/>
                    {errors?.title && <div>{errors.title.message}</div>}
                </div>
                <div>
                    <label>Описание</label>
                    <textarea
                        {...register("description", {
                            required: 'поле обязательно к заполнению',
                            value: todoData?.description,
                            disabled: isDisabled()
                        })} placeholder="Введите текст задачи"
                    >
                    </textarea>
                    {errors?.description && <div>{errors.description.message}</div>}
                </div>
                <div>
                    <label>Дата окончания</label>
                    <input
                        {...register("dateCompletion", {
                            value: todoData ? moment(todoData.dateCompletion).format(formatDate) : '',
                            disabled: isDisabled()
                        })}
                        type="datetime-local"
                    />
                </div>
                <div>
                    <label>Приоритет</label>
                    <select {...register("priority", {disabled: isDisabled()})} onChange={handleChangePriority}
                            value={selectedPriority || todoData?.priority}>
                        {priority && priority.map((item) => (
                            <option key={item._id}>{item.value}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Ответственный</label>
                    <select {...register("userResponsible", {disabled: isDisabled()})}
                            onChange={handleChangeUserResponsible}
                            value={selectedUserResponsible || todoData?.userResponsible}>
                        {users.length > 0
                            ? users && users.map((item) => (
                            <option key={item._id}>{item.login}</option>))
                            : <option>{user.login}</option>
                        }
                    </select>
                </div>
                {!todoData ? null :
                    <div>
                        <label>Статус</label>
                        <select {...register("status")} onChange={handleChangeStatus}
                                value={selectedStatus || todoData?.status}>
                            {status && status.map((item) => (<option key={item._id}>{item.value}</option>))}
                        </select>
                    </div>
                }
                <button>{!todoData ? 'Отправить' : 'Сохранить'}</button>
            </form>
        </div>
    )
}
export default TodoForm