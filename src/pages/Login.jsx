import { Helmet } from "react-helmet-async";
import loginImg from '../assets/login.png';
import HeaderBanner from "../components/shared/HeaderBanner";
import { auth } from "../firebase/firebase.config";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import useAllContext from "../hooks/useAllContext";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";

export default function Login() {
  const axiosPublic = useAxiosPublic();
  const {setUser} = useAllContext();
  const [showPass, setShowPass] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  const handleLogin = e => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        axiosPublic(`/login?email=${userCredential?.user?.email}`, {withCredentials: true})
          .then(res => {
            let currentUser = userCredential.user;
            currentUser.name = res.data.name;
            currentUser.phone = res.data.phone;
            setUser(currentUser);

            Swal.fire({
              title: "Successful",
              text: "Your account logged in successfully",
              icon: "success",
              iconColor: "#263791",
              confirmButtonColor: "#263791"
            });
          })
      })
      .catch(error => {
        if (error.code === "auth/invalid-credential") setErrorMsg("Invalid email or password")
        else setErrorMsg(error.code);
      })
  };
  const handleForgetPassword = () => {
    if (inputEmail) {
      Swal.fire({
        title: "Reset Password",
        text: "Are you sure to get email to reset your password?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#263791",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Sure!"
      }).then((result) => {
        if (result.isConfirmed) {
          sendPasswordResetEmail(auth, inputEmail)
            .then(() => {
              Swal.fire({
                title: "Email Sent",
                text: "Email sent successfully. Please check your inbox.",
                icon: "success",
                iconColor: "#263791",
                confirmButtonColor: "#263791"
              })
            })
            .catch(error => {
              Swal.fire({
                title: "Error!",
                text: error.code,
                icon: "error",
                confirmButtonColor: "#263791"
              })
            })
        }
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Enter your email to the email input field.",
        icon: "error",
        confirmButtonColor: "#263791"
      })
    }
  }

  return (
    <main>
      <Helmet>
        <title>Login - Akash Media</title>
        <meta name="description" content="This is Akash Media's login page. Existing user can login and use our services from our platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Login - Akash Media" />
        <meta property="og:description" content="This is Akash Media's login page. Existing user can login and use our services from our platform." />
        <meta property="og:image" content="https://akashmedia.net/assets/akash-media-YAYuS5Eg.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.akashmedia.net/login" />
      </Helmet>

      <HeaderBanner text='Login' />

      <section className="mt-12 lg:mt-16">
        <div className="container">
          <div className="flex justify-center items-center gap-8 [&>*]:flex-1" >
            <div className="hidden md:block">
              <img src={loginImg} alt="Login Image" className="w-full max-w-[450px] mx-auto" />
            </div>

            <form className="bg-bg-color px-6 py-8 rounded-lg" onSubmit={handleLogin}>
              <h2 className="text-3xl font-semibold text-primary text-center mb-6">Login</h2>

              <label htmlFor="email" className="block font-medium mb-2">Email</label>
              <input className="input w-full mb-4 border-gray-300" onChange={e => {
                setErrorMsg("");
                setInputEmail(e.target.value);
              }} type="email" name="email" id="email" placeholder="Enter your email" required />

              <label htmlFor="password" className="block font-medium mb-2">Password</label>
              <div className="relative mb-3">
                <input className="input w-full border-gray-300" onChange={e => {
                  setErrorMsg("");
                  e.target.value ? setShowEye(true) : setShowEye(false);
                }} type={showPass ? "text" : "password"} name="password" id="password" placeholder="Enter your password" required />
                {
                  showEye && <div className="absolute top-1/2 right-4 -translate-y-1/2 text-xl cursor-pointer select-none" onClick={() => setShowPass(!showPass)}>
                    {
                      showPass ? <FaEyeSlash /> : <FaEye />
                    }
                  </div>
                }
              </div>

              <button type="button" className="text-primary font-medium" onClick={handleForgetPassword}>Forget Password?</button>

              {
                errorMsg && <p className="mt-4 text-red-600 font-semibold">{errorMsg}</p>
              }

              <button className="btn btn-primary btn-block mt-5" type="submit">Login</button>

              <p className="mt-4">Don&apos;t have an account? <Link to="/register" className="font-medium text-primary">Register Now</Link></p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
