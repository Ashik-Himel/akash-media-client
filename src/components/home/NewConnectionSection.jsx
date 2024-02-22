import { Link } from 'react-router-dom';
import tvBox from '../../assets/tv-box.png';
import newIcon from '../../assets/new.png';


export default function NewConnectionSection() {
  return (
    <section className="mt-12 lg:mt-16 bg-bg-color py-16">
      <div className="container">
        <div className='flex flex-col-reverse md:flex-row justify-between md:items-center gap-8'>
          <div>
            <img src={newIcon} alt="New Icon" className='w-[100px] mb-4' />
            <span className='font-medium text-[18px] block mb-1'>Get a new connection</span>
            <h2 className='text-primary font-semibold text-3xl mb-4'>Akash Media TV Box</h2>
            <p className='max-w-[600px] mb-2'>You can enjoy 250+ channels with 70+ HD channels easily. Buy our tv box and choose a package. You are ready to enjoy our service.</p>
            <span className='block text-3xl font-semibold mb-6'>&#2547; 1800</span>
            <Link to='/get-connection' className='btn btn-primary'>Buy Now</Link>
          </div>
          <div>
            <img src={tvBox} alt="TV Box" className='w-full max-w-[400px] md:mx-auto' />
          </div>
        </div>
      </div>
    </section>
  );
}