import axios from "axios";
import useAllContext from "./useAllContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import useAxiosPublic from "./useAxiosPublic";
import { useNavigate } from "react-router-dom";

const useAxiosSecure = () => {
  const {user} = useAllContext();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    // baseURL: 'https://server.akashmedia.net',
    // baseURL: 'https://akash-media-server.vercel.app',
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    headers: {
      Authorization: user?.email
    }
  })
  
  axiosSecure.interceptors.response.use(function (res) {
    if (res.data?.message === "Token Missing") {
      signOut(auth)
        .then(() => {
          navigate('/login');
        });
    } else if (res.data?.message === "Unauthorize Access") {
      signOut(auth)
        .then(() => {
          axiosPublic('/logout', {withCredentials: true});
          navigate('/login');
        })
    } else {
      return res;
    }
  }, function (error) {
    return Promise.reject(error);
  });

  return axiosSecure;
};

export default useAxiosSecure;