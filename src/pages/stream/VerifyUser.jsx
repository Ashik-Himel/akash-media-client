import { Helmet } from "react-helmet-async";
import verifyEmailImg from '../../assets/verify-email.jpg';
import { sendEmailVerification, reload } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyUser() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleResendEmail = () => {
    reload(auth.currentUser)
      .then(() => {
        if (!auth.currentUser?.emailVerified) {
          sendEmailVerification(auth.currentUser)
          .then(() => {
            Swal.fire({
              title: "Email Sent!",
              text: "Please check your inbox and verify your account.",
              icon: "success",
              iconColor: "#263791",
              confirmButtonColor: "#263791"
            });
          })
        }
        else {
          Swal.fire({
            title: "Already Verified!",
            text: "Your account is already verified.",
            icon: "success",
            iconColor: "#263791",
            confirmButtonColor: "#263791"
          });
          navigate(state?.prevPath ? state?.prevPath : '/stream');
        }
      });
  }

  const onReload = () => {
    reload(auth.currentUser)
      .then(() => {
        if (auth.currentUser?.emailVerified) {
          navigate(state?.prevPath ? state?.prevPath : '/stream');
        }
      })
  }

  return (
    <main className="mb-8">
      <Helmet>
        <title>Verify User - Akash Media</title>
        <meta name="description" content="Akash Media is a Direct-to-Home (DTH) television service provider. We have 250+ channels with 80+ hd channels in competitive packages. You can get an easy connection from us." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Verify User - Akash Media" />
        <meta property="og:description" content="Akash Media is a Direct-to-Home (DTH) television service provider. We have 250+ channels with 80+ hd channels in competitive packages." />
        <meta property="og:image" content="https://akashmedia.net/assets/akash-media-YAYuS5Eg.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.akashmedia.net/stream/verify-user" />
      </Helmet>

      <section className="mt-12 lg:mt-16">
        <div className="container text-center">
          <img src={verifyEmailImg} alt="Verify Email Photo" className="w-full max-w-[400px] mx-auto mb-6" />
          <h2 className="text-3xl font-medium text-primary mb-4">Email Verification Required!</h2>
          <p className="max-w-[700px] mx-auto mb-6">To continue and enjoy our services, you have to verify your account. Please check your inbox for verification email. If you don&apos;t get any verification email, then click to &apos;Resend Email&apos; button to resend verification email.</p>
          <div className="flex justify-center items-center gap-4">
            <button type="button" className="btn btn-primary" onClick={handleResendEmail}>Resend Email</button>
            <button type="button" onClick={onReload} className="btn btn-primary btn-outline border-2">Refresh</button>
          </div>
        </div>
      </section>
    </main>
  );
}