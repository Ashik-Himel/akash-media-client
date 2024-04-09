import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAllContext from "../../hooks/useAllContext";
import StreamHomeSection from "../../components/stream/streamHome/StreamHomeSection";
import emptyBin from '../../assets/empty-bin.jpg';
import { Link } from "react-router-dom";

export default function StreamHome() {
  const axiosSecure = useAxiosSecure();
  const {user, userLoaded} = useAllContext();

  const {data: packages = [], isLoading} = useQuery({
    queryKey: ["packages", user?.uid],
    queryFn: async() => {
      const res = await axiosSecure('/users-packages');
      return res.data;
    },
    enabled: userLoaded
  })

  if (isLoading) {
    return (
      <div className="mt-10 text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <main className="mb-8">
      <Helmet>
        <title>Stream - Akash Media</title>
        <meta name="description" content="Akash Media is a Direct-to-Home (DTH) television service provider. We have 250+ channels with 80+ hd channels in competitive packages. You can get an easy connection from us." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Stream - Akash Media" />
        <meta property="og:description" content="Akash Media is a Direct-to-Home (DTH) television service provider. We have 250+ channels with 80+ hd channels in competitive packages." />
        <meta property="og:image" content="https://akashmedia.net/assets/akash-media-YAYuS5Eg.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.akashmedia.net/stream" />
      </Helmet>

      {
        packages?.length !== 0 ? packages?.map(pkg => <StreamHomeSection key={pkg?._id} pkg={pkg} />) : <section className="mt-12">
          <div className="container text-center">
            <img src={emptyBin} alt="Empty Bin Image" className="w-full max-w-[200px] mx-auto" />
            <h2 className="text-3xl font-medium mt-6">No Package Found!</h2>
            <p className="max-w-[500px] mx-auto mt-2 text-gray-600">You don&apos;t have any package. Go to the packages and buy a package to enjoy your favourite channels.</p>
            <Link to="/packages" className="btn btn-primary mt-6">Packages</Link>
          </div>
        </section>
      }
    </main>
  );
}