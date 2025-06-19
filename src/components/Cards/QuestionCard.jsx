import React, { useEffect, useRef, useState } from 'react'
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from 'react-icons/lu';
import AIResponsePreview from '../../pages/InterviewPrep/AIResponsePreview';

const QuestionCard = ({
    question,
    answer,
    onLearnMore,
    isPinned,
    onTogglePin,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [height, setHeight] = useState(0);
    const contentRef = useRef(null);

    useEffect(() => {
        if (isExpanded) {
            const contentHeight = contentRef.current.scrollHeight;
            setHeight(contentHeight + 10);
        } else {
            setHeight(0);
        }
    }, [isExpanded]);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return <>
        <div className="bg-[#5238d2c7] rounded-lg mb-4 overflow-hidden py-4 px-5 hover:shadow-[0px_50px_100px_-20px_rgb(82_66_168_/_50%),0px_30px_60px_-30px_rgb(117_89_168_/_50%),0px_-2px_6px_0px_inset_rgb(46_24_104_/_98%)]">
            <div className="flex items-start justify-between cursor-pointer">
                <div className="flex items-start gap-3.5">
                    <span className="text-xs md: text-[15px] font-semibold text-white leading-[18px]">
                        Q
                    </span>
                    <h3
                        className="text-xs md:text-[14px] font-medium text-white mr-0 md:mr-20"
                        onClick={toggleExpand}
                    >
                        {question}
                    </h3>
                </div>
                <div className="flex items-center justify-end ml-4 relative">
                    <div className={`flex ${isExpanded ? "md: flex" : "md: hidden group-hover:flex"}`}>
                        <button
                            className="flex items-center gap-2 text-xs text-indigo-800 font-medium bg-indigo-50 px-3 py-1 mr-2 rounded text-nowrap border border-indigo-50 hover:bg-indigo-200 cursor-pointer"
                            onClick={onTogglePin}
                        >
                            {isPinned ? (
                                <LuPinOff className="text-xs" />
                            ) : (
                                <LuPin className="text-xs" />
                            )}
                        </button>
                        <button
                            className="flex items-center gap-2 text-xs text-cyan-800 font-medium bg-cyan-50 px-3 py-1 rounded text-nowrap border border-cyan-100 hover:bg-cyan-200 cursor-pointer"
                            onClick={() => {
                                setIsExpanded(true);
                                onLearnMore();
                            }}
                        >
                            <LuSparkles />
                            <span className="hidden md:block">Learn More</span>
                        </button>
                    </div>
                    <button
                        className="text-gray-400 hover:text-gray-500 cursor-pointer"
                        onClick={toggleExpand}
                    >
                        <LuChevronDown
                            size={20}
                            className={`transform transition-transform duration-300  ${isExpanded ? "rotate-180" : "rotate-0"}`}
                        />

                    </button>
                </div>
            </div>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out`}
                style={{ height: `${height}px` }}
            >
                <div
                    className="mt-4 text-[#ddf0fe] bg-[#282828] px-5 py-3 rounded-lg"
                    ref={contentRef}
                >
                    <AIResponsePreview
                        content={answer}
                        />
                </div>
            </div>
        </div>
    </>
};
export default QuestionCard;