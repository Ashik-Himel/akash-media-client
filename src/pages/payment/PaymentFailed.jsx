import { Helmet } from "react-helmet-async";
import warningIcon from '../../assets/warning.png';
import { Link } from "react-router-dom";

export default function PaymentFailed() {
  return (
    <main>
      <Helmet>
        <title>Payment Failed - Akash Media</title>
      </Helmet>

      <section className="mt-12 lg:mt-16 text-center">
        <div className="container">
          <img src={warningIcon} alt="Warning Icon" className="w-full max-w-[250px] mx-auto mb-4" />
          <h2 className="text-3xl font-medium text-red-600 mb-1">Payment Failed!</h2>
          <p className="w-full max-w-[550px] mx-auto mb-6">Your payment failed. You can purchase that package again by your successful payment.</p>
          <div className="flex justify-center items-center gap-2">
            <Link to='/packages' className="btn btn-primary">Packages</Link>
            <Link to='/' className="btn btn-primary btn-outline border-2">Return Home</Link>
          </div>
        </div>
      </section>
    </main>
  );
}