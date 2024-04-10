import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import crossCircleIcon from '../../assets/cross-circle.png';

export default function PaymentCancelled() {
  return (
    <main>
      <Helmet>
        <title>Payment Cancelled - Akash Media</title>
      </Helmet>

      <section className="mt-12 lg:mt-16 text-center">
        <div className="container">
          <img src={crossCircleIcon} alt="Cross Circle Icon" className="w-full max-w-[250px] mx-auto mb-4" />
          <h2 className="text-3xl font-medium text-yellow-500 mb-1">Payment Cancelled!</h2>
          <p className="w-full max-w-[550px] mx-auto mb-6">You cancelled your payment. You can pay again to purchase that package or can return home.</p>
          <div className="flex justify-center items-center gap-2">
            <Link to='/packages' className="btn btn-primary">Packages</Link>
            <Link to='/' className="btn btn-primary btn-outline border-2">Return Home</Link>
          </div>
        </div>
      </section>
    </main>
  );
}