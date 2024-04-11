import { Outlet, useLocation } from "react-router-dom";
import StreamHeader from "../components/header/StreamHeader";
import { useEffect } from "react";
import useAllContext from "../hooks/useAllContext";
import { getSystemTheme } from "../lib/theme";

export default function StreamLayout() {
  const {themeValue} = useAllContext();
  const {pathname} = useLocation();

  useEffect(() => {
    scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={`${themeValue === "system" ? getSystemTheme() : themeValue} dark:bg-gray-900 dark:text-white min-h-screen`}>
      <StreamHeader />
      <Outlet />
    </div>
  );
}