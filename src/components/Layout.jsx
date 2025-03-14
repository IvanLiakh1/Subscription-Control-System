import React from 'react';
import Header from './Header/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Header />
            <div style={{ flex: 1, width: 900, alignItems: 'center', justifyContent: 'center' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
