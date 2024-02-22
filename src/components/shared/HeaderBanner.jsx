import PropTypes from 'prop-types'

export default function HeaderBanner({text}) {
  return (
    <div className='bg-primary text-white py-12 lg:py-16 text-center text-4xl font-semibold uppercase'>
      <span>{text}</span>
    </div>
  );
}

HeaderBanner.propTypes = {
  text: PropTypes.string
}