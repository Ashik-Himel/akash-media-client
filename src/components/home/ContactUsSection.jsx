import PropTypes from 'prop-types'
import contactImg from '../../assets/contact.png'
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import Swal from 'sweetalert2';

export default function ContactUsSection({contactRef}) {
  const form = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();


    emailjs.sendForm("akash-media", "akash-media-template", form.current, "sSfKmZ_QCeyBKmoXJ")
      .then(() => {
        Swal.fire({
          title: "Message Sent",
          text: "Your message sent successfully!!!",
          icon: "success",
          confirmButtonColor: '#263791'
        })
        e.target.reset();
      })
      .catch(error => {
        Swal.fire({
          title: "Error",
          text: error.text,
          icon: "error",
          confirmButtonColor: '#263791'
        })
      })
  }

  return (
    <section className="mt-12 lg:mt-16" ref={contactRef}>
      <div className="container">
        <h2 className="text-4xl font-semibold text-primary text-center mb-2">
          Contact Us
        </h2>
        <p className="text-center w-full max-w-[550px] mx-auto mb-8">
          Need to discuss about something with us? Fill up this form and send us. We will reply you as soon as possible!
        </p>

        <div className='flex justify-between md:items-center gap-8 [&>*]:flex-1'>
          <div className='hidden md:block'>
            <img src={contactImg} alt="Contact Section Image" className='w-full max-w-[450px]' />
          </div>
          <form className='dark:[&>input]:bg-gray-700 dark:[&>input]:border-gray-700' onSubmit={handleSubmit} ref={form}>
            <label htmlFor="name" className='block font-medium mb-2'>Name</label>
            <input className='input w-full border-2 border-bg-color mb-4' type="text" name="name" id="name" placeholder='Enter your name' required />
            
            <label htmlFor="email" className='block font-medium mb-2'>Email</label>
            <input className='input w-full border-2 border-bg-color mb-4' type="email" name="email" id="email" placeholder='Enter your email' required />

            <label htmlFor="phone" className='block font-medium mb-2'>Phone Number</label>
            <input className='input w-full border-2 border-bg-color mb-4' type="tel" name="phone" id="phone" placeholder='Enter your phone number' required />

            <label htmlFor="subject" className='block font-medium mb-2'>Subject</label>
            <input className='input w-full border-2 border-bg-color mb-4' type="text" name="subject" id="subject" placeholder='Enter the subject' required />

            <label htmlFor="message" className='block font-medium mb-2'>Message</label>
            <textarea className='textarea resize-none w-full h-[100px] border-2 border-bg-color text-base mb-4 dark:bg-gray-700 dark:border-gray-700' name="message" placeholder='Enter your message' required></textarea>
            <button className='btn btn-primary' type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
}

ContactUsSection.propTypes = {
  contactRef: PropTypes.object
}