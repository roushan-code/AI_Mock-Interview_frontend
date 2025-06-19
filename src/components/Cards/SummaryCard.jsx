import React from 'react'
import { LuTrash2 } from 'react-icons/lu';
import { getInitials } from '../../utils/helper';

const SummaryCard = ({
    colors,
    role,
    topicsToFocus,
    experience,
    questions,
    description,
    lastUpdated,
    onSelect,
    onDelete,
}) => {
    // console.log("colors", colors);
    return <div
        className="bg-[#343665] border rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-[0px_50px_100px_-20px_rgb(47_37_104_/_80%),0px_30px_60px_-30px_rgb(66_54_88_/_70%),0px_-2px_6px_0px_inset_rgba(7,0,26,0.98)] shadow-[0px_50px_100px_-20px_rgb(47_37_104_/_14%),0px_30px_60px_-30px_rgb(66_54_88_/_0%),0px_-2px_6px_0px_inset_rgba(7,0,26,0.98)] relative group"
        onClick={onSelect}>
        <div
            className="rounded-lg pb-4 pt-4 cursor-pointer relative"
            style={{
                background: colors.bgcolor,
            }}>
            <div className='flex items-start'>
                <div className='flex-shrink-0 w-12 h-12 rounded-md flex items-center justify-center mr-4'>
                    <span className="text-lg font-semibold text-[#e4e4e4]">
                        {getInitials(role)}
                    </span>
                </div>
                {/* Content Container */}
                <div className="glex-grow">
                    <div className="flex justify-between items-start">
                        {/* Title and Skills */}
                        <div>
                            <h2 className="text-[17px] text-[#e4e4e4] font-medium">{role}</h2>
                            <p className="text-xs text-medium text-[#e4e4e4]">
                                {topicsToFocus}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <button
                className='hidden group-hover:flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded text-nowrap border border-rose-100 hover:border-rose-200 cursor-pointer absolute top-0 right-0'
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                }}
            >
                <LuTrash2/>
            </button>
        </div>

        <div className='px-3 pb-3'>
            <div className="flex items-center gap-3 mt-4">
                <div className="text-[10px] font-medium text-[#b1b1b1] px-3 py-1 border-[0.5px] border-gray-300/900 rounded-full">
                    Experience: {experience} {experience > 1 ? "years" : "year"}
                </div>
                <div className="text-[10px] font-medium text-[#b1b1b1] px-3 py-1 border-[0.5px] border-gray-300/900 rounded-full">
                    {questions} Q&A
                </div>
                <div className="text-[10px] font-medium text-[#b1b1b1] px-3 py-1 border-[0.5px] border-gray-300/900 rounded-full">
                    Last Updated: {lastUpdated}
                </div>
            </div>
            <p className="text-[12px] text-[#ddf3ee] font-medium line-clamp-2 mt-3">
                {description}
            </p>
        </div>
    </div>
}

export default SummaryCard