import { Link, useLocation } from "react-router-dom";
import brandLogo from "../../assets/akash-media.png";
import facebookIcon from "../../assets/facebook.png";
import instagramIcon from "../../assets/instagram.png";
import whatsappIcon from "../../assets/whatsapp.png";

export default function Footer() {
  const { pathname } = useLocation();

  if (pathname === "/login") return null;

  return (
    <footer className="bg-bg-color mt-10">
      <div className="container">
        <div className="py-10 grid grid-cols-[auto] sm:grid-cols-[auto_auto] lg:grid-cols-[auto_auto_auto] gap-8 justify-between items-center">
          <div className="sm:col-span-2 lg:col-span-1">
            <img
              src={brandLogo}
              alt="Brand Logo"
              className="w-[120px] block mb-4"
            />
            <p className="block mb-2 max-w-[350px]">
              Akash Media is a company of Media Group. It provides digital
              network services. It has 100+ TV channels with 60+ HD channels.
            </p>
            <span className="block mb-6">
              <span className="font-semibold">Mobile:</span>{" "}
              <a href="tel:+8801796775774" className="text-primary">
                +8801796-775774
              </a>
            </span>
            <div className="flex items-center gap-6">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={facebookIcon}
                  alt="Facebook Icon"
                  className="w-[30px]"
                />
              </a>
              <a
                href="https://wa.me/+8801796775774"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={whatsappIcon}
                  alt="WhatsApp Icon"
                  className="w-[35px]"
                />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={instagramIcon}
                  alt="Instagram Icon"
                  className="w-[30px]"
                />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-semibold text-primary mb-3">
              Quick Links
            </h4>
            <div className="flex flex-col items-start gap-2 font-medium">
              <Link to="/recharge">Recharge</Link>
              <Link to="/packages">Packages</Link>
              <Link to="/get-connection">Get a connection</Link>
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-semibold text-primary mb-3">
              Contact Us
            </h4>
            <div className="flex flex-col items-start gap-2 font-medium">
              <a
                href="https://wa.me/+8801796775774"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
              <a
                href="https://www.messenger.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Messenger
              </a>
              <a
                href="mailto:support@mediamax.com.bd"
                target="_blank"
                rel="noopener noreferrer"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-primary text-white py-5 text-center">
        <div className="container">
          <p>
            Copyright&copy;{new Date().getFullYear()} - Akash Media. All rights
            reserved by{" "}
            <a
              className="font-semibold"
              href="https://www.mediamax.com.bd"
              target="_blank"
              rel="noopener noreferrer"
            >
              Media Group
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
