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
import StreamLayout from "../layout/StreamLayout";
import StreamHome from "../pages/stream/StreamHome";
import PrivateRoute from "../manageRoutes/PrivateRoute";
import Register from "../pages/Register";
import ChannelStream from "../pages/stream/ChannelStream";
import VerifyUser from "../pages/stream/VerifyUser";
import PrivateRouteVerified from "../manageRoutes/PrivateRouteVerified";
import PaymentSuccess from "../pages/payment/PaymentSuccess";
import PaymentFailed from "../pages/payment/PaymentFailed";
import PaymentCancelled from "../pages/payment/PaymentCancelled";
import UserProfile from "../pages/stream/UserProfile";

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
      },
      {
        path: '/register',
        element: <PrivateRouteAlt><Register /></PrivateRouteAlt>
      },
      {
        path: '/payment-success',
        element: <PaymentSuccess />
      },
      {
        path: '/payment-failed',
        element: <PaymentFailed />
      },
      {
        path: '/payment-cancelled',
        element: <PaymentCancelled />
      }
    ]
  },
  {
    path: '/stream',
    element: <PrivateRoute><StreamLayout /></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/stream',
        element: <PrivateRouteVerified><StreamHome /></PrivateRouteVerified>
      },
      {
        path: '/stream/:id',
        element: <PrivateRouteVerified><ChannelStream /></PrivateRouteVerified>
      },
      {
        path: '/stream/profile',
        element: <UserProfile />
      },
      {
        path: '/stream/verify-user',
        element: <VerifyUser />
      }
    ]
  }
])