import rechargeImg from '../../assets/recharge.png'

export default function RechargeSection() {
  const handleSubmit = e => {
    e.preventDefault();

  }

  return (
    <section className="mt-12 lg:mt-16">
      <div className="container">
        <div className='flex justify-between items-center gap-8 [&>*]:flex-1'>
          <div className='hidden md:block'>
            <img src={rechargeImg} alt="Recharge Section Image" className='w-full max-w-[450px] mx-auto' />
          </div>

          <form className='bg-bg-color px-6 py-8 rounded-lg' onSubmit={handleSubmit}>
            <h4 className='text-primary text-center text-3xl font-semibold mb-6'>Recharge Now</h4>
            <label htmlFor="username" className='block font-medium mb-2'>Username</label>
            <input className='input w-full mb-4 bg-white' type="text" name="username" id="username" placeholder='Enter your username' required />

            <label htmlFor="amount" className='block font-medium mb-2'>Amount</label>
            <input className='input w-full mb-4 bg-white' type="number" name="amount" id="amount" placeholder='Enter recharge amount' required />
            <button className='btn btn-primary' type="submit">Recharge</button>
          </form>
        </div>
      </div>
    </section>
  );
}