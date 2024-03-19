import { Navigate, useLocation } from "react-router-dom";
import useAllContext from "../hooks/useAllContext";
import PropTypes from 'prop-types';

export default function PrivateRoute({children}) {
  const {user, userLoaded} = useAllContext();
  const {pathname} = useLocation();

  if (!userLoaded) {
    return (
      <div className="mt-10 text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
  
  if (!user) {
    return (
      <Navigate to='/login' state={{prevPath: pathname}} />
    )
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node
}