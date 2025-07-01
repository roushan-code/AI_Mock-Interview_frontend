import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { DoughnutChart } from './DoughnutChart';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { FaTimesCircle } from "react-icons/fa";

const TestResult = () => {
    const { sessionId } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [metaData, setMetaData] = useState(null);
    const [totalTime, setTotalTime] = useState(0);

    // Fetch session data on component mount
    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.ANSWER.GET_ANSWER_BY_ID(sessionId));

                if (response.status !== 200) {
                    throw new Error('Failed to fetch session data');
                }
                const data = response.data.answer;
                console.log('Fetched session data:', data);
                setMetaData(data);
                setTotalTime(response?.data.totalTime || 0);
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
    }, [sessionId]);

    // Loading state
    if (loading) {
        return (
            <DashboardLayout>
                <div className="min-h-screen bg-[#12121e] flex items-center justify-center pt-16">
                    <div className="bg-[#1e1e28cc] backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-[0_6px_24px_rgba(0,0,0,0.4)]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00ffe0] mx-auto mb-4"></div>
                        <p className="text-slate-200 text-center">Loading quiz result...</p>
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

    const percentage = Math.floor((metaData.correctAnswer / metaData.questions.length) * 100);

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-[#12121e] pt-16">
                {/* Background blur elements matching MockTest */}
                <div className="w-1/3 h-1/3 bg-[#00ffe0]/5 blur-[65px] absolute top-0 left-0 opacity-60" />
                <div className="w-1/4 h-1/4 bg-[#7dd3fc]/5 blur-[50px] absolute bottom-0 right-0 opacity-40" />
                <div className="p-4 relative ">
                    <div className="max-w-7xl mx-auto">

                        {/* Header Section */}
                        <div className="mb-8">
                            <div className="flex sm:flex-row items-center justify-between mb-4 gap-4">
                                <div className='flex md:w-[58%] md:justify-end'>
                                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                                        Test <span className="text-[#00ffe0]">Results</span>
                                    </h1>
                                </div>
                                <button
                                    onClick={() => navigate('/dashboard/mock-test')}
                                    className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-slate-300 font-medium transition-all duration-200 hover:bg-white/10"
                                >
                                    Dashboard
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-10">

                            {/* Left Panel - Performance Overview */}
                            <div className="flex flex-col lg:flex-row justify-center gap-6">

                                {/* Score Card */}
                                <div className="w-full lg:w-1/3 bg-[#1e1e28cc] backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-[0_6px_24px_rgba(0,0,0,0.4)] mb-4 lg:mb-0">
                                    <div className="text-center mb-6">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00ffe0]/20 rounded-full mb-4">
                                            {/* Icon */}
                                        </div>
                                        <h2 className="text-2xl font-bold text-white mb-2">Your Score</h2>
                                        <div className="text-4xl font-bold text-[#00ffe0] mb-2">{metaData.correctAnswer}/{metaData.questions.length}</div>
                                        <div className="text-2xl font-semibold text-[#7dd3fc]">{percentage}%</div>
                                    </div>

                                    {/* Performance Stats */}
                                    <div className="space-y-3 ">
                                        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                                            <div className="flex items-center gap-2">
                                                <IoIosCheckmarkCircle className="text-green-400" size={18} />
                                                <span className="text-slate-300 text-sm">Correct</span>
                                            </div>
                                            <span className="text-green-400 font-semibold">{metaData.correctAnswer}</span>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                                            <div className="flex items-center gap-2">
                                                <FaTimesCircle className="text-red-400" size={18} />
                                                <span className="text-slate-300 text-sm">Incorrect</span>
                                            </div>
                                            <span className="text-red-400 font-semibold">{metaData.incorrectAnswer}</span>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                                            <div className="flex items-center gap-2">
                                                <span className="text-slate-300 text-sm">Unanswered</span>
                                            </div>
                                            <span className="text-amber-400 font-semibold">{metaData.unAnswered}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Quiz Info */}
                                <div className="w-full lg:w-1/3 bg-[#1e1e28cc] backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-[0_6px_24px_rgba(0,0,0,0.4)] mb-4 lg:mb-0">
                                    <h3 className="text-2xl font-semibold text-center text-white mb-4">Quiz Information</h3>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <p className="text-slate-300">Course: <span className="text-[#7dd3fc] font-medium">{metaData.course}</span></p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-slate-300 text-sm">Topics: {metaData.topicsToFocus}</span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span className="text-slate-300 text-sm">
                                                Time Taken: {`${Math.floor(metaData.timeTaken / 60)}m ${metaData.timeTaken % 60}s`}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span className="text-slate-300 text-sm">Total Questions:</span>
                                            <span className="text-slate-300 text-sm">{metaData.questions.length} Questions</span>
                                        </div>
                                    </div>

                                    {/* Stats Pills similar to MockTest */}
                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1">
                                            <span className="text-[#00ffe0] text-xs font-medium">{metaData.questions.length * 1} marks</span>
                                        </div>
                                        <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1">
                                            <span className="text-[#00ffe0] text-xs font-medium">{metaData.questions.length} Q&A</span>
                                        </div>
                                        <div className="bg-white/5 border border-white/10 rounded-full px-3 py-1">
                                            <span className="text-[#00ffe0] text-xs font-medium">{totalTime / 60} minutes</span>
                                        </div>
                                        
                                    </div>
                                </div>

                                {/* Performance Chart */}
                                <div className="w-full lg:w-1/3 bg-[#1e1e28cc] backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-[0_6px_24px_rgba(0,0,0,0.4)]">
                                    <h3 className="text-2xl font-semibold text-white mb-4 text-center">Performance Overview</h3>

                                    {/* Legend */}
                                    <div className="flex flex-wrap justify-center gap-3 mt-3 mb-6 text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                            <span className="text-slate-300">Correct</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                            <span className="text-slate-300">Incorrect</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                            <span className="text-slate-300">Unanswered</span>
                                        </div>
                                    </div>

                                    {/* Chart Container */}
                                    <div className="flex justify-center">
                                        <div className="relative w-32 h-32 sm:w-60 sm:h-60">
                                            <DoughnutChart
                                                labels={['Correct', 'Incorrect', 'Unanswered']}
                                                value={[
                                                    metaData.correctAnswer || 0,
                                                    metaData.incorrectAnswer || 0,
                                                    metaData.unAnswered || 0
                                                ]}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Panel - Detailed Questions */}
                            <div className="flex align-center justify-center mt-10">
                                <div className="bg-[#1e1e28cc] backdrop-blur-md rounded-2xl border border-white/10 shadow-[0_6px_24px_rgba(0,0,0,0.4)] h-[95vh] w-full max-w-6xl">

                                    {/* Header similar to MockTest */}
                                    <div className="p-6 border-b border-white/10">
                                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-[#7dd3fc] text-lg font-medium">Mock Interview Test - Results</span>
                                            </div>
                                            <div className="flex items-center space-x-2 bg-[#00ffe0]/20 border border-[#00ffe0]/50 rounded-full px-4 py-2">
                                                <span className="text-[#00ffe0] font-mono font-bold">
                                                    {percentage}% Score
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Questions List */}
                                    <div className="p-6 overflow-y-auto h-[calc(100%-140px)]"
                                        style={{ scrollbarWidth: 'thin', scrollbarColor: '#00ffe0 transparent' }}>

                                        <div className="space-y-6">
                                            {metaData?.questions.map((question, index) => (
                                                <div key={index} className="border-b border-white/5 pb-6 last:border-b-0">

                                                    {/* Question Header similar to MockTest */}
                                                    <div className="mb-6">
                                                        <h3 className="text-xl md:text-xl font-semibold text-white leading-relaxed">
                                                            <span className="text-[#7dd3fc]">Q{index + 1}:</span> {question.question}
                                                        </h3>
                                                    </div>

                                                    {/* Options with MockTest styling */}
                                                    <div className="space-y-3 mb-6">
                                                        {question.options.map((option) => {
                                                            const isUserAnswer = question.userAnswer === option.id;
                                                            const isCorrectAnswer = question.correctAnswer === option.id;
                                                            const isCorrectUserAnswer = isUserAnswer && isCorrectAnswer;
                                                            const isIncorrectUserAnswer = isUserAnswer && !isCorrectAnswer;

                                                            return (
                                                                <div
                                                                    key={option.id}
                                                                    className={`p-4 rounded-xl border transition-all duration-200 ${isCorrectAnswer
                                                                        ? 'bg-[#00ffe0]/20 border-[#00ffe0]/50 text-white shadow-[0_0_8px_rgba(0,255,224,0.25)]'
                                                                        : isIncorrectUserAnswer
                                                                            ? 'bg-red-500/20 border-red-500/50 text-white'
                                                                            : 'bg-white/5 border-white/10 text-slate-300'
                                                                        }`}
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <span className="font-medium text-[#7dd3fc]">{option.id}.</span>
                                                                        <span className="flex-1">{option.text}</span>

                                                                        {/* Status Icons */}
                                                                        {isCorrectAnswer && (
                                                                            <IoIosCheckmarkCircle className="text-[#00ffe0]" size={18} />
                                                                        )}
                                                                        {isIncorrectUserAnswer && (
                                                                            <FaTimesCircle className="text-red-400" size={18} />
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>

                                                    {/* Explanation */}
                                                    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                                        <div className="mb-2">
                                                            <span className="text-[#7dd3fc] font-medium">Correct Answer: </span>
                                                            <span className="text-[#00ffe0] font-semibold">{question.correctAnswer}</span>
                                                        </div>
                                                        <div className="mb-2">
                                                            <span className="text-[#7dd3fc] font-medium">Your Answer: </span>
                                                            <span className={`font-semibold ${question.userAnswer === question.correctAnswer
                                                                ? 'text-[#00ffe0]'
                                                                : question.userAnswer
                                                                    ? 'text-red-400'
                                                                    : 'text-amber-400'
                                                                }`}>
                                                                {question.userAnswer || 'Not Answered'}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className="text-[#7dd3fc] font-medium">Explanation: </span>
                                                            <p className="text-slate-300 mt-1">{question.explanation}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Footer with MockTest button styling */}
                                    <div className="p-6 border-t border-white/10">
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => navigate('/dashboard/mock-test')}
                                                className="flex items-center gap-2 px-6 py-3 bg-[#00ffe0] text-[#12121e] rounded-xl font-semibold transition-all duration-200 hover:bg-[#00e6cc] hover:shadow-[0_0_12px_rgba(0,255,224,0.4)] hover:-translate-y-0.5"
                                            >
                                                Back to Dashboard
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TestResult;