import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import {Toaster} from "sonner";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App/>
        <Toaster/>
    </React.StrictMode>,
)
