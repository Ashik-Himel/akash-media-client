import { Outlet } from "react-router-dom";
import StreamHeader from "../components/header/StreamHeader";

export default function StreamLayout() {
  return (
    <div>
      <StreamHeader />
      <Outlet />
    </div>
  );
}