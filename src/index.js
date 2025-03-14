import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import './styles/global.css';
import Authorization from './pages/Authorization';
import Registration from './pages/Registration';
import Subscriptions from './pages/Subscriptions';
import Header from './components/Header/Header';
import store from './services/store';
import { checkSession } from './services/authSlice';

const InitApp = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkSession());
    }, [dispatch]);

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <InitApp />,
        children: [
            {
                path: 'subscriptions',
                element: <Subscriptions />,
            },
            {
                path: 'login',
                element: <Authorization />,
            },
            {
                path: 'registration',
                element: <Registration />,
            },
            {
                path: '*',
                element: <Navigate to="/" replace />,
            },
        ],
    },
]);
// eslint-disable-next-line no-undef
ReactDOM.createRoot(document.querySelector('#root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>,
);
