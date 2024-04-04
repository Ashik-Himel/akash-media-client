import { useNavigate, useLocation } from "react-router-dom";
import useAllContext from "../hooks/useAllContext";
import PropTypes from 'prop-types';

export default function PrivateRouteAlt({children}) {
  const {user, userLoaded} = useAllContext();
  const {state} = useLocation();
  const navigate = useNavigate();

  if (!userLoaded) return (
    <div className="mt-10 text-center">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (user) {
    return setTimeout(() => {
      navigate(state?.prevPath ? state?.prevPath : '/stream');
    }, 300);
  }

  return children;
}

PrivateRouteAlt.propTypes = {
  children: PropTypes.node
}