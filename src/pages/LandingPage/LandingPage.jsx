
import "./LandingPage.css";

import React, { useContext, useState, useEffect } from 'react';
// import HERO_IMG from '../../assets/hero-img.png';
import { APP_FEATURES } from '../../utils/data';
// import { useNavigate } from 'react-router-dom';
import { LuSparkles } from "react-icons/lu";
import Model from '../../components/Model';
import SignUp from '../Auth/SignUp';
import { Icon } from "@iconify/vue";
import Login from '../Auth/Login';
import ProfileInfoCard from '../../components/Cards/ProfileInfoCard';
import { UserContext } from '../../context/useContext';
import GotoDashboardCard from '../GotoDashboardCard';

import { createIcons, icons } from "lucide";
import LandingParticles from '../../components/LandingParticles';

const LandingPage = () => {


  useEffect(() => {
    createIcons({ icons });
  }, []);

  const { user } = useContext(UserContext);
  // const navigate = useNavigate();
  const [gotoDashboard, setGotoDashboard] = useState(true);

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
    <div className="font-sans text-gray-200 overflow-x-hidden">
     
      <header className="fixed top-0 w-full z-10 px-4 md:px-8 py-3 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 text-xl font-bold text-white">
            <span>🌌</span>
            <span className="tracking-tight font-bold text-[1.3rem] sm:text-[1.45rem] text-white group">
              <span className="text-[#00ffe0] drop-shadow-[0_0_6px_#00ffe077] group-hover:animate-pulse">Prep</span>
              <span className="text-white/90">Pilot</span>
            </span>
          </div>
          {user ? (
            <ProfileInfoCard />
          ) : (
            <button className="inline-flex items-center gap-2 bg-[#12121e99] text-[#00ffe0] border border-[#00ffe055] px-5 py-2 text-[0.95rem] rounded-full font-medium cursor-pointer backdrop-blur-md shadow-[0_0_6px_rgba(0,255,224,0.15)] hover:bg-[#1e1e32cc] hover:text-white hover:border-[#00ffe0] hover:shadow-[0_0_12px_rgba(0,255,224,0.4)] hover:-translate-y-0.5 transition-all duration-300" onClick={() => setOpenAuthModal(true)}>
              <i data-lucide="log-in" className="w-4 h-4"></i>
              <span className="hidden sm:inline">Login / Sign Up</span>
            </button>
          )}
          
        </div>
      </header>

      <section className="hero-gradient min-h-screen flex flex-col items-center justify-center py-8 px-4 animate-[heroShift_20s_ease-in-out_infinite] relative z-0">
        <LandingParticles />
        <div className="relative z-10 text-center px-4 max-w-3xl">

          {/* AI Tagline */}
        <p className="text-sm uppercase tracking-wider text-white mb-3 font-semibold">
          <span className="text-[#00ffe0] drop-shadow-[0_0_6px_#00ffe066]">Powered by AI.</span> Personalized for You.
        </p>


          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-[0_0_12px_#00ffe033]">
            <span className="text-slate-300">Introducing</span>{" "}
            <span className="text-[#00ffe0] drop-shadow-[0_0_8px_#00ffe077]">PrepPilot</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-slate-300 mb-6">
            Powered by AI, PrepPilot crafts personalized mock interviews based on your experience, goals, and skills — helping you prepare for every question before it’s ever asked.
          </p>

          {/* Feature List with Lucide Icons */}
          <ul className="flex justify-center flex-wrap gap-3 mb-6 text-[#a5f3fc]">
            <li className="bg-white/10 px-4 py-2 rounded-xl text-sm backdrop-blur-sm flex gap-2 items-center text-[#7dd3fc]">
              <i data-lucide="sparkles" className="w-4 h-4 drop-shadow-[0_0_4px_#7dd3fc77]"></i>
              AI-Powered Simulations
            </li>
            <li className="bg-white/10 px-4 py-2 rounded-xl text-sm backdrop-blur-sm flex gap-2 items-center text-[#7dd3fc]">
              <i data-lucide="badge-percent" className="w-4 h-4 drop-shadow-[0_0_4px_#7dd3fc77]"></i>
              Role & Skill-Based Questions
            </li>
            <li className="bg-white/10 px-4 py-2 rounded-xl text-sm backdrop-blur-sm flex gap-2 items-center text-[#7dd3fc]">
              <i data-lucide="message-circle-question" className="w-4 h-4 drop-shadow-[0_0_4px_#7dd3fc77]"></i>
              Interactive Answer Feedback
            </li>
          </ul>


          {/* CTA Button */}
          <button className="bg-[#12121ebf] text-[#00ffe0] border-2 border-[#00ffe0] font-semibold px-7 py-3 text-[1.05rem] rounded-full cursor-pointer shadow-[0_0_8px_rgba(0,255,224,0.25)] hover:bg-[#1e1e32e6] hover:text-white hover:shadow-[0_0_16px_rgba(0,255,224,0.5)] hover:-translate-y-0.5 transition-all duration-300 text-shadow-[0_0_6px_rgba(0,255,224,0.3)]" onClick={handleCTA}>
            Get Started
          </button>

          {/* Social Proof Line */}
          <p className="text-sm text-[#cbd5e1] mt-4 italic">
            Thousands of mock interviews generated — and counting.
          </p>


        </div>
      </section>

      <div className={`${gotoDashboard ? 'flex' : 'hidden'} fixed inset-0 flex z-100 items-center justify-center w-full h-full bg-black/40 `} onClick={() => setGotoDashboard(false)}>
        <GotoDashboardCard gotoDashboard={gotoDashboard}/>
        </div>




      <section className="py-20 px-8 bg-[#12121e99] backdrop-blur-md border border-white/5 shadow-[0_6px_24px_rgba(0,0,0,0.4)] text-center max-w-[1100px] mx-auto my-16 rounded-[20px]">
        <div className="max-w-[1100px] mx-auto">
          <h2 className="text-3xl mb-12 text-slate-100">Why PrepPilot?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="bg-[#1e1e28cc] border border-white/5 rounded-2xl p-8 text-slate-200 backdrop-blur-md shadow-[0_6px_20px_rgba(0,255,255,0.04)] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,255,255,0.08)] transition duration-300">
              <div className="text-[#00ffe0] drop-shadow-[0_0_4px_#00ffe088] mb-4">
                <i data-lucide="brain" className="w-8 h-8 mx-auto"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Interview Simulation</h3>
              <p className="text-sm text-slate-300">
                AI generates tailored interview questions based on your role, experience, and skills—just like a real recruiter would.
              </p>
            </div>
            <div className="bg-[#1e1e28cc] border border-white/5 rounded-2xl p-8 text-slate-200 backdrop-blur-md shadow-[0_6px_20px_rgba(0,255,255,0.04)] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,255,255,0.08)] transition duration-300">
              <div className="text-[#00ffe0] drop-shadow-[0_0_4px_#00ffe088] mb-4">
                <i data-lucide="notebook-pen" className="w-8 h-8 mx-auto"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Interactive Practice Mode</h3>
              <p className="text-sm text-slate-300">
                Answer live questions, get feedback, expand responses, and deepen your understanding with AI-backed coaching.
              </p>
            </div>
            <div className="bg-[#1e1e28cc] border border-white/5 rounded-2xl p-8 text-slate-200 backdrop-blur-md shadow-[0_6px_20px_rgba(0,255,255,0.04)] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,255,255,0.08)] transition duration-300">
              <div className="text-[#00ffe0] drop-shadow-[0_0_4px_#00ffe088] mb-4">
                <i data-lucide="bar-chart-3" className="w-8 h-8 mx-auto"></i>
              </div>
              <h3 className="text-lg font-semibold mb-2">Progress Insights</h3>
              <p className="text-sm text-slate-300">
                Track your performance, identify weak areas, and sharpen your skills with detailed feedback and analytics.
              </p>
            </div>
          </div>
        </div>
      </section>


      <section className="py-16 px-6 bg-[#12121e99] backdrop-blur-md border border-white/5 shadow-[0_6px_24px_rgba(0,0,0,0.4)] text-[#f1f5f9] max-w-[1100px] mx-auto my-16 rounded-xl">
        <div className="max-w-[1100px] mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-white">What Our Users Say</h2>
          <div className="flex flex-col md:flex-row gap-6 md:justify-between">
            {[
              {
                text: `"PrepPilot helped me land my first tech internship. The AI questions felt like the real thing!"`,
                user: "Aarav M.",
                title: "CS Student @ NIT Surat",
                img: "https://i.pravatar.cc/100?img=12"
              },
              {
                text: `"I used PrepPilot to prep for senior backend roles—it challenged me exactly where I needed to grow."`,
                user: "Sneha R.",
                title: "Software Engineer @ Zomato",
                img: "https://i.pravatar.cc/100?img=48"
              },
              {
                text: `"It’s like having a personal coach for interviews. The mock exams and follow-up feedback are gold."`,
                user: "Karan J.",
                title: "Full Stack Dev @ Freelance",
                img: "https://i.pravatar.cc/100?img=27"
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-6 md:w-[30%] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-transform hover:-translate-y-1"
              >
                <p className="text-base leading-relaxed text-slate-300 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 mt-6">
                  <img
                    src={t.img}
                    alt={t.user}
                    className="w-10 h-10 rounded-full border border-white/10 shadow-sm"
                  />
                  <div className="text-left">
                    <div className="text-sm font-medium text-white">{t.user}</div>
                    <div className="text-xs text-slate-400">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-8 bg-[#12121e99] backdrop-blur-md border border-white/5 shadow-[0_6px_24px_rgba(0,0,0,0.4)] text-[#f1f5f9] text-center max-w-[1100px] mx-auto my-16 rounded-xl">
        <h2 className="text-2xl md:text-3xl font-semibold mb-12">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-[1000px] mx-auto">
          
          <div className="bg-[#1e1e28cc] border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-[0_6px_20px_rgba(0,255,255,0.04)]">
            <div className="text-[#7dd3fc] mb-4">
              <i data-lucide="user-search" className="w-8 h-8 mx-auto drop-shadow-[0_0_4px_#7dd3fc88]"></i>
            </div>
            <div className="text-lg font-semibold text-white mb-2">1. Set Your Interview Goal</div>
            <div className="text-sm text-slate-300">
              Choose the role you're targeting, your experience level, and the tech skills you want to focus on.
            </div>
          </div>

          <div className="bg-[#1e1e28cc] border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-[0_6px_20px_rgba(0,255,255,0.04)]">
            <div className="text-[#7dd3fc] mb-4">
              <i data-lucide="brain-cog" className="w-8 h-8 mx-auto drop-shadow-[0_0_4px_#7dd3fc88]"></i>
            </div>
            <div className="text-lg font-semibold text-white mb-2">2. Practice with AI</div>
            <div className="text-sm text-slate-300">
              PrepPilot generates custom interview questions, simulates live sessions, and helps you answer with confidence.
            </div>
          </div>

          <div className="bg-[#1e1e28cc] border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-[0_6px_20px_rgba(0,255,255,0.04)]">
            <div className="text-[#7dd3fc] mb-4">
              <i data-lucide="bar-chart-4" className="w-8 h-8 mx-auto drop-shadow-[0_0_4px_#7dd3fc88]"></i>
            </div>
            <div className="text-lg font-semibold text-white mb-2">3. Track & Improve</div>
            <div className="text-sm text-slate-300">
              Get real-time feedback, identify weak spots, and monitor your progress as you get closer to interview-ready.
            </div>
          </div>

        </div>
      </section>

      <section className="py-20 px-8 bg-[#12121e99] backdrop-blur-md border border-white/5 shadow-[0_6px_24px_rgba(0,0,0,0.4)] text-[#f1f5f9] text-center max-w-[1100px] mx-auto my-16 rounded-xl">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">🎤 Try a Demo Interview</h2>
        <p className="text-slate-300 max-w-xl mx-auto mb-10 text-sm md:text-base">
          Select a role and skillset to preview the kind of questions PrepPilot generates for you.
        </p>
        <div className="bg-[#1e1e28cc] border border-white/10 rounded-2xl p-6 backdrop-blur-md max-w-2xl mx-auto text-left shadow-[0_6px_20px_rgba(0,255,255,0.04)]">
          <div className="text-xs text-sky-300 font-medium mb-2">Frontend Developer — 2 Years</div>
          <div className="text-base text-white font-semibold mb-2">🧠 What is the virtual DOM in React, and how does it improve performance?</div>
          <p className="text-sm text-slate-400">
            This is an example of how PrepPilot generates technical questions tailored to your experience and focus.
          </p>
        </div>
        <button className="mt-6 inline-flex items-center gap-2 bg-[#12121e99] text-[#00ffe0] border border-[#00ffe055] px-5 py-2 text-[0.95rem] rounded-full font-medium cursor-pointer backdrop-blur-md shadow-[0_0_6px_rgba(0,255,224,0.15)] hover:bg-[#1e1e32cc] hover:text-white hover:border-[#00ffe0] hover:shadow-[0_0_12px_rgba(0,255,224,0.4)] hover:-translate-y-0.5 transition-all duration-300">
          Generate Another
        </button>
      </section>

      <section className="py-20 px-8 bg-[#12121e99] backdrop-blur-md border border-white/5 shadow-[0_6px_24px_rgba(0,0,0,0.4)] text-[#f1f5f9] text-center max-w-[1100px] mx-auto my-16 rounded-xl">
        <h2 className="text-2xl md:text-3xl font-semibold mb-10">❓ Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
          <div>
            <h3 className="text-white font-semibold text-base mb-2">Who is PrepPilot for?</h3>
            <p className="text-sm text-slate-400">Whether you’re a fresher, mid-level dev, or switching domains—PrepPilot adapts to your goals.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-base mb-2">What kind of questions will I get?</h3>
            <p className="text-sm text-slate-400">AI-generated role-specific technical, behavioral, and system design questions based on your inputs.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-base mb-2">Is PrepPilot free to use?</h3>
            <p className="text-sm text-slate-400">Yes! You can get started for free. Advanced features may be part of future premium plans.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold text-base mb-2">Can I track my progress?</h3>
            <p className="text-sm text-slate-400">Yes, PrepPilot gives you performance insights and lets you revisit previous sessions.</p>
          </div>
        </div>
      </section>


      <footer className="bg-[#0b0b12] text-[#a1a1aa] py-12 text-center border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col gap-6 items-center">
          <div className="text-white text-lg font-semibold flex items-center gap-2">
            ✨ PrepPilot
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
            <a href="#" className="hover:text-white">LinkedIn</a>
            <a href="#" className="hover:text-white">GitHub</a>
          </div>
          <div className="text-xs text-[#6b7280]">© 2025 PrepPilot. All rights reserved.</div>
        </div>
      </footer>


      <Model
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
          {currentPage === "login" && (
            <Login setCurrentPage={setCurrentPage} openAuthModel={setOpenAuthModal} />
          )}
          {currentPage === "signup" && (
            <SignUp setCurrentPage={setCurrentPage} openAuthModel={setOpenAuthModal}  />
          )}
      </Model>
    </div>
  );
}

export default LandingPage