import { createContext } from "react";
import PropTypes from 'prop-types';

export const AllContext = createContext(null);

export default function ContextProvider({children}) {

  const value = {

  }
  return (
    <AllContext.Provider value={value}>
      {children}
    </AllContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node
}