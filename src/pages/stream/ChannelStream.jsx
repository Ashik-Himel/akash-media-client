import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAllContext from "../../hooks/useAllContext";
import ChannelCard from "../../components/channels/ChannelCard";
import { useEffect } from "react";
import StreamHomeSection from "../../components/stream/streamHome/StreamHomeSection";
import warningIcon from '../../assets/warning.png'

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

  const {data: relatedChannelsPackage = [], isLoading: isLoading3, refetch: refetch3} = useQuery({
    queryKey: ["relatedChannelsPackage", params?.id],
    queryFn: async() => {
      const res = await axiosSecure(`/related-channels-package?channel_id=${params?.id}`);
      return res.data;
    },
    enabled: userLoaded
  })

  const {data: packages = [], isLoading: isLoading2, refetch: refetch2} = useQuery({
    queryKey: ["packages", user?.uid],
    queryFn: async() => {
      const res = await axiosSecure('/users-packages?filter=running');
      return res.data;
    },
    enabled: userLoaded
  })

  useEffect(() => {
    refetch();
    refetch2();
    refetch3();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id])

  if (isLoading || isLoading2 || isLoading3) {
    return (
      <div className="mt-10 text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (channel?.message === "Unauthorized Channel Access") {
    return (
      <main className="py-12">
        <section>
          <div className="container text-center">
            <img src={warningIcon} alt="Warning Icon" className="w-full max-w-[250px] mx-auto mb-4" />
            <h2 className="text-3xl font-medium text-red-600 mb-1">Unauthorized Access</h2>
            <p className="w-full max-w-[550px] mx-auto mb-6">The channel you are requesting to watch is not available for you. Buy package that including this channel, then enjoy this channel.</p>
            <div className="flex justify-center items-center gap-2">
              <Link to='/packages' className="btn btn-primary">Packages</Link>
              <Link to='/stream' className="btn btn-primary btn-outline border-2">Stream Home</Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pb-12">
      <Helmet>
        <title>{channel?.name || "Channel"} - Akash Media</title>
      </Helmet>

      <section className="lg:mt-8">
        <div className="container">
          <div className="grid grid-cols-1 xl:grid-cols-[auto_400px] gap-8">
            <div className="w-full max-w-[900px] sticky top-[70px] py-4 lg:py-0 lg:static z-30 bg-white dark:bg-gray-900">
              <iframe className="aspect-video w-full rounded-lg" src={channel?.source} allowFullScreen></iframe>
              <div className="flex items-center gap-4 mt-4 bg-bg-color dark:bg-gray-700 px-4 py-2 rounded-lg">
                <img src={channel?.logo} alt="Channel Logo" className="h-[50px]" />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xl font-medium">{channel?.name}</h4>
                    {
                      channel?.hd && <span className="bg-primary text-white text-sm font-semibold inline-block px-2 py-px rounded">HD</span>
                    }
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">Serial: {channel?.serial}</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-medium mb-4">Related Channels</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-2 gap-4">
                {
                  relatedChannelsPackage?.map(channel => <ChannelCard key={channel?.serial} channel={channel} />)
                }
              </div>
            </div>

            <div className="xl:col-span-2">
              {
                packages?.length !== 0 && packages?.map(pkg => <StreamHomeSection key={pkg?._id} pkg={pkg} containerNone={true} />)
              }
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}