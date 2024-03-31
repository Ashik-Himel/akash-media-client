import PropTypes from 'prop-types';
import {MdSettingsRemote} from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom';

export default function ChannelCard({channel}) {
  const {pathname} = useLocation();
  const navigate = useNavigate()

  const handleRedirect = () => {
    if (!pathname.startsWith('/stream')) return;

    navigate(`/stream/${channel?._id}`);
  }

  return (
    <div className={`w-full p-4 rounded-lg border border-primary relative ${pathname.startsWith('/stream') ? "cursor-pointer select-none" : ""}`} onClick={handleRedirect}>
      <div className='flex justify-between items-center gap-4 mb-4'>
        <span className='font-semibold text-primary flex justify-center items-center gap-1'>
          <MdSettingsRemote /> {channel?.serial}
        </span>
        {
          channel?.hd && <span className='inline-block bg-primary text-white text-sm font-semibold px-2 py-px rounded'>HD</span>
        }
      </div>
      <img src={channel?.logo} alt="Channel's Logo" className='w-auto h-[60px] mx-auto mb-2' />
      <span className='font-semibold text-center block'>{channel?.displayName}</span>
      
    </div>
  );
}

ChannelCard.propTypes = {
  channel: PropTypes.object
}