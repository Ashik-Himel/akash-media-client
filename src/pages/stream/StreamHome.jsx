import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAllContext from "../../hooks/useAllContext";
import StreamHomeSection from "../../components/stream/streamHome/StreamHomeSection";

export default function StreamHome() {
  const axiosSecure = useAxiosSecure();
  const {user, userLoaded} = useAllContext();

  const {data: packages = []} = useQuery({
    queryKey: ["packages", user?.uid],
    queryFn: async() => {
      const res = await axiosSecure(`/users-channels?uid=${user?.uid}`);
      return res.data;
    },
    enabled: userLoaded
  })

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
        packages?.map(pkg => <StreamHomeSection key={pkg?.id} pkg={pkg} />)
      }
    </main>
  );
}