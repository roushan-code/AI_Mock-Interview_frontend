import  { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="w-full px-4 flex flex-col justify-center text-slate-200">
      <h3 className="text-xl font-semibold text-white mb-1">Create an Account</h3>

      <p className="text-sm text-slate-400 mb-6">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp} className="flex flex-col gap-5">
        {/* Profile Photo Upload */}
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        {/* Input Fields */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="fullname" className="text-sm font-medium text-slate-300">Full Name</label>
            <input
              id="fullname"
              type="text"
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              placeholder="John"
              className="bg-[#1e1e28] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00ffe0]/60 shadow-inner transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-slate-300">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              placeholder="john@example.com"
              className="bg-[#1e1e28] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00ffe0]/60 shadow-inner transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-slate-300">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder="Min 8 Characters"
              className="bg-[#1e1e28] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00ffe0]/60 shadow-inner transition"
            />
          </div>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-xs -mt-2">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full bg-[#00ffe0]/10 text-[#00ffe0] border border-[#00ffe0]/40 rounded-lg py-2.5 mt-2 font-semibold hover:bg-[#00ffe0]/20 hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(0,255,224,0.1)] ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          SIGN UP
        </button>

        {/* Login Switch */}
        <p className="text-sm text-slate-400 mt-4 text-center">
          Already have an account?
          <button
            type="button"
            className="text-[#00ffe0] font-medium underline ml-1 hover:text-white transition"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>

  );
      

};

      export default SignUp;