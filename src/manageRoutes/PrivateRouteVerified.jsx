import { Navigate, useLocation } from "react-router-dom";
import useAllContext from "../hooks/useAllContext";
import PropTypes from 'prop-types';

export default function PrivateRouteVerified({children}) {
  const {user} = useAllContext();
  const {pathname} = useLocation();

  if (!user?.emailVerified) {
    return (
      <Navigate to='/stream/verify-user' state={{prevPath: pathname}} />
    )
  }

  return children;
}

PrivateRouteVerified.propTypes = {
  children: PropTypes.node
}