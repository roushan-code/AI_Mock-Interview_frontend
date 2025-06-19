import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/input';
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
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
      <h3 className="text-lg font-semibold text-black">Welcome Back</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Please enter your details to log in
      </p>
      <form onSubmit={handleLogin}>
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
        />
        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
        />
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
        <button type="submit" className="btn-primary">
          LOGIN
        </button>
        <p className="text-[13px] ☐ text-slate-800 mt-3">
          Don't have an account?{""}
          <button
            className="font-medium Itext-primary underline cursor-pointer"
            onClick={() => {
              setCurrentPage("signup");
            }}

          >
            {" "} Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login