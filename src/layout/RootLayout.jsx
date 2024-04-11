import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import messengerIcon from '../assets/messenger.png';
import { useEffect } from "react";
import useAllContext from "../hooks/useAllContext";
import { getSystemTheme } from "../lib/theme";

export default function RootLayout() {
  const {themeValue} = useAllContext();
  const {pathname} = useLocation();

  useEffect(() => {
    scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={`${themeValue === "system" ? getSystemTheme() : themeValue} h-full min-h-screen flex flex-col [&>*:nth-child(2)]:flex-1  dark:bg-gray-900 dark:text-white`}>
      <Header />
      <Outlet />
      <Footer />
      <a href="https://m.me/media.group.2005" target="_blank" rel="noopener noreferrer">
        <img src={messengerIcon} alt="Messenger Icon" className="fixed bottom-6 right-6 w-[50px]" />
      </a>
    </div>
  );
}