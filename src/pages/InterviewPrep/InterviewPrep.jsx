import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
// import { LuCircle, LuListCollapse, LuCircleAlert } from "react-icons/lu";
// import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from './RoleInfoHeader';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import QuestionCard from '../../components/Cards/QuestionCard';
import { LuCircleAlert, LuListCollapse } from 'react-icons/lu';
import AIResponsePreview from './AIResponsePreview';
import Drawer from '../../components/Drawer';
import SkeletonLoader from '../../components/Loaders/SkeletonLoader';
import { FaSpinner } from 'react-icons/fa6';

const InterviewPrep = () => {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session data by session id
  const fetchSessionDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ONE(sessionId));

      // console.log("Session Details:", response.data);
      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.error("Error fetching session details:", error);
      toast.error("Failed to fetch session details");
    }
  };

  // Generate Concept Explanation
  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null)
      setIsLoading(true)
      setOpenLeanMoreDrawer(true)
      const response = await axiosInstance.post(API_PATHS.AI.GENERATE_EXPLANATION, {
        question
      });
      // console.log("Concept Explanation:", response.data);
      if (response.data) {
        setExplanation(response.data?.data)
      }

    } catch (error) {
      setExplanation(null)
      setErrorMsg("Failed to generate explanation, Try again later");
      console.error("Error", error)
    } finally {
      setIsLoading(false)
    }

  };

  // Pin Question
  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.put(
        API_PATHS.QUESTION.PIN(questionId)
      );
      // console.log(response)
      if (response.data && response.data.question) {
        // toast.success('Question Pinned Successfully')
        fetchSessionDetailsById();
      }
    } catch (err) {
      console.error("errors", err)
    }
  }

  // Add more questions to a session
  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);
      const aiResponse = await axiosInstance.post(API_PATHS.AI.GENERATE_QUESTIONS, {
        role: sessionData?.role,
        topicsToFocus: sessionData?.topicsToFocus,
        experience: sessionData?.experience,
        numberOfQuestions: 10,
      });

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
        API_PATHS.QUESTION.ADD_TO_SESSION, {
        sessionId,
        questions: validatedQuestions,
      });

      if (response.data ) {
        toast.success("More questions added successfully");
        fetchSessionDetailsById();
      }

    } catch (error) {
      console.error("Error adding more questions:", error);
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while adding more questions.");
      }
      
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
    return () => {

    };
  }, [sessionId]);

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || ""}
        questions={sessionData?.questions?.length || ""}
        description={sessionData?.description || ""}
        lastUpdated={sessionData?.updatedAt ? moment(sessionData?.updatedAt).format("Do MMM YYYY") : ""}
        onClick={() => {
          setOpen(true);
        }}
      />

      <div className="container mx-auto pt-4 pb-4 md:px-0">
        <div className="text-lg font-semibold color-black">Interview Q & A</div>

        <div className="grid grid-cols-12 gap-4 mt-5 mb-10">
          <div className={`col-span-12 ${openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"}`}>
            <AnimatePresence>
              {sessionData?.questions?.map((data, index) => {
                return (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      stiffness: 100,
                      delay: index * 0.1,
                      dumping: 15,
                    }}
                    layout
                    layoutId={`qestion-${data._id || index}`}
                  >
                    <>
                      <QuestionCard
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() => generateConceptExplanation(data?.question)}
                        isPinned={data?.isPinned}
                        onTogglePin={() => toggleQuestionPinStatus(data?._id)}
                      />

                      {!isLoading && (
                        sessionData?.questions?.length === index + 1 && (
                          <div className="flex items-center justify-center mt-4">
                            <button
                              className="flex items-center gap-3 text-sm text-white font-medium bg-black px-5 py-2 mr-2 rounded text-nowrap cursor-pointer"
                              disabled={isLoading || isUpdateLoader}
                              onClick={uploadMoreQuestions}
                            >
                              {isUpdateLoader ? (
                                <FaSpinner className="animate-spin mr-2"/>
                              ) : (
                                <LuListCollapse className="text-lg" />
                              )}{" "} Learn More
                            </button>
                          </div>
                        )
                      )}
                    </>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
        <div>
          <Drawer
            isOpen={openLeanMoreDrawer}
            onClose={() => setOpenLeanMoreDrawer(false)}
            title={!isLoading && explanation?.title}
          >
            {errorMsg && (
              <p className='flex gap-2 text-sm text-amber-600 font-medium'>
                <LuCircleAlert className='mt-1' /> {errorMsg}
              </p>
            )}
            {isLoading && <SkeletonLoader />}
            {!isLoading && explanation && (
              <AIResponsePreview content={explanation?.explanation} />
            )}
          </Drawer>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default InterviewPrep