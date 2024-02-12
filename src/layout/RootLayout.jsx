import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
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
    </div>
  );
}