import { Link, NavLink } from 'react-router-dom';
import {FaBars} from 'react-icons/fa6';
import brandLogo from '../../assets/akash-media.png';
import HeaderDrawer from './HeaderDrawer';
import { useEffect, useRef, useState } from 'react';
import useAllContext from '../../hooks/useAllContext';

export default function Header() {
  const {user, userLoaded} = useAllContext();
  const [drawerShow, setDrawerShow] = useState(false);
  const [headerShadow, setHeaderShadow] = useState(false);
  const drawerRef = useRef(null);
  const barRef = useRef(null);

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
      if (barRef.current && !barRef.current?.contains(e.target)) {
        if (drawerRef.current && !drawerRef.current?.contains(e.target)) {
          setDrawerShow(false);
        }
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
        <nav className='flex justify-between items-center gap-4 py-4'>
          <Link to='/'>
            <img src={brandLogo} alt="Brand Logo" className='w-[100px]' />
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
                <Link to='/dashboard' className='btn btn-primary'>Dashboard</Link>
              </li> : <li>
                <Link to='/login' className='btn btn-primary'>Login</Link>
              </li> : <li className='btn btn-primary'>
                <span className="loading loading-spinner loading-md"></span>
              </li>
            }
          </ul>

          <div className='flex justify-center items-center gap-4 lg:hidden'>
            <div>
              {
                userLoaded ? user ? <Link to='/dashboard' className='btn btn-primary'>Dashboard</Link> : <Link to='/login' className='btn btn-primary'>Login</Link> : <div className='btn btn-primary'>
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              }
            </div>
            <div className='text-2xl cursor-pointer select-none' onClick={() => setDrawerShow(!drawerShow)} ref={barRef}>
              <FaBars />
            </div>
          </div>
        </nav>

        <HeaderDrawer drawerShow={drawerShow} setDrawerShow={setDrawerShow} drawerRef={drawerRef} />
      </div>
    </header>
  );
}