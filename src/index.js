import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './styles/global.css';
import Authorization from './pages/Authorization';
import Registration from './pages/Registration';
import Subscriptions from './pages/Subscriptions';
import Layout from './components/Layout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/subscriptions',
                element: <Subscriptions />,
            },
        ],
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
