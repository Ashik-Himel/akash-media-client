import { Outlet, useLocation } from "react-router-dom";
import StreamHeader from "../components/header/StreamHeader";
import { useEffect } from "react";

export default function StreamLayout() {
  const {pathname} = useLocation();
  useEffect(() => {
    scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      <StreamHeader />
      <Outlet />
    </div>
  );
}