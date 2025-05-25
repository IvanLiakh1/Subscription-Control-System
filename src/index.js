import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import './styles/global.css';
import Authorization from './pages/Authorization';
import Registration from './pages/Registration';
import Subscriptions from './pages/Subsriptions/Subscriptions';
import Main from './pages/Main/Main';
import Header from './components/Header/Header';
import store from './services/store';
import { checkSession, selectAuthInitialized, selectIsAuthenticated } from './services/authSlice';
import CreateSubscriptionManual from './pages/Subsriptions/ManuallAdd/CreateSubscriptionManual';
import CreateSubscriptionAuto from './pages/Subsriptions/AutoAdd/AutoAdd.jsx';
import { PrismaneProvider } from '@prismane/core';
import Spendings from './pages/Spendings/Spendings';
import EditSubscription from './pages/Subsriptions/EditSubscription/EditSubscription.jsx';
import Settings from './pages/Settings/Settings.jsx';
import History from './pages/History/History.jsx';
import LoadingScreen from './components/LoadingScreen/LoadingScreen.jsx';
const InitApp = ({ children }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkSession());
    }, []);

    return children;
};

const LayoutWithHeader = () => (
    <>
        <Header />
        <Outlet />
    </>
);

const AuthWrapper = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const initialized = useSelector(selectAuthInitialized);
    const location = useLocation();

    if (!initialized) return <LoadingScreen />;

    return isAuthenticated ? children : <Navigate to="/login" replace state={{ from: location }} />;
};

const PublicWrapper = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const initialized = useSelector(selectAuthInitialized);
    const location = useLocation();

    if (!initialized) return <LoadingScreen />;

    return isAuthenticated ? <Navigate to="/" replace state={{ from: location }} /> : children;
};

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <InitApp>
                <AuthWrapper>
                    <LayoutWithHeader />
                </AuthWrapper>
            </InitApp>
        ),
        children: [
            {
                index: true,
                element: <Main />,
            },
            {
                path: 'subscriptions',
                element: <Subscriptions />,
            },
            {
                path: 'create-auto',
                element: <CreateSubscriptionAuto />,
            },
            {
                path: 'create-manual',
                element: <CreateSubscriptionManual />,
            },
            {
                path: 'spendings',
                element: <Spendings />,
            },
            {
                path: 'edit-subscription',
                element: <EditSubscription />,
            },
            {
                path: 'settings',
                element: <Settings />,
            },
            {
                path: 'history',
                element: <History />,
            },
        ],
    },
    {
        path: 'login',
        element: (
            <InitApp>
                <PublicWrapper>
                    <Authorization />
                </PublicWrapper>
            </InitApp>
        ),
    },
    {
        path: 'registration',
        element: (
            <InitApp>
                <PublicWrapper>
                    <Registration />
                </PublicWrapper>
            </InitApp>
        ),
    },
    {
        path: '*',
        element: <Navigate to="/" replace />,
    },
]);

ReactDOM.createRoot(document.querySelector('#root')).render(
    <PrismaneProvider>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </PrismaneProvider>,
);
