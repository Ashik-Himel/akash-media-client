import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoHome, IoSearch } from "react-icons/io5";
import { FaBars, FaXmark } from "react-icons/fa6";
import useAllContext from '../../hooks/useAllContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';
import brandLogo from '../../assets/akash-media.png';
import ProfilePic from '../../assets/profile-pic.png';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import HeaderDrawer from './HeaderDrawer';
import { useQuery } from "@tanstack/react-query";

export default function StreamHeader() {
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const {user, setUser, userLoaded} = useAllContext();
  const [profileCardShow, setProfileCardShow] = useState(false);
  const [searchShow, setSearchShow] = useState(false);
  const [drawerShow, setDrawerShow] = useState(false);
  const [searchText, setSearchText] = useState('');
  const profileImgRef = useRef(null);
  const profileCardRef = useRef(null);
  const searchIconRef = useRef(null);
  const searchAreaRef = useRef(null);
  const drawerRef = useRef(null);
  const barRef = useRef(null);

  const {data: channels = [], isLoading, refetch} = useQuery({
    queryKey: ["channels", searchText],
    queryFn: async() => {
      const res = await axiosSecure(`/users-channel-search?search=${searchText}`);
      return res.data;
    },
    enabled: userLoaded && Boolean(searchText)
  })

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#263791",
      confirmButtonText: "Logout"
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth)
          .then(() => {
            axiosPublic('/logout', {withCredentials: true})
            .then(res => {
              if (res.data.message === "Ok") {
                Swal.fire({
                  title: "Successful",
                  text: "Logout Successful!",
                  icon: "success",
                  iconColor: "#263791",
                  confirmButtonColor: "#263791"
                })
                setUser(null);
              }
            })
          })
      }
    });
  }

  useEffect(() => {
    const handleDocumentClick = e => {
      if (barRef.current && !barRef.current?.contains(e.target) && drawerRef.current && !drawerRef.current?.contains(e.target)) {
        setDrawerShow(false);
      }
      if (profileImgRef.current && !profileImgRef.current?.contains(e.target) && profileCardRef.current && !profileCardRef.current?.contains(e.target)) {
        setProfileCardShow(false);
      }
      if (searchIconRef.current && !searchIconRef.current?.contains(e.target) && searchAreaRef.current && !searchAreaRef.current?.contains(e.target)) {
        setSearchText('');
        setSearchShow(false);
      }
    }
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    }
  }, []);

  return (
    <header className={`sticky top-0 bg-white dark:bg-gray-900 dark:text-white border-b border-gray-300 dark:border-gray-700 z-40`}>
      <div className="container">
        <nav className='flex justify-between items-center gap-5 py-4 relative'>
          <Link to='/stream'>
            <img src={brandLogo} alt="Brand Logo" className='w-[80px]' />
          </Link>

          <div className="flex justify-end items-center gap-5 flex-1">
            <Link to='/' className='text-2xl' title='Return Home'>
              <IoHome />
            </Link>

            <label htmlFor='search' className='text-2xl cursor-pointer select-none' onClick={() => setSearchShow(true)} ref={searchIconRef}>
              <IoSearch />
            </label>
            
            <div className="flex justify-center items-center gap-2 cursor-pointer select-none relative" onClick={() => setProfileCardShow(!profileCardShow)} ref={profileImgRef}>
              <img src={user?.photoURL || ProfilePic} alt="User's Photo" className="w-[35px] h-[35px] object-cover object-center rounded-full" />
              <span className={`w-5 h-5 bg-gray-300 dark:bg-gray-700 rotate-45 absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-50 ${profileCardShow ? 'block' : 'hidden'}`}></span>
            </div>

            <div className={`bg-white dark:bg-gray-700 border-primary dark:!border-gray-700 rounded absolute right-0 top-[15px] overflow-hidden transition-[width] duration-300 ${searchShow ? "w-full md:w-[400px] border-2" : "w-0 border-x-0"}`} ref={searchAreaRef}>
              <div className='w-full flex justify-center items-center'>
                <input type="search" name="search" id="search" placeholder='Search Channel' value={searchText} className='dark:bg-inherit w-full px-4 py-2 focus:outline-none' onChange={e => {
                  setSearchText(e.target.value);
                  refetch();
                }} />
                <div className='p-2 text-2xl cursor-pointer select-none' onClick={() => {
                  setSearchText('');
                  setSearchShow(false);
                }}>
                  <FaXmark />
                </div>
              </div>

              <div className={`w-full [&>*:first-child]:border-t-2 [&>*:first-child]:border-t-primary dark:[&>*:first-child]:border-t-gray-300 [&>*:last-child]:border-b-none ${searchShow ? 'block' : 'hidden'}`}>
                {
                  isLoading ? <div className='text-center border-b-2 border-gray-300 px-4 py-2'>
                    <span className="loading loading-spinner loading-md"></span>
                  </div> : searchText && channels?.length === 0 ? <div className='font-medium border-b-2 border-gray-300 px-4 py-2'>No channel matched!</div> : !searchText ? null : channels?.map(channel => <Link to={`/stream/${channel?._id}`} key={channel?._id} className='font-medium border-b-2 border-gray-300 block px-4 py-2' onClick={() => setSearchShow(false)}>{channel?.name}</Link>)
                }
              </div>
            </div>

            <div className='text-2xl cursor-pointer select-none' onClick={() => setDrawerShow(!drawerShow)} ref={barRef}>
              <FaBars />
            </div>

            {/* Profile Card */}
            <div className={`absolute top-[calc(100%-2px)] right-0 bg-gray-300 dark:bg-gray-700 dark:text-white p-6 rounded-lg w-full max-w-[350px] text-center z-10 [box-shadow:0px_5px_30px_rgba(0,0,0,0.3)] ${profileCardShow ? 'block' : 'hidden'}`} ref={profileCardRef}>
              <img src={user?.photoURL || ProfilePic} alt="User's Photo" className="w-[60px] h-[60px] object-cover object-center rounded-full block mx-auto mb-4" />
              <span className="block text-[18px] font-medium">{user?.name || "No Name"}</span>
              <span className="block mb-4">{user?.email || "No Email"}</span>
              <div className="flex justify-center items-center gap-2">
                <Link to='/stream/profile' className="btn btn-primary" onClick={() => setProfileCardShow(false)}>Profile</Link>
                <button type="button" className="btn btn-warning" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <HeaderDrawer drawerShow={drawerShow} setDrawerShow={setDrawerShow} drawerRef={drawerRef} />
    </header>
  );
}