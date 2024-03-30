import { Helmet } from "react-helmet-async";
import loginImg from '../assets/login.png';
import HeaderBanner from "../components/shared/HeaderBanner";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { auth } from "../firebase/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState } from "react";
import useAllContext from "../hooks/useAllContext";
import Swal from "sweetalert2";

export default function Login() {
  const {setUser} = useAllContext();
  const [errorMsg, setErrorMsg] = useState("");
  const [number, setNumber] = useState(null);
  const [code, setCode] = useState(null);
  const [buttonText, setButtonText] = useState("Send Code");

  const onSendCode = () => {
    setErrorMsg("");

    if (number?.length != 13 || !number?.startsWith("8801")) {
      setErrorMsg("Enter a valid number!");
      return;
    }

    setButtonText(<div className="px-4">
      <span className="loading loading-spinner loading-md"></span>
    </div>);

    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'submit-button', {
      'size': 'invisible'
    });

    if (window?.recaptchaVerifier) {
      signInWithPhoneNumber(auth, "+" + number, window?.recaptchaVerifier)
        .then((confirmationResult) => {
          setButtonText("Code Sent!");
          window.confirmationResult = confirmationResult;
        }).catch(() => {
          setErrorMsg("SMS not sent!");
        });
    }
  }

  const handleLogin = () => {
    window.confirmationResult.confirm(code)
      .then((result) => {
        Swal.fire({
          title: "Successful",
          text: "Login Successful!",
          icon: "success",
          iconColor: "#263791",
          confirmButtonColor: "#263791"
        })
        setUser(result.user);
      }).catch(() => {
        setErrorMsg("Login Failed!")
      });
  };

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

            <form
              className="bg-bg-color px-6 py-8 rounded-lg"
              onSubmit={e => e.preventDefault()}
            >
              <h2 className="text-3xl font-semibold text-primary text-center mb-6">
                Login to your account
              </h2>
              <label className="block font-medium mb-2" htmlFor="phone">
                Phone Number
              </label>
              <PhoneInput
                country={'bd'}
                value={this?.state?.phone}
                onlyCountries={["bd"]}
                countryCodeEditable={false}
                autoFormat={false}
                onChange={phone => {
                  this?.setState({ phone });
                  setNumber(phone);
                  setErrorMsg("");
                }}
                inputProps={{
                  name: "phone",
                  id: "phone",
                  required: true
                }}
              />

              <label className="block font-medium mb-2 mt-4" htmlFor="code">
                Verification Code
              </label>
              <div className="relative">
                <input className="input w-full" type="number" name="code" id="code" placeholder="Enter code" required onChange={e => {
                  setCode(e.target.value);
                  setErrorMsg("");
                }} />
                <button className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer select-none text-primary font-semibold disabled:text-gray-600 disabled:cursor-not-allowed" type="button" onClick={onSendCode} disabled={buttonText !== "Send Code" ? "disabled" : ""}>{buttonText}</button>
              </div>

              {
                errorMsg && <p className="mt-4 text-red-600 font-semibold">{errorMsg}</p>
              }

              <button className="btn btn-primary btn-block mt-5" id="submit-button" type="submit" onClick={handleLogin}>
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
