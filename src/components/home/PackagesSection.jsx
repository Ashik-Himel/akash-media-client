import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PackageCard = ({
  name,
  amount,
  duration,
  description,
  link,
  classString,
}) => {
  return (
    <div
      className={`bg-bg-color px-6 py-8 rounded-lg text-center ${classString}`}
    >
      <span className="block text-primary font-bold uppercase mb-2">
        {name}
      </span>
      <div className="flex justify-center items-center gap-2 sm:gap-4 mb-6">
        <span className="text-5xl sm:text-[40px] md:text-5xl lg:text-[40px] xl:text-5xl font-bold">
          {amount}&#2547;
        </span>
        <span className="font-medium text-xl">/ {duration}</span>
      </div>
      <p className="mb-4">{description}</p>
      <Link to={link} className="btn btn-primary">
        Get Now
      </Link>
    </div>
  );
};

export default function PackagesSection({title = true}) {
  return (
    <section className="mt-12 lg:mt-16">
      <div className="container">
        {
          title && <>
            <h2 className="text-4xl font-semibold text-primary text-center mb-2">
              Our Packages
            </h2>
            <p className="text-center w-full max-w-[550px] mx-auto mb-8">
              We are providing you a discount in some packages. Choose a right
              package for you and enjoy your time!
            </p>
          </>
        }

        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-3 justify-center items-center gap-6">
          <PackageCard
            name="Regular"
            amount="400"
            duration="month"
            description="Buy monthly package and enjoy whole month !"
            // link="/recharge?amount=400"
            classString="sm:col-span-2 lg:col-span-1"
          />
          <PackageCard
            name="Intermediate"
            amount="1100"
            duration="3 months"
            description="Get 100 taka discount in the 3 months' package!"
            // link="/recharge?amount=1100"
            classString="sm:col-span-2 lg:col-span-1"
          />
          <PackageCard
            name="Advanced"
            amount="3200"
            duration="12 months"
            description="Get 400 taka discount in the 12 months' package!"
            // link="/recharge?amount=3200"
            classString="sm:col-span-2 lg:col-span-1 sm:col-start-2 lg:col-start-3"
          />
        </div>
      </div>
    </section>
  );
}

PackagesSection.propTypes = {
  title: PropTypes.bool
}

PackageCard.propTypes = {
  name: PropTypes.string,
  amount: PropTypes.string,
  duration: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
  classString: PropTypes.string,
};
