import PropTypes from 'prop-types';
import {MdSettingsRemote} from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom';

export default function ChannelCard({channel}) {
  const {pathname} = useLocation();

  return (
    <Link to={pathname.startsWith('/stream') ? `/stream/${channel?._id}` : null} className={`w-full p-4 rounded-lg border-2 border-primary dark:!border-gray-700 relative ${pathname.startsWith('/stream') ? "cursor-pointer select-none" : "cursor-default"}`}>
      <div className='flex justify-between items-center gap-4 mb-4'>
        <span className='font-semibold text-primary flex justify-center items-center gap-1'>
          <MdSettingsRemote /> {channel?.serial}
        </span>
        {
          channel?.hd && <span className='inline-block bg-primary text-white text-sm font-semibold px-2 py-px rounded'>HD</span>
        }
      </div>
      <img src={channel?.logo} alt="Channel's Logo" className='w-auto h-[60px] mx-auto mb-2' />
      <span className='font-semibold text-center block'>{channel?.name}</span>
    </Link>
  );
}

ChannelCard.propTypes = {
  channel: PropTypes.object
}