import React from 'react'
import {createRoot} from 'react-dom/client'
import App from "./App";
import './index.scss'
import {Provider} from "react-redux";
import {setupStore} from './store/store'
const rootElement = document.getElementById('root')
if(!rootElement) {
    throw new Error('Элемент root не найден')
}
const store = setupStore()
const root = createRoot(rootElement)
root.render(<Provider store={store}><App/></Provider>)