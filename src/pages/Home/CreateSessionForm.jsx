import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/input";
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
        <h3 className="text-lg font-semibold text-black">
            Start a New Interview Journey
        </h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-3">
            Fill out a few quick details and unlock your personalized set of
            interview questions!
        </p>
        <form onSubmit={handleCreateSession} className="">
            <Input
                value={formData.role}
                onChange={({ target }) => handleChange("role", target.value)}
                label="Target Role"
                placeholder="(e.g., Frontend Developer, UI/UX Designer, etc.)"
                type="text"
            />
            <Input
                value={formData.experience}
                onChange={({ target }) => handleChange("experience", target.value)}
                label="Years of Experience"
                placeholder="(e.g., 1 year, 3 years, 5+ years)"
                type="number"
            />
            <Input
                value={formData.topicsToFocus}
                onChange={({ target }) => handleChange("topicsToFocus", target.value)}
                label="Topics to Focus On"
                placeholder=" (Comma-separated, e.g., React, Node.js, MongoDB)"
                type="text"
            />
            <Input
                value={formData.description}
                onChange={({ target }) => handleChange("description", target.value)}
                label="Description"
                placeholder=" (Any specific goals or notes for this session)"
                type="text"
            />
            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

            <button
            type="submit"
            className="btn-primary mt-2 w-full"
            disabled={isLoading}
            >
            
               {isLoading && <FaSpinner className="animate-spin mr-2"/>} Create Session
            </button>
        </form>
        </div>
}

export default CreateSessionForm