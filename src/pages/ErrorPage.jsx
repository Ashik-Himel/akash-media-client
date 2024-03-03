import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import errorImg from '../assets/404.png'

export default function ErrorPage() {
  return (
    <main>
      <Helmet>
        <title>Page Not Found - Akash Media</title>
        <meta name="description" content="Akash Media is a Direct-to-Home (DTH) television service provider. We have 250+ channels with 80+ hd channels in competitive packages. You can get an easy connection from us." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="noindex, nofollow" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Akash Media" />
        <meta property="og:description" content="Akash Media is a Direct-to-Home (DTH) television service provider. We have 250+ channels with 80+ hd channels in competitive packages." />
        <meta property="og:image" content="https://akashmedia.net/assets/akash-media-YAYuS5Eg.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.akashmedia.net" />
      </Helmet>

      <section>
        <div className="container">
          <div className="flex justify-between items-center gap-8 min-h-screen py-12 lg:py-16">
            <div className="hidden md:block flex-1">
              <img src={errorImg} alt="Error Image" />
            </div>
            <div className="text-center flex-1">
              <h1 className="mb-4 text-7xl sm:text-9xl tracking-tight font-bold text-primary">404</h1>
              <p className="mb-4 text-3xl sm:text-4xl font-bold">Page Not Found</p>
              <p className="mb-6 sm:text-lg text-gray-500">Oops! The page you&apos;re looking for is not exist or maybe broken. Please check the URL or navigate back home.</p>
              <Link to='/' className="btn btn-primary">
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}