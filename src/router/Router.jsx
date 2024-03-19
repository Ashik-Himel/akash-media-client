import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Channels from "../pages/Channels";
import Recharge from "../pages/Recharge";
import Login from "../pages/Login";
import Packages from "../pages/Packages";
import GetConnection from "../pages/GetConnection";
import PrivateRouteAlt from "../manageRoutes/PrivateRouteAlt";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/channels',
        element: <Channels />
      },
      {
        path: '/recharge',
        element: <Recharge />
      },
      {
        path: '/packages',
        element: <Packages />
      },
      {
        path: '/get-connection',
        element: <GetConnection />
      },
      {
        path: '/login',
        element: <PrivateRouteAlt><Login /></PrivateRouteAlt>
      }
    ]
  }
])