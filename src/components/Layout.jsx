import React from 'react';
import Sidebar from './Sidebar.jsx';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ flex: 1, padding: '20px' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
