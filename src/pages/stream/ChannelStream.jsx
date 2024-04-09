import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAllContext from "../../hooks/useAllContext";
import ChannelCard from "../../components/channels/ChannelCard";
import { useEffect } from "react";
import StreamHomeSection from "../../components/stream/streamHome/StreamHomeSection";

export default function ChannelStream() {
  const params = useParams();
  const axiosSecure = useAxiosSecure();
  const {user, userLoaded} = useAllContext();

  const {data: channel = {}, isLoading, refetch} = useQuery({
    queryKey: ["channel", params?.id],
    queryFn: async() => {
      const res = await axiosSecure(`/users-channel?id=${params?.id}`);
      return res.data;
    },
    enabled: userLoaded
  })

  const {data: packages = [], isLoading: isLoading2, refetch: refetch2} = useQuery({
    queryKey: ["packages", user?.uid],
    queryFn: async() => {
      const res = await axiosSecure('/users-packages');
      return res.data;
    },
    enabled: userLoaded
  })

  useEffect(() => {
    refetch();
    refetch2();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id])

  if (isLoading || isLoading2) {
    return (
      <div className="mt-10 text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (channel?.message === "Unauthorized Channel Access") {
    return (
      <main>
        <section>
          <div className="container">

          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="mb-8">
      <Helmet>
        <title>{channel?.name || "Channel"} - Akash Media</title>
        <meta name="description" content="Akash Media is a Direct-to-Home (DTH) television service provider. We have 250+ channels with 80+ hd channels in competitive packages. You can get an easy connection from us." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Tags */}
        <meta property="og:title" content={`${channel?.name || "Channel"} - Akash Media`} />
        <meta property="og:description" content="Akash Media is a Direct-to-Home (DTH) television service provider. We have 250+ channels with 80+ hd channels in competitive packages." />
        <meta property="og:image" content="https://akashmedia.net/assets/akash-media-YAYuS5Eg.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.akashmedia.net/stream/${params?.id}`} />
      </Helmet>

      <section className="mt-8">
        <div className="container">
          <div className="grid grid-cols-1 xl:grid-cols-[auto_400px] gap-8">
            <div className="w-full max-w-[900px]">
              <iframe className="aspect-video w-full" src={channel?.source} allowFullScreen></iframe>
              <div className="flex items-center gap-4 mt-4 bg-gray-100 px-4 py-2 rounded-lg">
                <img src={channel?.logo} alt="Channel Logo" className="h-[50px]" />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xl font-medium">{channel?.name}</h4>
                    {
                      channel?.hd && <span className="bg-primary text-white text-sm font-semibold inline-block px-2 py-px rounded">HD</span>
                    }
                  </div>
                  <span className="text-gray-600">Serial: {channel?.serial}</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4">Favourite Channels</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-2 gap-4">
                {
                  packages[0]?.channels?.slice(0, 4)?.map(channel => <ChannelCard key={channel?.serial} channel={channel} />)
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      {
        packages?.length !== 0 && packages?.map(pkg => <StreamHomeSection key={pkg?._id} pkg={pkg} />)
      }
    </main>
  );
}