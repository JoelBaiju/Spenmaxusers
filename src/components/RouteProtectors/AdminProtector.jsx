import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminProtector = ({ element: Component, ...rest }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const AdminType = useSelector(state => state.auth.user);

    return (
        <Route
            {...rest}
            element={isAuthenticated && AdminType.type === 'admin' ? <Component /> : <Navigate to="/login" />}
        />
    );
};

export default AdminProtector;
