import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/useContext';

const Login = ({ setCurrentPage, openAuthModel  }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {updateUser} = useContext(UserContext);


  // Handle Login Form Submit
  const handleLogin = async (e) => {
    e.preventDefault();

    // Perform login logic here
    if (!validateEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    setError(null);

    // Login API call

    try {
      console.log(email, password);
      console.log(API_PATHS.AUTH.LOGIN);
      // console.log(axiosInstance);
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

    const { token } = response.data;
    if (token) {
    localStorage.setItem("token", token);
    updateUser(response.data);
    openAuthModel(false);
    } else {
      setError("Login failed. Please try again.");  
    }

    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="w-full px-4 flex flex-col justify-center text-slate-200">
      <h3 className="text-xl font-semibold text-white mb-1">Welcome Back</h3>
      <p className="text-sm text-slate-400 mb-6">
        Please enter your details to log in.
      </p>

      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-slate-300">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            className="bg-[#1e1e28] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00ffe0]/60 shadow-inner transition"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium text-slate-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Min 8 characters"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            className="bg-[#1e1e28] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00ffe0]/60 shadow-inner transition"
          />
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-xs -mt-3">{error}</p>}

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-[#00ffe0]/10 text-[#00ffe0] border border-[#00ffe0]/40 rounded-lg py-2.5 mt-2 font-semibold hover:bg-[#00ffe0]/20 hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(0,255,224,0.1)]"
        >
          LOGIN
        </button>

        {/* Switch to Signup */}
        <p className="text-sm text-slate-400 mt-4 text-center">
          Don’t have an account?
          <button
            type="button"
            className="text-[#00ffe0] font-medium underline ml-1 hover:text-white transition"
            onClick={() => setCurrentPage("signup")}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>


  );
};

export default Login