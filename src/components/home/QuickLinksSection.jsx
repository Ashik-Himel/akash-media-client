import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import connectionIcon from "../../assets/icons/connection.png";
import contactIcon from "../../assets/icons/contact.png";
import faqIcon from "../../assets/icons/faq.png";
import packageIcon from "../../assets/icons/package.png";
import rechargeIcon from "../../assets/icons/recharge.png";
import channelsIcon from "../../assets/icons/tv.png";

const QuickLinkCard = ({ to, icon, altText, text }) => {
  return (
    <Link
      to={to}
      className="bg-[#E9EBF4] p-4 rounded flex justify-start items-center gap-4"
    >
      <img src={icon} alt={altText} className="w-8" />
      <span className="text-xl font-semibold">{text}</span>
    </Link>
  );
};

export default function QuickLinksSection() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 justify-center items-center">
          <QuickLinkCard
            to="/channels"
            icon={channelsIcon}
            altText="Channel Icon"
            text="Channel list"
          />
          <QuickLinkCard
            to="/recharge"
            icon={rechargeIcon}
            altText="Recharge Icon"
            text="Recharge"
          />
          <QuickLinkCard
            to="/packages"
            icon={packageIcon}
            altText="Package Icon"
            text="Packages"
          />
          <QuickLinkCard
            to="/get-connection"
            icon={connectionIcon}
            altText="Connection Icon"
            text="Get a connection"
          />
          <QuickLinkCard
            to=""
            icon={contactIcon}
            altText="Contact Icon"
            text="Contact Us"
          />
          <QuickLinkCard to="" icon={faqIcon} altText="FAQ Icon" text="FAQ" />
        </div>
      </div>
    </section>
  );
}

QuickLinkCard.propTypes = {
  to: PropTypes.string,
  icon: PropTypes.string,
  altText: PropTypes.string,
  text: PropTypes.string,
};
