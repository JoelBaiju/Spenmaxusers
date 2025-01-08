import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const userType = useSelector(state => state.auth.user);

    return (
        <Route
            {...rest}
            element={isAuthenticated && userType.type === 'user' ? <Component /> : <Navigate to="/login" />}
        />
    );
};

export default ProtectedRoute;
