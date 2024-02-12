import { Link, NavLink } from 'react-router-dom';
import {FaBars} from 'react-icons/fa6';
import brandLogo from '../../assets/akash-media.png';
import HeaderDrawer from './HeaderDrawer';
import { useEffect, useRef, useState } from 'react';

export default function Header() {
  const [drawerShow, setDrawerShow] = useState(false);
  const drawerRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
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
    }
  }, []);

  return (
    <header>
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
              <NavLink to='/buy' className={({isActive}) => isActive ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'}>Buy</NavLink>
            </li>
            <li>
              <NavLink to='/about-us' className={({isActive}) => isActive ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'}>About Us</NavLink>
            </li>
            <li>
              <NavLink to='/contact-us' className={({isActive}) => isActive ? 'text-primary border-b-2 border-primary' : 'hover:text-primary'}>Contact Us</NavLink>
            </li>
            <div>
              <Link to='/login' className='btn btn-primary'>Login</Link>
            </div>
          </ul>

          <div className='flex justify-center items-center gap-4 lg:hidden'>
            <div>
              <Link to='/login' className='btn btn-primary'>Login</Link>
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