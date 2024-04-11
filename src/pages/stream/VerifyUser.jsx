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
    <main className="pb-12">
      <Helmet>
        <title>Verify User - Akash Media</title>
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