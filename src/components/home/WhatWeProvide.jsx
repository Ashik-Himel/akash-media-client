import channelsIcon from '../../assets/icons/channels.png';
import videoIcon from '../../assets/icons/video.png';
import audioIcon from '../../assets/icons/audio.png';
import packagesIcon from '../../assets/icons/package.png';
import connectionIcon from '../../assets/icons/connection2.png';
import supportIcon from '../../assets/icons/support.png';
import PropTypes from 'prop-types';

const FeatureCard = ({img, text}) => {
  return (
    <div className='border-2 border-gray-300 px-6 py-10 text-center'>
      <img src={img} alt="Channels Icon" className='w-[100px] mx-auto mb-8' />
      <h4 className='text-xl font-semibold uppercase'>{text}</h4>
    </div>
  );
}

export default function WhatWeProvide() {
  return (
    <section>
      <div className="container">
        <h2 className='text-4xl font-semibold text-primary text-center mb-2'>What We Provide</h2>
        <p className='text-center w-full max-w-[550px] mx-auto mb-8'>We provide many interesting features with our services that will makes your experience better with Akash Media!</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-6'>
          <FeatureCard img={channelsIcon} text='100+ TV Channels' />
          <FeatureCard img={videoIcon} text='Better Video Quality' />
          <FeatureCard img={audioIcon} text='Impressive Audio' />
          <FeatureCard img={packagesIcon} text='Promising Packages' />
          <FeatureCard img={connectionIcon} text='Easy Connection' />
          <FeatureCard img={supportIcon} text='24/7 Support' />
        </div>
      </div>
    </section>
  );
}

FeatureCard.propTypes = {
  img: PropTypes.string,
  text: PropTypes.string
}