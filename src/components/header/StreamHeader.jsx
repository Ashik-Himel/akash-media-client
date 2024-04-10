import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {IoIosSearch} from 'react-icons/io';
import useAllContext from '../../hooks/useAllContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';
import brandLogo from '../../assets/akash-media.png';
import ProfilePic from '../../assets/profile-pic.png';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';

export default function StreamHeader() {
  const axiosPublic = useAxiosPublic();
  const {user, setUser} = useAllContext();
  const [profileCardShow, setProfileCardShow] = useState(false);
  const profileImgRef = useRef(null);
  const profileCardRef = useRef(null);

  const handleLogout = () => {
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

  useEffect(() => {
    const handleDocumentClick = e => {
      if (profileImgRef.current && !profileImgRef.current?.contains(e.target)) {
        if (profileCardRef.current && !profileCardRef.current?.contains(e.target)) {
          setProfileCardShow(false);
        }
      }
    }
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    }
  }, []);

  return (
    <header className={`sticky top-0 bg-white border-b border-gray-300 z-40`}>
      <div className="container">
        <nav className='flex justify-between items-center gap-5 py-4 relative'>
          <Link to='/stream'>
            <img src={brandLogo} alt="Brand Logo" className='w-[80px]' />
          </Link>

          <div className="flex justify-end items-center gap-5 flex-1">
            <div className='relative flex-1 lg:max-w-[350px]'>
              <input className='pl-4 pr-10 py-1.5 w-full border border-gray-300 bg-gray-100 rounded-full' type="search" name="search" id="search" placeholder='Search channel' />
              <IoIosSearch className='text-xl absolute top-1/2 right-4 -translate-y-1/2' />
            </div>
            
            <div className="flex justify-center items-center gap-2 cursor-pointer select-none relative" onClick={() => setProfileCardShow(!profileCardShow)} ref={profileImgRef}>
              <img src={user?.photoURL || ProfilePic} alt="User's Photo" className="w-[40px] h-[40px] object-cover object-center rounded-full" />
              <span className={`w-6 h-6 bg-gray-300 rotate-45 absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 ${profileCardShow ? 'block' : 'hidden'}`}></span>
            </div>

            {/* Profile Card */}
            <div className={`absolute top-[calc(100%+7px)] right-0 bg-gray-300 p-6 rounded-lg w-full max-w-[350px] text-center z-10 ${profileCardShow ? 'block' : 'hidden'}`} ref={profileCardRef}>
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
    </header>
  );
}