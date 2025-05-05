import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import './styles/global.css';
import Authorization from './pages/Authorization';
import Registration from './pages/Registration';
import Subscriptions from './pages/Subsriptions/Subscriptions';
import Main from './pages/Main/Main';
import Header from './components/Header/Header';
import store from './services/store';
import { checkSession } from './services/authSlice';
import CreateSubscriptionManual from './pages/Subsriptions/ManuallAdd/CreateSubscriptionManual';
import CreateSubscriptionAuto from './pages/Subsriptions/CreateSubscriptionAuto';
import { PrismaneProvider } from '@prismane/core';
import Spendings from './pages/Spendings/Spendings';
const InitApp = ({ children }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkSession());
    }, [dispatch]);

    return children;
};

const LayoutWithHeader = () => (
    <>
        <Header />
        <Outlet />
    </>
);

const RedirectIfAuth = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const loading = useSelector((state) => state.auth.loading);

    if (loading) return <div>Завантаження...</div>;
    return isAuthenticated ? <Navigate to="/" replace /> : children;
};

const PrivateRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const loading = useSelector((state) => state.auth.loading);

    if (loading) return <div>Завантаження...</div>;
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <InitApp>
                <LayoutWithHeader />
            </InitApp>
        ),
        children: [
            {
                path: '/',
                element: <Main />,
            },
            {
                path: 'subscriptions',
                element: (
                    <PrivateRoute>
                        <Subscriptions />
                    </PrivateRoute>
                ),
            },
            {
                path: 'create-auto',
                element: (
                    <PrivateRoute>
                        <CreateSubscriptionAuto />
                    </PrivateRoute>
                ),
            },
            {
                path: 'create-manual',
                element: (
                    <PrivateRoute>
                        <CreateSubscriptionManual />
                    </PrivateRoute>
                ),
            },
            {
                path: 'spendings',
                element: (
                    <PrivateRoute>
                        <Spendings />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: 'login',
        element: (
            <InitApp>
                <RedirectIfAuth>
                    <Authorization />
                </RedirectIfAuth>
            </InitApp>
        ),
    },
    {
        path: 'registration',
        element: (
            <InitApp>
                <RedirectIfAuth>
                    <Registration />
                </RedirectIfAuth>
            </InitApp>
        ),
    },
    {
        path: '*',
        element: <Navigate to="/" replace />,
    },
]);

// eslint-disable-next-line no-undef
ReactDOM.createRoot(document.querySelector('#root')).render(
    <PrismaneProvider>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </PrismaneProvider>,
);
