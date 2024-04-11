import PropTypes from 'prop-types';
import { useState } from 'react';
import ChannelCard from './ChannelCard';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'

export default function ChannelsSection({sectionHeading, channels}) {
  const [expanded, setExpanded] = useState(false);

  if (channels.length === 0) return null;

  return (
    <section>
      <div className="container">
        <div className='flex justify-between items-center gap-4 bg-bg-color dark:bg-gray-700 mb-2 px-4 py-3 rounded-md cursor-pointer select-none' onClick={() => setExpanded(!expanded)}>
          <span className='text-[18px] font-semibold uppercase'>{sectionHeading} ({channels?.length || 0})</span>
          <div className='text-primary text-2xl'>
            {
              expanded ? <IoIosArrowUp /> : <IoIosArrowDown />
            }
          </div>
        </div>

        <div className={`grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 mb-4 ${expanded ? 'grid' : 'hidden'}`}>
          {
            channels?.map(channel => <ChannelCard key={channel?.number} channel={channel} />)
          }
        </div>
      </div>
    </section>
  );
}

ChannelsSection.propTypes = {
  sectionHeading: PropTypes.string,
  channels: PropTypes.array
}