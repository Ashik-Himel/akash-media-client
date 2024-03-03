import { Helmet } from "react-helmet-async";
import HeaderBanner from "../components/shared/HeaderBanner";
import ChannelsSection from "../components/channels/ChannelsSection";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {IoSearchOutline} from 'react-icons/io5'

export default function Channels() {
  const axiosPublic = useAxiosPublic();
  const [searchText, setSearchText] = useState('');

  const {data: channels = [], isLoading, refetch} = useQuery({
    queryKey: ['channels', searchText],
    queryFn: async() => {
      const res = await axiosPublic(`/channels?search=${searchText}`);
      return res.data;
    }
  });

  const handleOnChange = e => {
    setSearchText(e.target.value);
    refetch();
  }

  return (
    <main>
      <Helmet>
        <title>Channels - Akash Media</title>
        <meta name="description" content="We have 250+ channels with 80+ hd channels in various types of packages in a competitive prices." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Channels - Akash Media" />
        <meta property="og:description" content="We have 250+ channels with 80+ hd channels in various types of packages in a competitive prices." />
        <meta property="og:image" content="https://akashmedia.net/assets/akash-media-YAYuS5Eg.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.akashmedia.net/channels" />
      </Helmet>

      <HeaderBanner text="Channel List" />

      <div className="container mt-12 mb-6">
        <div className="w-full max-w-[500px] mx-auto relative">
          <input type="search" name="search" id="search" placeholder="Search Channel" onChange={handleOnChange} className="input w-full block bg-bg-color border-primary pr-10" />
        <IoSearchOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-xl" />
        </div>
      </div>

      {
        isLoading && <div className="my-12 text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      }

      <ChannelsSection sectionHeading="Bangla" channels={channels?.filter(channel => channel?.category == "bangla")} />
      <ChannelsSection sectionHeading="Hindi Entertainment" channels={channels?.filter(channel => channel?.category == "hindi entertainment")} />
      <ChannelsSection sectionHeading="Hindi Movies" channels={channels?.filter(channel => channel?.category == "hindi movies")} />
      <ChannelsSection sectionHeading="English Movies" channels={channels?.filter(channel => channel?.category == "english movies")} />
      <ChannelsSection sectionHeading="Sports" channels={channels?.filter(channel => channel?.category == "sports")} />
      <ChannelsSection sectionHeading="Music" channels={channels?.filter(channel => channel?.category == "music")} />
      <ChannelsSection sectionHeading="Kids" channels={channels?.filter(channel => channel?.category == "kids")} />
      <ChannelsSection sectionHeading="Infotainment" channels={channels?.filter(channel => channel?.category == "infotainment")} />
      <ChannelsSection sectionHeading="News" channels={channels?.filter(channel => channel?.category == "news")} />
      <ChannelsSection sectionHeading="Islamic" channels={channels?.filter(channel => channel?.category == "islamic")} />
      <ChannelsSection sectionHeading="International" channels={channels?.filter(channel => channel?.category == "international")} />
    </main>
  );
}