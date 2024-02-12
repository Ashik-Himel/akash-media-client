import PropTypes from 'prop-types';
import { FaPlusCircle } from 'react-icons/fa';
import { FaArrowRight, FaXmark } from 'react-icons/fa6';
import {BiSolidContact} from 'react-icons/bi';
import {IoIosContact} from 'react-icons/io';
import {IoHomeSharp} from 'react-icons/io5';
import {PiTelevision} from 'react-icons/pi';
import {MdOutlineElectricBolt} from 'react-icons/md';
import { NavLink } from 'react-router-dom';

export default function HeaderDrawer({drawerShow, setDrawerShow, drawerRef}) {
  return (
    <div className={`py-8 px-6 lg:hidden fixed top-0 bottom-0 w-4/5 max-w-[300px] bg-secondary text-white transition-[left] duration-300 z-50 ${drawerShow ? 'left-0' : '-left-[350px]'}`} ref={drawerRef}>
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
          <NavLink to='/buy' className="flex justify-between items-center py-2 rounded-lg" onClick={() => setDrawerShow(false)}>
            <div className="flex items-center gap-4">
              <FaPlusCircle className="text-xl" /> Buy
            </div>
            <FaArrowRight />
          </NavLink>
          <NavLink to='/about-us' className="flex justify-between items-center py-2 rounded-lg" onClick={() => setDrawerShow(false)}>
            <div className="flex items-center gap-4">
              <IoIosContact className="text-xl" /> About Us
            </div>
            <FaArrowRight />
          </NavLink>
          <NavLink to='/contact-us' className="flex justify-between items-center py-2 rounded-lg" onClick={() => setDrawerShow(false)}>
            <div className="flex items-center gap-4">
              <BiSolidContact className="text-xl" /> Contact Us
            </div>
            <FaArrowRight />
          </NavLink>
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