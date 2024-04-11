import PropTypes from 'prop-types'

export default function FaqSection({faqRef}) {
  return (
    <section className="mt-12 lg:mt-16" ref={faqRef}>
      <div className="container">
        <h2 className="text-4xl font-semibold text-primary text-center mb-8">
          Frequently Asked Questions (FAQ)
        </h2>

        <div className="space-y-2 w-full max-w-[900px] mx-auto">
          <div className="collapse collapse-plus bg-base-200 dark:bg-gray-700">
            <input type="radio" name="my-accordion-3" defaultChecked /> 
            <div className="collapse-title text-xl font-medium">
              How many TV channels do you provide?
            </div>
            <div className="collapse-content"> 
              <p>We are providing 250+ channels with 80+ HD channels.</p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200 dark:bg-gray-700">
            <input type="radio" name="my-accordion-3" /> 
            <div className="collapse-title text-xl font-medium">
              What I need to enjoy your services?
            </div>
            <div className="collapse-content"> 
              <p>You just need to buy our TV Box and a package with it. Then you are done!</p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200 dark:bg-gray-700">
            <input type="radio" name="my-accordion-3" /> 
            <div className="collapse-title text-xl font-medium">
              Which payment method do you provide?
            </div>
            <div className="collapse-content"> 
              <p>Bkash, Rocket, Nagad and Card Payment.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

FaqSection.propTypes = {
  faqRef: PropTypes.object
}