import tvBox from '../../assets/tv-box.png';
import newIcon from '../../assets/new.png';
import PropTypes from 'prop-types'

export default function NewConnectionSection({mt}) {
  return (
    <section className={`${mt} bg-bg-color py-16`}>
      <div className="container">
        <div className='flex flex-col-reverse md:flex-row justify-between md:items-center gap-8 [&>*]:flex-1'>
          <div>
            <img src={newIcon} alt="New Icon" className='w-[100px] mb-4' />
            <span className='font-medium text-[18px] block mb-1'>Get a new connection</span>
            <h2 className='text-primary font-semibold text-3xl mb-4'>Akash Media TV Box</h2>
            <p className='max-w-[600px] mb-2'>You can enjoy 250+ channels with 80+ HD channels easily. Buy our tv box and choose a package. You are ready to enjoy our service.</p>
            <span className='block text-3xl font-semibold mb-6'>&#2547; 1800</span>
            <a href="tel:+8801711322278" className='btn btn-primary'>Call for connection</a>
          </div>
          <div>
            <img src={tvBox} alt="TV Box" className='w-full max-w-[400px] md:mx-auto' />
          </div>
        </div>
      </div>
    </section>
  );
}

NewConnectionSection.propTypes = {
  mt: PropTypes.string
}