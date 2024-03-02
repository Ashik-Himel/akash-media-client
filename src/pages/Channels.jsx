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

  const {data: channels = [], refetch} = useQuery({
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
      </Helmet>

      <HeaderBanner text="Channel List" />

      <div className="container mt-12 mb-6">
        <div className="w-full max-w-[500px] mx-auto relative">
          <input type="search" name="search" id="search" placeholder="Search Channel" onChange={handleOnChange} className="input w-full block bg-bg-color border-primary pr-10" />
        <IoSearchOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-xl" />
        </div>
      </div>

      <ChannelsSection sectionHeading="Bangla" channels={channels?.filter(channel => channel?.category == "bangla")} />
      <ChannelsSection sectionHeading="Hindi Entertainment" channels={channels?.filter(channel => channel?.category == "hindi entertainment")} />
      <ChannelsSection channels={channels?.filter(channel => channel?.category == "hindi movies")} />
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