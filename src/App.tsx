import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import LoginForm from "./component/page/loginForm";
import {checkAuth, logout} from "./store/reducers/ActionCreator";
import TodoList from "./component/layout/todoList";
import Header from "./component/layout/header";
import Modal from "./component/layout/modal";
import TodoForm from "./component/layout/todoForm";

const App = () => {
    const dispatch = useAppDispatch()
    const {isAuth, isLoading} = useAppSelector(state => state.authReducer)

    useEffect(() => {
        if(localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
    }, [])

    if (isLoading) {
        return <div>Загрузка...</div>
    }

    if (!isAuth) {
        return <LoginForm/>
    }

    return (
        <div>
            <Header/>
            <Modal>
                <TodoForm/>
            </Modal>
            <TodoList/>
        </div>
    );
};

export default App;