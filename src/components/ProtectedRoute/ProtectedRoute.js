import React from "react";
import { Route, Redirect } from "react-router-dom";

// const ProtectedRoute = ({ loggedIn, children, ...props }) => {
//   //console.log('loggedIn ProtectedRoute ', loggedIn);
//   return (
//     <Route {...props}>{loggedIn ? children : <Redirect to="/" />}</Route>
//   );
// };

// export default ProtectedRoute;

const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest}) => {
  return (
    <Route 
      path={path}
      {...rest}
      render={(props) => {
        return loggedIn ? (
          <Comp {...props} />
        ) : (
          <Redirect to = {{
            pathname:"/",
            state: {
              prevLocation: path,
              error: 'Необходимо авторизоваться',
            },
          }}
          />
        );
      }}
      />
  );
};
export default ProtectedRoute;