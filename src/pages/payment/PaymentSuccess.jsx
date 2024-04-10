import { Helmet } from "react-helmet-async";
import checkMark from '../../assets/check-mark.png';
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <main>
      <Helmet>
        <title>Payment Successful - Akash Media</title>
      </Helmet>

      <section className="mt-12 lg:mt-16 text-center">
        <div className="container">
          <img src={checkMark} alt="Check Mark" className="w-full max-w-[250px] mx-auto mb-4" />
          <h2 className="text-3xl font-medium text-primary mb-1">Payment Successful!</h2>
          <p className="w-full max-w-[550px] mx-auto mb-6">Your payment is successful. Now you are able to enjoy this package. Go to stream page and enjoy!</p>
          <div className="flex justify-center items-center gap-2">
            <Link to='/stream' className="btn btn-primary">Stream Now</Link>
            <Link to='/' className="btn btn-primary btn-outline border-2">Return Home</Link>
          </div>
        </div>
      </section>
    </main>
  );
}