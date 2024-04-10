import { Link, NavLink } from 'react-router-dom';
import {FaBars} from 'react-icons/fa6';
import brandLogo from '../../assets/akash-media.png';
import HeaderDrawer from './HeaderDrawer';
import { useEffect, useRef, useState } from 'react';
import useAllContext from '../../hooks/useAllContext';
import ProfilePic from '../../assets/profile-pic.png';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

export default function Header() {
  const {user, setUser, userLoaded} = useAllContext();
  const [drawerShow, setDrawerShow] = useState(false);
  const [headerShadow, setHeaderShadow] = useState(false);
  const [profileCardShow, setProfileCardShow] = useState(false);
  const drawerRef = useRef(null);
  const barRef = useRef(null);
  const profileImgRef = useRef(null);
  const profileImgRef2 = useRef(null);
  const profileCardRef = useRef(null);
  const axiosPublic = useAxiosPublic();

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
    const handleScroll = () => {
      if (window.scrollY >= 20) {
        setHeaderShadow(true);
      } else {
        setHeaderShadow(false);
      }
    }
    window.addEventListener("scroll", handleScroll);

    const handleDocumentClick = e => {
      if (barRef.current && !barRef.current?.contains(e.target) && drawerRef.current && !drawerRef.current?.contains(e.target)) {
        setDrawerShow(false);
      }
      if (profileImgRef.current && !profileImgRef.current?.contains(e.target) && profileImgRef2.current && !profileImgRef2.current?.contains(e.target) && profileCardRef.current && !profileCardRef.current?.contains(e.target)) {
        setProfileCardShow(false);
      }
    }
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <header className={`sticky top-0 bg-white z-40 transition-shadow duration-300 ${headerShadow ? '[box-shadow:0px_10px_50px_rgba(0,0,0,0.2)]' : ''}`}>
      <div className="container">
        <nav className='flex justify-between items-center gap-4 py-4 relative'>
          <Link to='/'>
            <img src={brandLogo} alt="Brand Logo" className='w-[80px]' />
          </Link>

          <ul className='font-medium uppercase gap-6 hidden lg:flex justify-center items-center'>
            <li>
              <NavLink to='/' className={({isActive}) => isActive ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'}>Home</NavLink>
            </li>
            <li>
              <NavLink to='/channels' className={({isActive}) => isActive ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'}>Channels</NavLink>
            </li>
            <li>
              <NavLink to='/recharge' className={({isActive}) => isActive ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'}>Recharge</NavLink>
            </li>
            <li>
              <NavLink to='/packages' className={({isActive}) => isActive ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'}>Packages</NavLink>
            </li>
            <li>
              <NavLink to='/get-connection' className={({isActive}) => isActive ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'}>Get a connection</NavLink>
            </li>
            {
              userLoaded ? user ? <li>
                <Link to='/stream' className='btn btn-primary'>Stream</Link>
              </li> : <li>
                <Link to='/login' className='btn btn-primary'>Login</Link>
              </li> : <li className='btn btn-primary'>
                <span className="loading loading-spinner loading-md"></span>
              </li>
            }
            {
              user && <div className="flex justify-center items-center gap-2 cursor-pointer select-none relative" onClick={() => setProfileCardShow(!profileCardShow)} ref={profileImgRef}>
                <img src={user?.photoURL || ProfilePic} alt="User's Photo" className="w-[35px] h-[35px] object-cover object-center rounded-full" />
                <span className={`w-5 h-5 bg-gray-300 rotate-45 absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-50 ${profileCardShow ? 'block' : 'hidden'}`}></span>
              </div>
            }
          </ul>

          <div className='flex justify-center items-center gap-4 lg:hidden'>
            <div>
              {
                userLoaded ? user ? <Link to='/stream' className='btn btn-primary'>Stream</Link> : <Link to='/login' className='btn btn-primary'>Login</Link> : <div className='btn btn-primary'>
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              }
            </div>
            {
              user && <div className="flex justify-center items-center gap-2 cursor-pointer select-none relative" onClick={() => setProfileCardShow(!profileCardShow)} ref={profileImgRef2}>
                <img src={user?.photoURL || ProfilePic} alt="User's Photo" className="w-[35px] h-[35px] object-cover object-center rounded-full" />
                <span className={`w-5 h-5 bg-gray-300 rotate-45 absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-50 ${profileCardShow ? 'block' : 'hidden'}`}></span>
              </div>
            }
            <div className='text-2xl cursor-pointer select-none' onClick={() => setDrawerShow(!drawerShow)} ref={barRef}>
              <FaBars />
            </div>
          </div>

          {/* Profile Card */}
          {
            user && <div className={`absolute top-[calc(100%-2px)] right-0 bg-gray-300 p-6 rounded-lg w-full max-w-[350px] text-center z-10 [box-shadow:0px_5px_30px_rgba(0,0,0,0.3)] ${profileCardShow ? 'block' : 'hidden'}`} ref={profileCardRef}>
              <img src={user?.photoURL || ProfilePic} alt="User's Photo" className="w-[60px] h-[60px] object-cover object-center rounded-full block mx-auto mb-4" />
              <span className="block text-[18px] font-medium">{user?.name || "No Name"}</span>
              <span className="block mb-4">{user?.email || "No Email"}</span>
              <div className="flex justify-center items-center gap-2">
                <Link to='/stream/profile' className="btn btn-primary" onClick={() => setProfileCardShow(false)}>Profile</Link>
                <button type="button" className="btn btn-warning" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          }
        </nav>

        <HeaderDrawer drawerShow={drawerShow} setDrawerShow={setDrawerShow} drawerRef={drawerRef} />
      </div>
    </header>
  );
}