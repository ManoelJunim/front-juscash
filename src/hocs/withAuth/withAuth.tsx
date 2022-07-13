import React, { useContext } from 'react';

import { Navigate } from 'react-router-dom';
import { SessionContext } from '../../context';

const withAuth = (WrappedComponent: React.ElementType) => {
  const WithAuth = ({ ...props }) => {
    const { auth } = useContext(SessionContext);

    if (!auth) return <Navigate to="/signin" />;
    else return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export { withAuth };
