import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './styles/global.css';
import App from './App';
import Authorization from './pages/Authorization';
import Registration from './pages/Registration';
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/login',
        element: <Authorization />,
    },
    {
        path: '/registration',
        element: <Registration />,
    },
    {
        path: '*',
        element: <Navigate to="/" replace />,
    },
]);
ReactDOM.createRoot(document.querySelector('#root')).render(<RouterProvider router={router} />);
