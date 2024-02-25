import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ChannelCard from './ChannelCard';

export default function ChannelsSection({sectionHeading, category}) {
  const [expanded, setExpanded] = useState(false);
  const [numOfCollapsedItem, setNumOfCollapsedItem] = useState(2);

  useEffect(() => {
    const width = window.innerWidth;
    
    if (width >= 1536) setNumOfCollapsedItem(7);
    else if (width >= 1280) setNumOfCollapsedItem(6);
    else if (width >= 1024) setNumOfCollapsedItem(5);
    else if (width >= 768) setNumOfCollapsedItem(4);
    else if (width >= 640) setNumOfCollapsedItem(3);
  }, []);

  const {data: channels = []} = useQuery({
    queryKey: ['channels', category],
    queryFn: async() => {
      const res = await axios('/channels.json');
      return res.data;
    }
  })

  return (
    <section className='mt-12 lg:mt-16'>
      <div className="container">
        <div className='flex justify-between items-center gap-4 bg-bg-color mb-2 px-4 py-3 rounded-md'>
          <span className='text-[18px] font-semibold uppercase'>{sectionHeading}</span>
          <button className='font-bold text-primary' onClick={() => setExpanded(!expanded)}>
            {
              expanded ? "Collapse" : "See All"
            }
          </button>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 justify-center items-center gap-4'>
          {
            channels?.slice(0, expanded ? channels?.length : numOfCollapsedItem)?.map(channel => <ChannelCard key={channel?.number} channel={channel} />)
          }
        </div>
      </div>
    </section>
  );
}

ChannelsSection.propTypes = {
  sectionHeading: PropTypes.string,
  category: PropTypes.string
}