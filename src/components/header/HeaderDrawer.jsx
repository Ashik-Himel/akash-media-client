import PropTypes from 'prop-types';
import { GoPackage } from "react-icons/go";
import { FaPlus, FaFilm } from 'react-icons/fa';
import { FaArrowRight, FaXmark } from 'react-icons/fa6';
import {IoHomeSharp} from 'react-icons/io5';
import {PiTelevision} from 'react-icons/pi';
import {MdLogin, MdOutlineElectricBolt} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import useAllContext from '../../hooks/useAllContext';

export default function HeaderDrawer({drawerShow, setDrawerShow, drawerRef}) {
  const {user} = useAllContext();

  return (
    <div className={`py-8 px-6 fixed top-0 bottom-0 w-4/5 max-w-[300px] bg-primary text-white transition-[left] duration-300 z-50 [box-shadow:2px_0px_30px_rgba(38,55,145)] dark:[box-shadow:2px_0px_30px_rgba(255,69,0)] ${drawerShow ? 'left-0' : '-left-[400px]'}`} ref={drawerRef}>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-[18px] uppercase font-medium">Menu</h4>
          <FaXmark className="text-2xl cursor-pointer select-none" onClick={() => setDrawerShow(false)} />
        </div>
        <div className="space-y-1">
          <NavLink to='/' className="flex justify-between items-center py-2 rounded-lg" onClick={() => setDrawerShow(false)}>
            <div className="flex items-center gap-4">
              <IoHomeSharp className="text-xl" /> Home
            </div>
            <FaArrowRight />
          </NavLink>
          <NavLink to='/channels' className="flex justify-between items-center py-2 rounded-lg" onClick={() => setDrawerShow(false)}>
            <div className="flex items-center gap-4">
              <PiTelevision className="text-xl" /> Channels
            </div>
            <FaArrowRight />
          </NavLink>
          <NavLink to='/recharge' className="flex justify-between items-center py-2 rounded-lg" onClick={() => setDrawerShow(false)}>
            <div className="flex items-center gap-4">
              <MdOutlineElectricBolt className="text-xl" /> Recharge
            </div>
            <FaArrowRight />
          </NavLink>
          <NavLink to='/packages' className="flex justify-between items-center py-2 rounded-lg" onClick={() => setDrawerShow(false)}>
            <div className="flex items-center gap-4">
              <GoPackage className="text-xl" /> Packages
            </div>
            <FaArrowRight />
          </NavLink>
          <NavLink to='/get-connection' className="flex justify-between items-center py-2 rounded-lg" onClick={() => setDrawerShow(false)}>
            <div className="flex items-center gap-4">
              <FaPlus className="text-xl" /> Get a connection
            </div>
            <FaArrowRight />
          </NavLink>
          {
            user ? <NavLink to='/stream' className="flex justify-between items-center py-2 rounded-lg" onClick={() => setDrawerShow(false)}>
              <div className="flex items-center gap-4">
                <FaFilm className="text-xl" /> Stream
              </div>
              <FaArrowRight />
            </NavLink> : <NavLink to='/login' className="flex justify-between items-center py-2 rounded-lg" onClick={() => setDrawerShow(false)}>
              <div className="flex items-center gap-4">
                <MdLogin className="text-xl" /> Login
              </div>
              <FaArrowRight />
            </NavLink>
          }
        </div>
      </div>
    </div>
  );
}

HeaderDrawer.propTypes = {
  drawerShow: PropTypes.bool,
  setDrawerShow: PropTypes.func,
  drawerRef: PropTypes.object
}