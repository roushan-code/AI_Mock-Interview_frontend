import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { LuClock, LuPlay, LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { IoBarChart } from "react-icons/io5";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { UserContext } from '../../context/useContext';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import toast from "react-hot-toast";

const MockTest = () => {
  const { sessionId } = useParams();
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
        const response = await axiosInstance.get(API_PATHS.SESSION.GET_MOCK_SESSION(sessionId));
        if (response.status !== 200) {
          throw new Error('Failed to fetch session data');
        }

        const data = response.data.session;
        setMetaData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching session:', err);
        setError('Failed to load quiz session. Please try again.');
        setLoading(false);
      }
    };

    if (sessionId) {
      fetchSessionData();
    }
  }, [sessionId, setMetaData]);

  // Timer effect - only runs when quiz is started
  useEffect(() => {
    let timer;
    if (isQuizStarted && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleQuizSubmit(timeRemaining);
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

  const handleStartQuiz = () => {
    setShowStartAlert(false);
    setIsQuizStarted(true);
    setTimeRemaining(metaData.timeLimit);
  };

  const handleViewResults = () => {
    navigate(`/dashboard/results/${sessionId}`);
  };

  const handleQuizSubmit = async (timeRemaining) => {
    const remainingTime = metaData.timeLimit - timeRemaining || 0;
    const updatedMetaData = {
      ...metaData,
      timeLimit: remainingTime,
      sessionId: sessionId,
    }

    setMetaData(updatedMetaData);

    try {
      const response = await axiosInstance.post(API_PATHS.ANSWER.CREATE_ANSWER, updatedMetaData);
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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
              userAnswer: isCurrentlySelected ? null : optionId,
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
  };

  // Loading state
  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-[#12121e] flex items-center justify-center pt-16">
          <div className="bg-[#1e1e28cc] backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-[0_6px_24px_rgba(0,0,0,0.4)]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00ffe0] mx-auto mb-4"></div>
            <p className="text-slate-200 text-center">Loading quiz session...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-[#12121e] flex items-center justify-center pt-16">
          <div className="bg-[#1e1e28cc] backdrop-blur-md rounded-2xl p-8 border border-red-500/30 shadow-[0_6px_24px_rgba(220,38,38,0.2)] max-w-md">
            <p className="text-slate-200 text-center mb-4">{error}</p>
            <button
              onClick={() => navigate('/dashboard/mock-test')}
              className="w-full px-4 py-2 bg-[#00ffe0] text-[#12121e] rounded-lg hover:bg-[#00e6cc] transition-colors font-semibold"
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
        <div className="min-h-screen bg-[#12121e] flex items-center justify-center p-4 pt-16">
          {/* Background blur elements */}
          <div className="w-1/3 h-1/3 bg-[#00ffe0]/10 blur-[65px] absolute top-0 left-0 opacity-60" />
          <div className="w-1/4 h-1/4 bg-[#7dd3fc]/10 blur-[50px] absolute bottom-0 right-0 opacity-40" />
          
          <div className="bg-[#1e1e28cc] backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-[0_6px_24px_rgba(0,0,0,0.4)] max-w-lg w-full relative overflow-hidden z-10">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00ffe0]/20 rounded-full mb-4">
                <LuPlay className="text-[#00ffe0] text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Ready to Start Your Mock Test?</h2>
              <p className="text-slate-300 text-sm">
                You're about to begin a timed mock test for <span className="text-[#00ffe0] font-semibold">{metaData.course}</span>
              </p>
            </div>

            {/* Quiz Details */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-[#00ffe0] font-medium text-lg">{metaData.questions.length}</div>
                  <div className="text-slate-400">Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-[#00ffe0] font-medium text-lg">{metaData.timeLimit / 60} min</div>
                  <div className="text-slate-400">Duration</div>
                </div>
                <div className="text-center col-span-2">
                  <div className="text-[#00ffe0] font-medium text-lg">20</div>
                  <div className="text-slate-400">Total Marks</div>
                </div>
              </div>
            </div>

            {/* Important Instructions */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
              <h3 className="text-amber-400 font-semibold mb-2">Important Instructions</h3>
              <ul className="text-amber-200/80 text-sm space-y-1">
                <li>• Timer will start immediately after clicking "Start Quiz"</li>
                <li>• You can navigate between questions freely</li>
                <li>• Quiz will auto-submit when time runs out</li>
                <li>• Make sure you have a stable internet connection</li>
                <li>• For early submission select the last question and click submit</li>
                <li>• Review your answers before submitting</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {metaData && metaData.isGiven && (
                <button
                  onClick={handleViewResults}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#7dd3fc]/20 border border-[#7dd3fc]/50 rounded-xl text-[#7dd3fc] font-medium transition-all duration-200 hover:bg-[#7dd3fc]/30 shadow-[0_0_8px_rgba(125,211,252,0.25)]"
                >
                  <IoBarChart size={18} />
                  View Results
                </button>
              )}
              <button
                onClick={handleStartQuiz}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#00ffe0] text-[#12121e] rounded-xl font-semibold transition-all duration-200 hover:bg-[#00e6cc] hover:shadow-[0_0_12px_rgba(0,255,224,0.4)] hover:-translate-y-0.5"
              >
                <LuPlay size={18} />
                Start Quiz
              </button>
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
        <div className="min-h-screen bg-[#12121e] flex items-center justify-center pt-16">
          <div className="text-slate-200">No questions available</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#12121e] pt-16">
        {/* Background blur elements */}
        <div className="w-1/3 h-1/3 bg-[#00ffe0]/5 blur-[65px] absolute top-0 left-0 opacity-60" />
        <div className="w-1/4 h-1/4 bg-[#7dd3fc]/5 blur-[50px] absolute bottom-0 right-0 opacity-40" />
        
        <div className="p-4 relative z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
            
            {/* Left Panel - Course Info & Questions List */}
            <div className="bg-[#1e1e28cc] backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-[0_6px_24px_rgba(0,0,0,0.4)] lg:col-span-1">
              {/* Course Header */}
              <div className="mb-6">
                <h1 className="text-xl font-bold text-white mb-2">
                  Course: <span className="text-[#00ffe0]">{metaData.course}</span>
                </h1>
                <p className="text-slate-300 text-sm mb-4">
                  <span className="text-[#7dd3fc]">Topics:</span> {metaData.topicsToFocus}
                </p>

                {/* Stats Pills */}
                <div className="flex flex-wrap gap-2">
                  <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1">
                    <span className="text-[#00ffe0] text-xs font-medium">20 marks</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1">
                    <span className="text-[#00ffe0] text-xs font-medium">{metaData.questions.length} Q&A</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1">
                    <span className="text-[#00ffe0] text-xs font-medium">{metaData.timeLimit / 60} min</span>
                  </div>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-300px)]" style={{ scrollbarWidth: 'thin', scrollbarColor: '#00ffe0 transparent' }}>
                {metaData.questions.map((question, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                      currentQuestion === index
                        ? 'bg-[#00ffe0]/20 border border-[#00ffe0]/50'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                    }`}
                    onClick={() => setCurrentQuestion(index)}
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <span className="text-white font-medium text-sm">{index + 1}.</span>
                      <span className="text-slate-300 text-xs truncate">
                        {question.question.length > 40
                          ? `${question.question.substring(0, 40)}...`
                          : question.question
                        }
                      </span>
                    </div>
                    <IoIosCheckmarkCircle 
                      className={`${
                        question.userAnswer !== null ? 'text-[#00ffe0]' : 'text-slate-600'
                      } text-lg flex-shrink-0`} 
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel - Current Question */}
            <div className="bg-[#1e1e28cc] backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-[0_6px_24px_rgba(0,0,0,0.4)] lg:col-span-2">
              {/* Timer Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <span className="text-[#7dd3fc] text-sm font-medium">Mock Interview Test</span>
                </div>
                <div className="flex items-center space-x-2 bg-red-500/20 border border-red-500/50 rounded-full px-4 py-2">
                  <LuClock className="text-red-400" size={16} />
                  <span className="text-red-400 font-mono font-bold">
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-white leading-relaxed">
                  <span className="text-[#7dd3fc]">Q{currentQuestionData.index}:</span> {currentQuestionData.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {currentQuestionData.options.map((option) => {
                  const isSelected = currentQuestionData.userAnswer === option.id;

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleOptionSelect(option.id)}
                      className={`w-full p-4 rounded-xl text-left transition-all duration-200 border ${
                        isSelected
                          ? 'bg-[#00ffe0]/20 border-[#00ffe0]/50 text-white shadow-[0_0_8px_rgba(0,255,224,0.25)]'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
                      }`}
                    >
                      <span className="font-medium mr-3 text-[#7dd3fc]">{option.id}.</span>
                      <span>{option.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mb-6">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-200 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <LuChevronLeft size={18} />
                  Previous
                </button>

                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-2 px-6 py-3 bg-[#00ffe0] text-[#12121e] rounded-xl font-semibold transition-all duration-200 hover:bg-[#00e6cc] hover:shadow-[0_0_12px_rgba(0,255,224,0.4)] hover:-translate-y-0.5"
                >
                  {(currentQuestion === metaData.questions.length - 1) ? "Submit" : "Next"}
                  <LuChevronRight size={18} />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="mt-6">
                <div className="flex justify-between text-sm text-slate-400 mb-2">
                  <span>Question {currentQuestion + 1} of {metaData.questions.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / metaData.questions.length) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#00ffe0] to-[#7dd3fc] h-2 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(0,255,224,0.5)]"
                    style={{ width: `${((currentQuestion + 1) / metaData.questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Alert Modal */}
        {submitAlert && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1e1e28cc] backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-[0_6px_24px_rgba(0,0,0,0.4)] max-w-lg w-full">
              <h2 className="text-2xl font-bold text-white mb-4">Submit Quiz?</h2>
              <p className="text-slate-300 mb-6">Are you sure you want to submit your answers? You won't be able to change them after submission.</p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleQuizSubmit(timeRemaining)}
                  className="flex-1 px-6 py-3 bg-[#00ffe0] text-[#12121e] rounded-xl font-semibold transition-all duration-200 hover:bg-[#00e6cc] hover:shadow-[0_0_12px_rgba(0,255,224,0.4)]"
                >
                  Submit
                </button>
                <button
                  onClick={() => setSubmitAlert(false)}
                  className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-200 hover:bg-white/10"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MockTest;