import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated, selectAuthLoading } from '../services/authSlice';

const RedirectIfAuth = ({ children }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const loading = useSelector(selectAuthLoading);
    if (loading) {
        return null;
    }
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};
RedirectIfAuth.propTypes = {
    children: PropTypes.node.isRequired,
};

export default RedirectIfAuth;
