import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import {MdOutlineRemoveRedEye} from 'react-icons/md';
import {FaXmark} from 'react-icons/fa6';
import { useState } from "react";
import ChannelCard from "../channels/ChannelCard";

const ChannelsCard = ({channels, cardVisible, setCardVisible}) => {
  return (
    <div className="justify-center items-center fixed inset-0 bg-[rgba(0,0,0,0.7)] z-50 p-6" style={cardVisible ? {display: "flex"} : {display: "none"}}>
      <div className="bg-white rounded-lg p-4 relative overflow-auto w-full max-w-[768px] mx-auto max-h-[calc(100vh-3rem)]">
        <div className="absolute top-4 right-4 text-2xl text-primary cursor-pointer select-none" onClick={() => setCardVisible(false)}>
          <FaXmark />
        </div>

        <span className="text-xl font-medium my-4 block">Channels: </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
          {
            channels?.map(channel => <ChannelCard key={channel?._id} channel={channel} />)
          }
        </div>
      </div>
    </div>
  );
}

const PackageCard = ({packageObj}) => {
  const [cardVisible, setCardVisible] = useState(false);
  const { name, price, channels } = packageObj;

  return (
    <div
      className={`bg-bg-color px-6 py-8 rounded-lg text-center`}
    >
      <span className="block text-primary font-bold uppercase mb-2">
        {name}
      </span>
      <div className="flex justify-center items-center gap-2 sm:gap-4 mb-4">
        <span className="text-5xl sm:text-[40px] md:text-5xl lg:text-[40px] xl:text-5xl font-bold">
          {price}&#2547;
        </span>
        <span className="font-medium text-xl">/ month</span>
      </div>
      
      <button type="button" className="flex justify-center items-center gap-1 mx-auto mb-4 text-primary font-semibold" onClick={() => setCardVisible(true)}>
        <MdOutlineRemoveRedEye /> {packageObj.channels.length} Channels
      </button>
      <ChannelsCard channels={channels} cardVisible={cardVisible} setCardVisible={setCardVisible} />

      <Link className="btn btn-primary">
        Buy Now
      </Link>
    </div>
  );
};

export default function OnlineStreamPackages() {
  const axiosPublic = useAxiosPublic();
  const {data: packages} = useQuery({
    queryKey: ['stream-packages'],
    queryFn: async() => {
      const res = await axiosPublic('/stream-packages');
      return res.data;
    }
  })

  return (
    <section className="mt-12 lg:mt-16">
      <div className="container">
        <h2 className="text-4xl font-semibold text-primary text-center mb-2">
          Online Stream Packages
        </h2>
        <p className="text-center w-full max-w-[550px] mx-auto mb-8">
          We are offering you a various types of packages where many different types of channels available in different packages.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-6">
          {
            packages?.map(packageObj => <PackageCard key={packageObj._id} packageObj={packageObj}  />)
          }
        </div>
      </div>
    </section>
  );
}

ChannelsCard.propTypes = {
  channels: PropTypes.array,
  cardVisible: PropTypes.bool,
  setCardVisible: PropTypes.func
}
PackageCard.propTypes = {
  packageObj: PropTypes.object
};