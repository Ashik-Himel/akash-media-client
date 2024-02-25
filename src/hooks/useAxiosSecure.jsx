import axios from "axios";
import useAllContext from "./useAllContext";

const useAxiosSecure = () => {
  const {user} = useAllContext;

  const axiosSecure = axios.create({
    // baseURL: 'https://akash-media-server.vercel.app',
    baseURL: 'http://localhost:5001',
    withCredentials: true,
    headers: {
      Authorization: user?.email
    }
  })

  return axiosSecure;
};

export default useAxiosSecure;