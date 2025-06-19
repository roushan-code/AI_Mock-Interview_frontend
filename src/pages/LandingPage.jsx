import React, { useContext, useState } from 'react';
// import HERO_IMG from '../../assets/hero-img.png';
import { APP_FEATURES } from '../utils/data';
import { useNavigate } from 'react-router-dom';
import { LuSparkles } from "react-icons/lu";
import Model from '../components/Model';
import SignUp from './Auth/SignUp';
import { Icon } from "@iconify/vue";
import Login from './Auth/Login';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';
import { UserContext } from '../context/useContext';
import GotoDashboardCard from './GotoDashboardCard';

const LandingPage = () => {

  const { user } = useContext(UserContext);
  // const navigate = useNavigate();
  const [gotoDashboard, setGotoDashboard] = useState(false);

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      setGotoDashboard(true);
    }
  };
  return (
    <>
      <div className="w-full min-h-full  " >
        <div className="w-1/2 h-1/2 bg-[#281e64] blur-[65px] absolute top-0 left-0" />
        <div className="container mx-auto px-4 pt-6 pb-[200px] relative z-10" >
          {/* Header */}
          <header className="flex justify-between items-center mb-16">
            <div className="text-xl text-white font-bold">
              Interview Prep AI
            </div>
            {user ? (<ProfileInfoCard />) : (<button
              className="bg-[#2b0c50] hover:bg-[#21083f] rounded-[50px] shadow-[inset_4px_4px_10px_#442975,inset_-4px_-4px_10px_#000000] text-sm font-semibold text-[#dedede] px-7 py-2.5 hover:text-white   transition-colors cursor-pointer "
              onClick={() => setOpenAuthModal(true)}
            >
              Login / Sign Up
            </button>)}
          </header>
          {/* Hero Content */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
              <div className="flex items-center justify-left mb-2">
                <div className="flex items-center gap-2 text-[13px] text-white font-semibold border-[oklch(0.37_0_0)] px-3 py-1 rounded-full border  ">
                  <LuSparkles />AI Powered
                </div>
              </div>
              <h1 className="text-5xl text-white font-medium mb-6 leading-tight">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#ebc6ff_0%,_#6732ff_100%)] animate-text-shine font-semibold">

                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>

            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-[#dad0ef] mr-0 md:mr-20 mb-6">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery - your ultimate interview toolkit is
                here.
              </p>
              <button
                className="bg-[#0d0d2d] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-[#121240] hover:text-white border-[0.5px] border-[#4d2a63] transition-colors cursor-pointer"
                onClick={handleCTA}
              >
                Get Started
              </button>
              <div className={`${gotoDashboard ? 'flex' : 'hidden'} fixed inset-0 flex z-100 items-center justify-center w-full h-full bg-black/40 `} onClick={() => setGotoDashboard(false)}>
              <GotoDashboardCard gotoDashboard={gotoDashboard}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full min-h-full relative '>
        <div>
          <section className='flex items-center justify-center -mt-36'>
            <img src="{HERO_IMG}" alt="Hero Image" className='w-[80vw] rounded-lg' />
          </section>
        </div>

        <div className='w-full min-h-full bg-[#fffcef00] mt-10'>
          <div className='container mx-auto px-4 pt-10 pb-20'>
            <section className='mt-5'>
              <h2 className='text-2xl text-white font-medium mb-12 text-center'>
                Features That Make You Shine
              </h2>
              <div className='flex flex-col items-center gap-8'>
                {/* First 3 cards */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 w-full'>
                  {APP_FEATURES.slice(0, 3).map((feature) => (
                    <div key={feature.id} className="bg-[#1c1528] text-white p-6 rounded-xl ">
                      <h3 className="text-base text-white font-semibold mb-3">{feature.title}</h3>
                      <p className="text-[#C7C4CA]">{feature.description}</p>
                    </div>
                  ))}
                </div>
                {/* Remain 2 cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 '>
                  {APP_FEATURES.slice(3).map((feature) => (
                    <div key={feature.id} className=" p-6 rounded-xl bg-[#1c1528] text-white">
                      <h3 className="text-base font-semibold mb-3">{feature.title}</h3>
                      <p className="text-[#C7C4CA]">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div className='text-sm bg-transparent text-secondary text-gray-50 text-center p-5 mt-5'>
        Made with ❤️...Happy Coding!
      </div>


      <Model
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && (
            <Login setCurrentPage={setCurrentPage} openAuthModel={setOpenAuthModal} />
          )}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} openAuthModel={setOpenAuthModal}  />
          )}
        </div>
      </Model>

    </>
  )
}

export default LandingPage