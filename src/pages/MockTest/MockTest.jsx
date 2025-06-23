import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { LuClock, LuPlay } from 'react-icons/lu';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { UserContext } from '../../context/useContext';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import toast from "react-hot-toast";

const MockTest = () => {
  // const { sessionId } = useParams();
  const  sessionId  = 'test';
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showStartAlert, setShowStartAlert] = useState(true);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitAlert, setSubmitAlert] = useState(false);

  const { metaData, setMetaData } = useContext(UserContext);


  // Fetch session data on component mount
  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        setLoading(true);
        // const response = await axiosInstance.get(API_PATHS.SESSION.GET_MOCK_SESSION(sessionId));
        // if (response.status !== 200) {
        //   throw new Error('Failed to fetch session data');
        // }

        // const data = response.data.session;
        // console.log('Session Data:', data);
        setTimeRemaining(metaData.timeLimit);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching session:', err);
        setError('Failed to load quiz session. Please try again.');
        setLoading(false);
      }
    };

    
    fetchSessionData();
  }, [ metaData]);

  // Timer effect - only runs when quiz is started
  useEffect(() => {
    let timer;
    if (isQuizStarted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleQuizSubmit(timeRemaining); // Auto-submit when time runs out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isQuizStarted, timeRemaining]);



  const handleQuizSubmit = async (timeRemaining) => {
    // Handle quiz submission logic here
    const remainingTime = metaData.timeLimit - timeRemaining || 0; // Use passed time or default to 0
    const updatedMetaData = {
      ...metaData,
      timeLimit: remainingTime,
      sessionId: sessionId,
    }

    setMetaData(updatedMetaData);

    try {
      const response = await axiosInstance.post(API_PATHS.ANSWER.CREATE_ANSWER, updatedMetaData);
      console.log('Quiz submission response:', response);
      if (response.status !== 201) {
        throw new Error('Failed to submit quiz');
      }
      toast.success('Quiz submitted successfully!');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setError('Failed to submit quiz. Please try again.');
    }

    navigate(`/dashboard/results/${sessionId}`);

  };

  // Format time to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartQuiz = () => {
    setShowStartAlert(false);
    setIsQuizStarted(true);
    setTimeRemaining(metaData.timeLimit); // Set initial time limit
  };
  const handleNextQuestion = () => {
    if (currentQuestion < metaData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setSubmitAlert(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleOptionSelect = (optionId) => {
    setMetaData(prevMetaData => {
      const currentQuestionData = prevMetaData.questions[currentQuestion];
      const isCurrentlySelected = currentQuestionData.userAnswer === optionId;

      const newMetaData = {
        ...prevMetaData,
        questions: prevMetaData.questions.map((question, index) =>
          index === currentQuestion
            ? {
              ...question,
              userAnswer: isCurrentlySelected ? null : optionId, // Toggle: null if unselecting, optionId if selecting
              options: question.options.map(option => ({
                ...option,
                isSelected: isCurrentlySelected ? false : option.id === optionId
              }))
            }
            : question
        )
      };

      return newMetaData;
    });

    // Update local selectedAnswer state for UI
    const currentQuestionData = metaData.questions[currentQuestion];
    const isCurrentlySelected = currentQuestionData.userAnswer === optionId;
  };

  // Loading state
  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-transparent flex items-center justify-center">
          <div className="bg-[#1e1e3f]/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-white text-center">Loading quiz session...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-transparent flex items-center justify-center">
          <div className="bg-[#1e1e3f]/80 backdrop-blur-sm rounded-2xl p-8 border border-red-500/20 max-w-md">
            <p className="text-white text-center mb-4">{error}</p>
            <button
              onClick={() => navigate('/dashboard/mock-test')}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

    // Start Alert Modal
  if (showStartAlert && !loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
          <div className="bg-[#1e1e3f]/95 backdrop-blur-md rounded-3xl p-8 border border-purple-500/30 shadow-2xl max-w-lg w-full relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-600/10 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600/20 rounded-full mb-4">
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Ready to Start Your Mock Test?</h2>
                <p className="text-gray-300 text-sm">
                  You're about to begin a timed mock test for <span className="text-purple-400 font-semibold">{metaData.course}</span>
                </p>
              </div>

              {/* Quiz Details */}
              <div className="bg-purple-900/30 rounded-xl p-4 mb-6 border border-purple-500/20">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-purple-300 font-medium">{metaData.questions.length}</div>
                    <div className="text-gray-400">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-300 font-medium">{metaData.timeLimit / 60} min</div>
                    <div className="text-gray-400">Duration</div>
                  </div>
                  <div className="text-center col-span-2">
                    <div className="text-purple-300 font-medium">20</div>
                    <div className="text-gray-400">Total Marks</div>
                  </div>
                </div>
              </div>

              {/* Important Instructions */}
              <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-4 mb-6">
                <h3 className="text-amber-400 font-semibold mb-2 flex items-center">
                  Important Instructions
                </h3>
                <ul className="text-amber-200/80 text-sm space-y-1">
                  <li>• Timer will start immediately after clicking "Start Quiz"</li>
                  <li>• You can navigate between questions freely</li>
                  <li>• Quiz will auto-submit when time runs out</li>
                  <li>• Make sure you have a stable internet connection</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {metaData && metaData.isGiven && (
                  <button
                    onClick={handleViewResults}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 border border-blue-500 rounded-xl text-white font-medium transition-all duration-200 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-600/25"
                  >
                    <IoBarChart size={18} />
                    View Results
                  </button>
                )}
                <button
                  onClick={handleStartQuiz}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 border border-purple-500 rounded-xl text-white font-medium transition-all duration-200 hover:from-purple-700 hover:to-purple-800 shadow-lg shadow-purple-600/25"
                >
                  <LuPlay size={18} />
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }



  const currentQuestionData = metaData?.questions?.[currentQuestion];

  if (!currentQuestionData) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-transparent flex items-center justify-center">
          <div className="text-white">No questions available</div>
        </div>
      </DashboardLayout>
    );
  }



  return (
    <DashboardLayout>
      <div className="min-h-screen bg-transparent p-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
          {/* Left Panel - Course Info & Questions List */}

          <div
            className="bg-[#1e1e3f]/80 h-[120vh] backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20"
            
          >
            {/* Course Header */}
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Course: <span className="text-purple-400">{metaData.course}</span>
              </h1>
              <p className="text-gray-300 text-sm md:text-base mb-4">
                <span className="text-purple-300">Topics:</span> {metaData.topicsToFocus}
              </p>

              {/* Stats Pills */}
              <div className="flex flex-wrap gap-3">
                <div className="bg-purple-900/50 border border-purple-500/50 rounded-full px-4 py-2">
                  <span className="text-purple-300 text-sm font-medium">
                    Total marks: 20
                  </span>
                </div>
                <div className="bg-purple-900/50 border border-purple-500/50 rounded-full px-4 py-2">
                  <span className="text-purple-300 text-sm font-medium">
                    {metaData.questions.length} Q&A
                  </span>
                </div>
                <div className="bg-purple-900/50 border border-purple-500/50 rounded-full px-4 py-2">
                  <span className="text-purple-300 text-sm font-medium">
                    Total Time: {metaData.timeLimit / 60} min
                  </span>
                </div>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-3 overflow-x-scroll h-[80vh]"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {metaData.questions.map((question, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 ${currentQuestion === index
                    ? 'bg-purple-600/30 border border-purple-500'
                    : 'bg-gray-800/50 border border-gray-600/30 hover:bg-gray-700/50'
                    }`}
                  onClick={() => { setCurrentQuestion(index)}}
                >
                  <div className="flex items-center space-x-3 w-[80%] overflow-hidden">
                    <span className="text-white font-medium">
                      {index + 1}.
                    </span>
                    <span className="text-gray-300 text-sm truncate">
                      {question.question.length > 50
                        ? `${question.question.substring(0, 50)}...`
                        : question.question
                      }
                    </span>
                  </div>
                  <IoIosCheckmarkCircle className={`${question.userAnswer !== null ? 'text-green-400': 'text-gray-400'} text-[20px] flex-shrink-0`} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Current Question */}
          <div className="bg-[#1e1e3f]/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            {/* Timer Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-purple-300 text-sm font-medium">Mock Interview Test</span>
              </div>
              <div className="flex items-center space-x-2 bg-red-900/50 border border-red-500/50 rounded-full px-4 py-2">
                <LuClock className="text-red-400" size={16} />
                <span className="text-red-400 font-mono font-bold">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </div>

            {/* Question */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-semibold text-white leading-relaxed italic">
                {currentQuestionData.question}
              </h2>
            </div>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {currentQuestionData.options.map((option) => {
                const isSelected = currentQuestionData.userAnswer === option.id;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 border ${isSelected
                        ? 'bg-green-600/30 border-green-400 text-white'
                        : 'bg-gray-800/50 border-gray-600/30 text-gray-300 hover:bg-gray-700/50 hover:border-gray-500/50'
                      }`}
                  >
                    <span className="font-medium mr-3">{option.id}.</span>
                    <span>{option.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                className="px-6 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white font-medium transition-all duration-200 hover:bg-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <button
                onClick={handleNextQuestion}
                className="px-6 py-3 bg-purple-600 border border-purple-500 rounded-xl text-white font-medium transition-all duration-200 hover:bg-purple-700"
              >
                {(currentQuestion === metaData.questions.length - 1) ? "Submit" : "Next"}
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Question {currentQuestion + 1} of {metaData.questions.length}</span>
                <span>{Math.round(((currentQuestion + 1) / metaData.questions.length) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / metaData.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {submitAlert && (
        <div className="fixed top-0 left-0 w-full bg-[#312642]/50 z-50 flex items-center justify-center min-h-screen p-4">
          <div className="bg-[#1e1e3f]/95 backdrop-blur-md rounded-3xl p-8 border border-purple-500/30 shadow-2xl max-w-lg w-full relative overflow-hidden">
            <h2 className="text-2xl font-bold text-white mb-4">Submit Quiz?</h2>
            <p className="text-gray-300 mb-6">Are you sure you want to submit your answers? You won't be able to change them after submission.</p>
            <div className="flex gap-4">
              <button
                onClick={() => handleQuizSubmit(timeRemaining)}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 border border-purple-500 rounded-xl text-white font-medium transition-all duration-200 hover:from-purple-700 hover:to-purple-800 shadow-lg shadow-purple-600/25"
              >
                Submit
              </button>
              <button
                onClick={() => setSubmitAlert(false)}
                className="flex-1 px-6 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white font-medium transition-all duration-200 hover:bg-gray-600/50 hover:border-gray-500/50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default MockTest;