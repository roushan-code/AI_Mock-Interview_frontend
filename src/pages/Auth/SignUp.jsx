import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from '../../components/Inputs/input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector.jsx';
import { validateEmail } from "../../utils/helper.js";
import { UserContext } from "../../context/useContext.jsx";
import { API_PATHS } from "../../utils/apiPaths.js";
import axiosInstance from "../../utils/axiosInstance.js";


const SignUp = ({ setCurrentPage, openAuthModel }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { updateUser } = useContext(UserContext);

  // Handle Sign Up Form Submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profilePicUrl = "";

    if(!fullName) {
      setError("Please Enter Full Name ");
      return;
    }

    if(!validateEmail(email)) {
      setError("please enter a valid email");
      return;
    }
    if(!password) {
      setError("Password is required");
      return;
    }

    setError("");

    // Sing Up API call
    try{
      setIsLoading(true);
      const formData = new FormData();
      if(profilePic) {
        formData.append("image", profilePic);
        formData.append("name", fullName);
        formData.append("email", email);
        formData.append("password", password);
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
    
      const { token } = response.data;

      if(token) {
        // Update User Context
        localStorage.setItem("token", token);
        updateUser(response.data);
        openAuthModel(false)
      }

    } catch (err) {
      console.log(err);
      if(err.response && err.response.data.message) {
        setError(err.response.data.message);
      }else{
        setError("Something went wrong. Please try again.");
      } 
    }
    finally {
      setIsLoading(false);
    }
  };

  return <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center">
    <h3 className="text-lg font-semibold text-black">Create an Account</h3>

    <p className="text-xs text-slate-700 mt-[5px] mb-6">
      Join us today by entering your details below.
    </p>

    <form onSubmit={handleSignUp}>

      <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
      <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
        <Input
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
        label="Full Name"
        placeholder="John"
        type="text"
        />
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
      </div>
      {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
      <button type="submit" className={`btn-primary ${isLoading ? "opacity-50 cursor-not-allowed" : ""} `}>
        SIGN UP
      </button>

      <p className="text-[13px] text-slate-800 mt-3">
        Already have an account?
        <button className="font-medium text-primary underline cursor-pointer" onClick={() => {
          setCurrentPage("login");
        }}>
          {" "}Login
        </button>
      </p>
    </form>
  </div>;
      

};

      export default SignUp;