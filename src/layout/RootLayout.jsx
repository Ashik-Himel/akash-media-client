import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import whatsappIcon from '../assets/whatsapp.png';
import { useEffect } from "react";

export default function RootLayout() {
  const {pathname} = useLocation();
  useEffect(() => {
    scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="h-full min-h-screen flex flex-col [&>*:nth-child(2)]:flex-1">
      <Header />
      <Outlet />
      <Footer />
      <a href="https://wa.me/+8801711322278" target="_blank" rel="noopener noreferrer">
        <img src={whatsappIcon} alt="WhatsApp Icon" className="fixed bottom-6 right-6 w-[55px]" />
      </a>
    </div>
  );
}