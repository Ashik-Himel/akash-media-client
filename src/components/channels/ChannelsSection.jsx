import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState } from 'react';
import ChannelCard from './ChannelCard';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'

export default function ChannelsSection({sectionHeading, category, sectionMarginTop}) {
  const [expanded, setExpanded] = useState(false);

  const {data: channels = []} = useQuery({
    queryKey: ['channels', category],
    queryFn: async() => {
      const res = await axios('/channels.json');
      return res.data;
    }
  });

  return (
    <section className={sectionMarginTop ? 'mt-12 lg:mt-16' : ''}>
      <div className="container">
        <div className='flex justify-between items-center gap-4 bg-bg-color mb-2 px-4 py-3 rounded-md cursor-pointer select-none' onClick={() => setExpanded(!expanded)}>
          <span className='text-[18px] font-semibold uppercase'>{sectionHeading}</span>
          <div className='text-primary text-2xl'>
            {
              expanded ? <IoIosArrowUp /> : <IoIosArrowDown />
            }
          </div>
        </div>

        <div className={`grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 justify-center items-center gap-4 mb-4 ${expanded ? 'grid' : 'hidden'}`}>
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
  category: PropTypes.string,
  sectionMarginTop: PropTypes.bool
}