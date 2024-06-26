import PropTypes from 'prop-types';
import ChannelCard from '../../channels/ChannelCard';

export default function StreamHomeSection({pkg, containerNone}) {
  const {name, channels} = pkg;

  return (
    <section className="mt-8">
      <div className={containerNone ? '' : 'container'}>
        <h2 className='text-2xl font-medium uppercase mb-4'>{name} ({channels?.length})</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4'>
          {
            channels?.map(channel => <ChannelCard key={channel?.serial} channel={channel} />)
          }
        </div>
      </div>
    </section>
  );
}

StreamHomeSection.propTypes = {
  pkg: PropTypes.object,
  containerNone: PropTypes.bool
}