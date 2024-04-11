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
      const res = await axiosSecure('/users-packages?filter=running');
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
    <main className="pb-12">
      <Helmet>
        <title>Stream - Akash Media</title>
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