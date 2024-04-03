import { Helmet } from "react-helmet-async";
import HeaderBanner from "../components/shared/HeaderBanner";
import loginImg from '../assets/login.png';
import useAllContext from "../hooks/useAllContext";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";

export default function Register() {
  const axiosPublic = useAxiosPublic();
  const {setUser} = useAllContext();
  const [showPass, setShowPass] = useState(false);
  const [showEye, setShowEye] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [buttonActive, setButtonActive] = useState(false);

  const handleRegister = e => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            const document = {
              uid: userCredential.user.uid,
              name, email, phone,
              packages: []
            }
            axiosPublic.post('/user', document, {withCredentials: true})
              .then(res => {
                if (res.data?.insertedId) {
                  let currentUser = userCredential.user;
                  currentUser.name = name;
                  currentUser.phone = phone;
                  currentUser.packages = [];
                  setUser(currentUser);
    
                  Swal.fire({
                    title: "Registration Successful!",
                    text: "Please check your inbox and verify your account.",
                    icon: "success",
                    iconColor: "#263791",
                    confirmButtonColor: "#263791"
                  });
                }
              })
          })
      })
      .catch((error) => setErrorMsg(error.code))
  }

  const onPassChange = e => {
    const password = e.target.value;

    setButtonActive(false);
    setErrorMsg("");
    if (password) setShowEye(true);
    else setShowEye(false);

    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters!");
      return;
    }
    else if (!/[A-Z]/.test(password)) {
      setErrorMsg("At least one uppercase character required!");
      return;
    }
    else if (!/[0-9]/.test(password)) {
      setErrorMsg("At least one number required!");
      return;
    }
    else if (!/[^A-Za-z0-9]/.test(password)) {
      return setErrorMsg("At least one special character required!");
    }
    setButtonActive(true);
  }

  return (
    <main>
      <Helmet>
        <title>Register - Akash Media</title>
        <meta name="description" content="This is Akash Media's register page. New user can register here and enjoy our services from our platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Register - Akash Media" />
        <meta property="og:description" content="This is Akash Media's register page. New user can register here and enjoy our services from our platform." />
        <meta property="og:image" content="https://akashmedia.net/assets/akash-media-YAYuS5Eg.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.akashmedia.net/register" />
      </Helmet>

      <HeaderBanner text='Register' />

      <section className="mt-12 lg:mt-16">
        <div className="container">
          <div className="flex justify-center items-center gap-8 [&>*]:flex-1" >
            <form className="bg-bg-color px-6 py-8 rounded-lg" onSubmit={handleRegister}>
              <h2 className="text-3xl font-semibold text-primary text-center mb-6">Register</h2>

              <label htmlFor="name" className="block font-medium mb-2">Name</label>
              <input className="input w-full mb-4 border-gray-300" type="text" name="name" id="name" placeholder="Enter your name" required />

              <label htmlFor="email" className="block font-medium mb-2">Email</label>
              <input className="input w-full mb-4 border-gray-300" type="email" name="email" id="email" placeholder="Enter your email" required />

              <label htmlFor="phone" className="block font-medium mb-2">Phone Number</label>
              <input className="input w-full mb-4 border-gray-300" type="tel" name="phone" id="phone" placeholder="Enter your phone number" required />

              <label htmlFor="password" className="block font-medium mb-2">Password</label>
              <div className="relative">
                <input className="input w-full border-gray-300" onChange={onPassChange} type={showPass ? "text" : "password"} name="password" id="password" placeholder="Enter your password" required />
                {
                  showEye && <div className="absolute top-1/2 right-4 -translate-y-1/2 text-xl cursor-pointer select-none" onClick={() => setShowPass(!showPass)}>
                    {
                      showPass ? <FaEyeSlash /> : <FaEye />
                    }
                  </div>
                }
              </div>

              {
                errorMsg && <p className="mt-4 text-red-600 font-semibold">{errorMsg}</p>
              }

              <button className="btn btn-primary btn-block mt-5" type="submit" disabled={!buttonActive}>Register</button>

              <p className="mt-4">Already have an account? <Link to="/login" className="font-medium text-primary">Login Now</Link></p>
            </form>

            <div className="hidden md:block">
              <img src={loginImg} alt="Login Image" className="w-full max-w-[450px] mx-auto" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}