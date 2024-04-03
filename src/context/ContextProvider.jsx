import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AllContext = createContext(null);

export default function ContextProvider({children}) {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [userLoaded, setUserLoaded] = useState(false);
  console.log(user)

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, user => {
      if (user?.email) {
        axiosPublic(`/user?email=${user.email}`, {withCredentials: true})
          .then(res => {
            let currentUser = user;
            currentUser.name = res.data.name,
            currentUser.phone = res.data.phone,
            currentUser.packages = res.data.packages;
            setUser(currentUser);
            setUserLoaded(true);
          })
      } else {
        setUserLoaded(true);
      }
    });
    return () => unSubscribe(); 
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