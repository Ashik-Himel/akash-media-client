import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import loginImg from '../assets/login.png';
import HeaderBanner from "../components/shared/HeaderBanner";

export default function Login() {
  const [showEye, setShowEye] = useState(true);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", e.target.username.value);
    data.append("password", e.target.password.value);
    data.append("type", e.target.type.value);

    console.log(data);
  };
  const handlePassOnChange = (e) => {
    const password = e.target.value;
    if (password) setShowEye(true);
    else setShowEye(false);
  };

  return (
    <main>
      <Helmet>
        <title>Login - Akash Media</title>
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
              onSubmit={handleLogin}
            >
              <h2 className="text-3xl font-semibold text-primary text-center mb-6">
                Login to your account
              </h2>
              <label className="block font-medium mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="input w-full mb-4"
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                required
              />

              <label className="block font-medium mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative mb-4">
                <input
                  className="input w-full"
                  onChange={handlePassOnChange}
                  type={showPass ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                />
                {showEye ? (
                  showPass ? (
                    <FaEyeSlash
                      className="absolute top-1/2 right-4 -translate-y-1/2 text-2xl cursor-pointer select-none"
                      onClick={() => setShowPass(!showPass)}
                    />
                  ) : (
                    <FaEye
                      className="absolute top-1/2 right-4 -translate-y-1/2 text-2xl cursor-pointer select-none"
                      onClick={() => setShowPass(!showPass)}
                    />
                  )
                ) : (
                  ""
                )}
              </div>

              <label className="block font-medium mb-2" htmlFor="type">
                User Type
              </label>
              <select
                className="select w-full mb-5"
                name="type"
                id="type"
              >
                <option value="User">User</option>
                <option value="Subscriber">Subscriber</option>
                <option value="Owner">Owner</option>
              </select>

              <button className="btn btn-primary btn-block" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
