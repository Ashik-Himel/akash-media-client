import { Helmet } from "react-helmet-async";
import useAllContext from "../../hooks/useAllContext";
import { Link } from "react-router-dom";
import profileIcon from '../../assets/profile-pic.png';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import PropTypes from 'prop-types';
import { format } from "date-fns";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

function ProfilePackageCard({pkg, email}) {
  const axiosPublic = useAxiosPublic();

  const handleStreamPackagePurchase = () => {
    const data = {
      package_id: pkg?._id,
      user_email: email
    };
    axiosPublic.post('/payment-init', data)
      .then(res => {
        if (res.data?.status === "ok") {
          window.location.replace(res.data?.url);
        } else if (res.data?.status === "package doesn't exist!") {
          Swal.fire({
            title: "Error!",
            text: "This package doesn't exist!",
            icon: "error",
            confirmButtonColor: "#263791"
          });
        }
      });
  }

  return (
    <div className="bg-bg-color p-4 rounded-lg">
      <h4 className="text-xl font-medium text-primary">{pkg?.name}</h4>
      <span className="block mb-2">{pkg?.price} taka / {pkg?.duration} days</span>
      {
        new Date(pkg?.expiredIn).getTime() > new Date().getTime() ? <span className="block mb-6"><span className="font-medium">Expire In:</span> <span className="text-nowrap">{format(pkg?.expiredIn, "dd MMM, yyyy  hh:mm aa")}</span></span> : <span className="block font-medium mb-6">Package Expired!</span>
      }
      <button className="btn btn-primary" onClick={handleStreamPackagePurchase}>Renew Package</button>
    </div>
  );
}

export default function UserProfile() {
  const {user, userLoaded} = useAllContext();
  const axiosSecure = useAxiosSecure();

  const {data: packages = []} = useQuery({
    queryKey: ["packages", user?.uid],
    queryFn: async() => {
      const res = await axiosSecure('/users-packages');
      return res.data;
    },
    enabled: userLoaded
  })

  return (
    <main className="mb-12">
      <Helmet>
        <title>My Profile - Akash Media</title>
      </Helmet>

      {
        !user?.emailVerified && <div className="bg-bg-color px-6 py-2 text-center font-medium">
          <p>Your account is not verified. Verify your account now! <Link to='/stream/verify-user' className="text-primary underline">Verify Now</Link></p>
        </div>
      }

      <section className="mt-12 text-center">
        <div className="container">
          <img src={user?.photoURL || profileIcon} alt="User's Profile" className="w-full max-w-[100px] mx-auto mb-4" />
          <h4 className="text-2xl font-medium mb-2">{user?.name}</h4>
          <span className="block mb-1"><span className="font-medium">Email:</span> {user?.email}</span>
          <span><span className="font-medium">Phone Number:</span> {user?.number}</span>
        </div>
      </section>

      <section className="mt-12 lg:mt-16">
        <div className="container">
          <div className="mb-6 flex items-center gap-4">
            <h2 className="text-2xl font-medium uppercase">My Packages</h2>
            <Link to='/packages' className="border-2 border-primary font-medium text-primary rounded-full px-2 py-px">Add Package</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {
              packages?.map(pkg => <ProfilePackageCard key={pkg?._id} pkg={pkg} email={user?.email} />)
            }
          </div>
        </div>
      </section>
    </main>
  );
}

ProfilePackageCard.propTypes = {
  pkg: PropTypes.object,
  email: PropTypes.string
}