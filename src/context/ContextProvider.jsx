import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AllContext = createContext(null);

export default function ContextProvider({children}) {
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, user => {
      if (user?.email) {
        setUser(user);
        axiosPublic(`/user?email=${user?.email}`, {withCredentials: true})
          .then(res => {
            let currentUser = user;
            currentUser.name = res.data.name,
            currentUser.phone = res.data.phone,
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
    userLoaded
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