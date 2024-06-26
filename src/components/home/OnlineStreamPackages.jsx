import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import {MdOutlineRemoveRedEye} from 'react-icons/md';
import {FaXmark} from 'react-icons/fa6';
import { useState } from "react";
import ChannelCard from "../channels/ChannelCard";
import useAllContext from "../../hooks/useAllContext";
import Swal from "sweetalert2";

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

const PackagePurchase = ({packageObj, purchaseVisible, setPurchaseVisible}) => {
  const {user} = useAllContext();
  const axiosPublic = useAxiosPublic();

  const handleStreamPackagePurchase = e => {
    e.preventDefault();

    const email = e.target.email.value;
    const data = {
      package_id: packageObj?._id,
      user_email: email
    };
    axiosPublic.post('/payment-init', data)
      .then(res => {
        if (res.data?.status === "ok") {
          window.location.replace(res.data?.url);
        } else if (res.data?.status === "user doesn't exist!") {
          setPurchaseVisible(false);
          Swal.fire({
            title: "Error!",
            text: "No user available with this email.",
            icon: "error",
            confirmButtonColor: "#263791"
          });
        }
      });
  }

  return (
    <div className="justify-center items-center fixed inset-0 bg-[rgba(0,0,0,0.7)] z-50 p-6" style={purchaseVisible ? {display: "flex"} : {display: "none"}}>
      <div className="bg-white dark:bg-gray-700 rounded-lg p-8 relative overflow-auto w-full max-w-[500px] mx-auto max-h-[calc(100vh-3rem)]">
        <div className="absolute top-4 right-4 text-2xl text-primary cursor-pointer select-none" onClick={() => setPurchaseVisible(false)}>
          <FaXmark />
        </div>

        <div className="text-left">
          <h2 className="text-center text-2xl font-medium mb-6">Buy Package</h2>
          <h4 className="text-[18px] font-medium mb-2">Package Details:</h4>
          <p><span className="font-medium">Package Name: </span> {packageObj?.name}</p>
          <p><span className="font-medium">Price: </span> {packageObj?.price} taka</p>
          <p><span className="font-medium">Duration: </span> 1 month</p>
          <p><span className="font-medium">Total Channels: </span> {packageObj?.channels?.length}</p>

          <form className="mt-6" onSubmit={handleStreamPackagePurchase}>
            <label htmlFor="email" className="font-medium block mb-2">Purchasing For (Email)</label>
            <input className="input w-full border border-gray-300 mb-4 dark:text-black" type="email" name="email" id="email" placeholder="Enter your account's email" defaultValue={user?.email || ''} required />
            <button type="submit" className="btn btn-primary">Pay Now</button>
          </form>
        </div>
      </div>
    </div>
  );
}

const PackageCard = ({packageObj}) => {
  const [cardVisible, setCardVisible] = useState(false);
  const [purchaseVisible, setPurchaseVisible] = useState(false);
  const { name, price, duration, channels } = packageObj;

  return (
    <div
      className={`bg-bg-color dark:bg-gray-700 px-6 py-8 rounded-lg text-center`}
    >
      <span className="block text-primary font-bold uppercase mb-2">
        {name}
      </span>
      <div className="flex justify-center items-center gap-2 sm:gap-4 mb-4">
        <span className="text-5xl sm:text-[40px] md:text-5xl lg:text-[40px] xl:text-5xl font-bold">
          {price}&#2547;
        </span>
        <span className="font-medium text-xl">/ {duration} days</span>
      </div>
      
      <button type="button" className="flex justify-center items-center gap-1 mx-auto mb-4 text-primary font-semibold" onClick={() => setCardVisible(true)}>
        <MdOutlineRemoveRedEye /> {packageObj.channels.length} Channels
      </button>
      <ChannelsCard channels={channels} cardVisible={cardVisible} setCardVisible={setCardVisible} />

      <button type="button" className="btn btn-primary" onClick={() => setPurchaseVisible(true)}>Buy Now</button>
      <PackagePurchase packageObj={packageObj} purchaseVisible={purchaseVisible} setPurchaseVisible={setPurchaseVisible} />
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
PackagePurchase.propTypes = {
  packageObj: PropTypes.object,
  purchaseVisible: PropTypes.bool,
  setPurchaseVisible: PropTypes.func
}
PackageCard.propTypes = {
  packageObj: PropTypes.object
};