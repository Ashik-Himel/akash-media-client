import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { getTheme } from "../lib/theme";

export const AllContext = createContext(null);

export default function ContextProvider({children}) {
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [themeValue, setThemeValue] = useState('system');
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    setThemeValue(getTheme());
    const unSubscribe = onAuthStateChanged(auth, user => {
      if (user?.email) {
        axiosPublic(`/user?uid=${user?.uid}`, {withCredentials: true})
          .then(res => {
            let currentUser = user;
            currentUser.name = res.data.name,
            currentUser.number = res.data.phone,
            setUser(currentUser);
            setUserLoaded(true);
          })
      } else {
        setUserLoaded(true);
      }
    });
    return () => unSubscribe(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    user,
    setUser,
    userLoaded,
    setUserLoaded,
    themeValue,
    setThemeValue
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