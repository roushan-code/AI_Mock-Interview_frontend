import { useNavigate } from 'react-router-dom';

const GotoDashboardCard = ({gotoDashboard}) => {
    if (!gotoDashboard) return null;
    const navigate = useNavigate();


  return (          
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[80%] m-auto md:max-w-[47rem] " >
    
                      {/* AI Powered Learning Card */}
                      <div className="bg-[linear-gradient(30deg,#000000_0%,#151229_100%)] flex flex-col justify-around gap-1.5 border border-purple-600 rounded-2xl p-8 shadow-lg hover:shadow-purple-600 transition duration-300">
                        <div className="flex flex-col items-start mb-4 mt-4">
    
                          <span className="text-purple-400 border border-[#970DE7] rounded-full p-2 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth={1.5} d="m6 14l7-12v8h5l-7 12v-8z"></path></svg>
                          </span>
    
                          <h2 className="text-[2.5rem] text-white font-semibold leading-12 ">Interviews with <br/><span className="text-transparent bg-clip-text bg-[linear-gradient(124deg,rgba(156,44,247,1)_0%,rgba(96,0,240,1)_100%)] animate-text-shine font-semibold">AI-Powered</span> Learning</h2>
                        </div>
                        <p className="text-[#BDBBBB] mb-6">Navigate through role-specific questions, answer guidance, and personalized insights.</p>
                        <button
                          onClick={() => navigate('/dashboard/ai-learning')}
                          className="bg-[#21197A] hover:bg-purple-700 px-6 py-3 rounded-xl text-white w-full cursor-pointer transition duration-300"
                        >
                          Go to Dashboard
                        </button>
                      </div>
                      {/* Custom Mock Test Card */}
                      <div className="bg-[linear-gradient(30deg,#000000_0%,#151229_100%)] flex flex-col justify-around gap-1.5 border border-cyan-600 rounded-2xl p-8 shadow-lg hover:shadow-cyan-600 transition duration-300">
                        <div className="flex flex-col items-start mb-4 mt-4">
                          <span className="text-cyan-400 text-2xl border border-cyan-400 rounded-full p-2 mr-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 512 512"><path fill="currentColor" d="m362.7 19.3l-48.4 48.4l130 130l48.4-48.4c25-25 25-65.5 0-90.5l-39.4-39.5c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2c-2.5 8.5-.2 17.6 6 23.8s15.3 8.5 23.7 6.1L151 475.7c14.1-4.2 27-11.8 37.4-22.2l233.3-233.2z"></path></svg>
                          </span>
                          <h2 className="text-[2.5rem] text-white font-semibold leading-12">Custom Course-Oriented Mock Tests</h2>
                        </div>
                        <p className="text-[#BDBBBB] mb-6">Enter your course, go through a mock interview, and practice under a timer.</p>
                        <button
                          onClick={() => navigate('/dashboard/mock-test')}
                          className="bg-[#21197A] hover:bg-[oklch(0.63_0.16_228.26)] px-6 py-3 rounded-xl text-white w-full cursor-pointer transition duration-300"
                        >
                          Take Mock Test
                        </button>
                      </div>
    
                    </div>
    
                  
  )
}

export default GotoDashboardCard