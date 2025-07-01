import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa6";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";


const CreateSessionForm = () => {
    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: "",
        description: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleChange = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };
    const handleCreateSession = async (e) => {
        e.preventDefault();
        const { role, experience, topicsToFocus } = formData;
        if (!role || !experience || !topicsToFocus) {
            setError("Please fill all the required fields.");
            return;
        }
        setError(null);
        setIsLoading(true);

        // console.log(formData);
        try {
            // console.log("start creating");
            const aiResponse = await axiosInstance.post(
                API_PATHS.AI.GENERATE_QUESTIONS,
                {
                    role,
                    experience,
                    topicsToFocus,
                    numberOfQuestions: 10,
                }
            );
            // console.log(aiResponse);

            // Should be array like [{question: "", answer: ""}, ...]
            const responseData = aiResponse.data?.data;

            if (!responseData || !Array.isArray(responseData)) {
            throw new Error("Invalid response format from AI service");
        }

            const validatedQuestions = responseData.map(q => {
            if (!q.question || !q.answer) {
                throw new Error("Invalid question format in AI response");
            }
            return {
                question: q.question.trim(),
                answer: q.answer.trim()
            };
        });

            const response = await axiosInstance.post(
                API_PATHS.SESSION.CREATE,{
                    ...formData,
                questions: validatedQuestions,
                });

                if(response.data?.session?._id){
                    navigate(`/interview-prep/${response.data?.session._id}`);
                }
                setIsLoading(false);
        } catch (err) {
            // // console.log(err)
            if(err.response && err.response.data.message) {
                setError(err.response.data.message);
            }else {
                setError("An error occurred while creating the session.");
            }
        }finally {
            setIsLoading(false);
        }

    };
    return <div className="w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center ">
        <h3 className="text-lg font-semibold text-white">
            Start a New Interview Journey
        </h3>
        <p className="text-xs text-slate-400 mt-[5px] mb-3">
            Fill out a few quick details and unlock your personalized set of
            interview questions!
        </p>
        <form onSubmit={handleCreateSession} className="flex flex-col gap-5">
                        {/* Course Name */}
                        <div className="flex flex-col gap-1.5">
                        <label htmlFor="role" className="text-sm font-medium text-slate-300">
                            Role
                        </label>
                        <input
                            id="role"
                            type="text"
                            value={formData.role}
                            onChange={({ target }) => handleChange("role", target.value)}
                            placeholder="(e.g., (e.g., Frontend Developer, Data Scientist)"
                            className="bg-[#1e1e28] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00ffe0]/60 shadow-inner transition"
                        />
                        </div>
        
                        {/* Question Level */}
                        <div className="flex flex-col gap-1.5">
                        <label htmlFor="experience" className="text-sm font-medium text-slate-300">
                            Experience
                        </label>
                        <input
                            id="experience"
                            type="text"
                            value={formData.experience}
                            onChange={({ target }) => handleChange("experience", target.value)}
                            placeholder="(e.g., 1 year, 3 years, 5+ years)"
                            className="bg-[#1e1e28] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00ffe0]/60 shadow-inner transition"
                        />
                        </div>
        
                        {/* Topics */}
                        <div className="flex flex-col gap-1.5">
                        <label htmlFor="topicsToFocus" className="text-sm font-medium text-slate-300">
                            Topics to Focus On
                        </label>
                        <input
                            id="topicsToFocus"
                            type="text"
                            value={formData.topicsToFocus}
                            onChange={({ target }) => handleChange("topicsToFocus", target.value)}
                            placeholder="(Comma-separated, e.g., React, Node.js, MongoDB)"
                            className="bg-[#1e1e28] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00ffe0]/60 shadow-inner transition"
                        />
                        </div>
        
                        {/* Description */}
                        <div className="flex flex-col gap-1.5">
                        <label htmlFor="description" className="text-sm font-medium text-slate-300">
                            Description
                        </label>
                        <input
                            id="description"
                            type="text"
                            value={formData.description}
                            onChange={({ target }) => handleChange("description", target.value)}
                            placeholder="(Any specific goals or notes for this session)"
                            className="bg-[#1e1e28] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00ffe0]/60 shadow-inner transition"
                        />
                        </div>
        
                        {/* Error */}
                        {error && <p className="text-red-500 text-xs -mt-2">{error}</p>}
        
                        {/* Submit Button */}
                        <button
                        type="submit"
                        className={`w-full bg-[#00ffe0]/10 text-[#00ffe0] border border-[#00ffe0]/40 rounded-lg py-2.5 mt-2 font-semibold hover:bg-[#00ffe0]/20 hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(0,255,224,0.1)] ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        disabled={isLoading}
                        >
                        {isLoading && <FaSpinner className="animate-spin inline-block mr-2" />} 
                        Generate Interview Session
                        </button>
                    </form>
        </div>
}

export default CreateSessionForm