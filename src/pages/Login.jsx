import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {FaEye, FaEyeSlash} from 'react-icons/fa';

export default function Login() {
  const [showEye, setShowEye] = useState(true);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = e => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", e.target.username.value);
    data.append("password", e.target.password.value);
    data.append("type", e.target.type.value);

    console.log(data);
  }
  const handlePassOnChange = e => {
    const password = e.target.value;
    if (password) setShowEye(true);
    else setShowEye(false);
  }

  return (
    <main>
      <Helmet>
        <title>Login - Akash Media</title>
      </Helmet>

      <section className="mt-6">
        <div className="container">
          <form className="bg-primary bg-opacity-10 px-6 py-8 rounded-lg w-full max-w-[500px] mx-auto" onSubmit={handleLogin}>
            <h2 className="text-3xl font-semibold text-primary text-center mb-6">Login to your account</h2>
            <label className="block font-medium mb-2" htmlFor="username">Username</label>
            <input className="input w-full mb-4 border border-primary" type="text" name="username" id="username" placeholder="Enter your username" required />

            <label className="block font-medium mb-2" htmlFor="password">Password</label>
            <div className="relative mb-4">
              <input className="input w-full border border-primary" onChange={handlePassOnChange} type={showPass ? "text" : "password"} name="password" id="password" placeholder="Enter your password" required />
              {
                showEye ? showPass ? <FaEyeSlash className="absolute top-1/2 right-4 -translate-y-1/2 text-2xl cursor-pointer select-none" onClick={() => setShowPass(!showPass)} /> : <FaEye className="absolute top-1/2 right-4 -translate-y-1/2 text-2xl cursor-pointer select-none" onClick={() => setShowPass(!showPass)} /> : ''
              }
            </div>

            <label className="block font-medium mb-2" htmlFor="type">User Type</label>
            <select className="select w-full mb-5 border border-primary" name="type" id="type">
              <option value="User">User</option>
              <option value="Subscriber">Subscriber</option>
              <option value="Owner">Owner</option>
            </select>

            <button className="btn btn-primary btn-block" type="submit">Login</button>
          </form>
        </div>
      </section>
    </main>
  );
}