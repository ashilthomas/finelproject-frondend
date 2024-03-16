import React from 'react'

function protectedRoutes({isAuthenticated,children}) {
    if (!isAuthenticated) {
        return <Navigate to={"/login"} />;
      }
      return children;
}

export default protectedRoutes