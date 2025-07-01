import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa6";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";


const CreateMockTestForm = () => {
    const [formData, setFormData] = useState({
        course: "",
        difficulty: "",
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
        const { course, difficulty, topicsToFocus} = formData;
        if (!course || !difficulty || !topicsToFocus) {
            setError("Please fill all the required fields.");
            return;
        }
        if (difficulty !== "Easy" && difficulty !== "Medium" && difficulty !== "Hard" && difficulty !== "easy" && difficulty !== "medium" && difficulty !== "hard") {
            setError("Please select a valid question level (Easy, Medium, Hard).");
            return;
        }

        setError(null);
        setIsLoading(true);

        try {
            const aiResponse = await axiosInstance.post(
                API_PATHS.AI.GENERATE_MOCK_QUESTIONS,
                {
                    course,
                    difficulty,
                    topicsToFocus,
                    numberOfQuestions: 20,
                }
            );

            
            const responseData = aiResponse.data?.data;
        
        // Create a local variable instead of relying on state update
        const sessionTimeLimit = responseData?.Time || 1200;

        

            if (!responseData.questions || !Array.isArray(responseData.questions)) {
                throw new Error("Invalid response format from AI service");
            }


            const response = await axiosInstance.post(
                API_PATHS.SESSION.CREATE_MOCK_SESSION, {
                ...formData,
                timeLimit: sessionTimeLimit,
                questions: responseData.questions // ✅ Use the local variable
            });

            if (response.data?.session?._id) {
                navigate(`/mock-test/${response.data?.session._id}`);
            }
            setIsLoading(false);
        } catch (err) {
            console.log(err)
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("An error occurred while creating the session.");
            }
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="w-full px-4 flex flex-col justify-center text-slate-200">
            <h3 className="text-xl font-semibold text-white mb-1">
                Start a New Interview Journey
            </h3>

            <p className="text-sm text-slate-400 mb-6">
                Fill out a few quick details and unlock your personalized set of interview questions!
            </p>

            <form onSubmit={handleCreateSession} className="flex flex-col gap-5">
                {/* Course Name */}
                <div className="flex flex-col gap-1.5">
                <label htmlFor="role" className="text-sm font-medium text-slate-300">
                    Course Name
                </label>
                <input
                    id="role"
                    type="text"
                    value={formData.course}
                    onChange={({ target }) => handleChange("course", target.value)}
                    placeholder="(e.g., BCA, MCA, BTech etc.)"
                    className="bg-[#1e1e28] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00ffe0]/60 shadow-inner transition"
                />
                </div>

                {/* Question Level */}
                <div className="flex flex-col gap-1.5">
                <label htmlFor="experience" className="text-sm font-medium text-slate-300">
                    Questions Level
                </label>
                <input
                    id="experience"
                    type="text"
                    value={formData.difficulty}
                    onChange={({ target }) => handleChange("difficulty", target.value)}
                    placeholder="(Easy, Medium, Hard)"
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
                    placeholder="(e.g., C, Python Programming, Data Structures etc.)"
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
                Generate Mock Test Session
                </button>
            </form>
        </div>

    )
}

export default CreateMockTestForm