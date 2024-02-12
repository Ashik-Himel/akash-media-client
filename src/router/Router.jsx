import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Channels from "../pages/Channels";
import Recharge from "../pages/Recharge";
import Login from "../pages/Login";
import Buy from "../pages/Buy";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";

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
        path: '/buy',
        element: <Buy />
      },
      {
        path: '/about-us',
        element: <AboutUs />
      },
      {
        path: '/contact-us',
        element: <ContactUs />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
])