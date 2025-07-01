import React from 'react'
import { LuTrash2, LuPlay, LuClock, LuBookOpen, LuUser } from 'react-icons/lu';
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
    return (
        <div
            className="bg-[#1e1e28cc] border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-[0_6px_20px_rgba(0,255,255,0.04)] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,255,255,0.08)] transition duration-300 cursor-pointer relative group"
            onClick={onSelect}
        >
            {/* Header Section */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#00ffe0]/20 rounded-full flex items-center justify-center">
                        <span className="text-lg font-semibold text-[#00ffe0] drop-shadow-[0_0_4px_#00ffe088]">
                            {getInitials(role)}
                        </span>
                    </div>
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-1">{role}</h3>
                        <p className="text-slate-300 text-sm">{topicsToFocus}</p>
                    </div>
                </div>

                {/* Delete button - only visible on hover */}
                <button
                    className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-xs text-red-400 font-medium bg-red-500/10 border border-red-500/30 px-3 py-1.5 rounded-full hover:bg-red-500/20 hover:border-red-500/50 cursor-pointer transition-all duration-300"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                >
                    <LuTrash2 className="w-3 h-3" />
                    Delete
                </button>
            </div>

            {/* Description */}
            <div className="mb-4">
                <p className="text-slate-300 text-sm line-clamp-2 leading-relaxed">
                    {description || "No description available"}
                </p>
            </div>

            {/* Stats Pills matching LandingPage feature pills */}
            <div className="flex flex-wrap gap-2 mb-4">
                <div className="bg-white/10 px-3 py-1 rounded-xl text-xs backdrop-blur-sm flex gap-2 items-center text-[#7dd3fc]">
                    <LuUser className="w-3 h-3 drop-shadow-[0_0_4px_#7dd3fc77]" />
                    {experience} {experience > 1 ? "years" : "year"}
                </div>
                <div className="bg-white/10 px-3 py-1 rounded-xl text-xs backdrop-blur-sm flex gap-2 items-center text-[#7dd3fc]">
                    <LuBookOpen className="w-3 h-3 drop-shadow-[0_0_4px_#7dd3fc77]" />
                    {questions} Q&A
                </div>
                <div className="bg-white/10 px-3 py-1 rounded-xl text-xs backdrop-blur-sm flex gap-2 items-center text-[#7dd3fc]">
                    <LuClock className="w-3 h-3 drop-shadow-[0_0_4px_#7dd3fc77]" />
                    {lastUpdated}
                </div>
            </div>

            {/* Action Button */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <span className="text-slate-400 text-xs">
                    Click to start interview session
                </span>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect();
                    }}
                    className="flex items-center gap-1 bg-[#12121e] text-[#00ffe0] border border-[#00ffe0]/50 font-medium px-3 py-1.5 text-xs rounded-full cursor-pointer shadow-[0_0_4px_rgba(0,255,224,0.15)] hover:bg-[#1e1e32] hover:text-white hover:border-[#00ffe0] hover:shadow-[0_0_8px_rgba(0,255,224,0.4)] transition-all duration-300"
                >
                    <LuPlay className="w-3 h-3" />
                    Start
                </button>
            </div>

            {/* Hover overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00ffe0]/5 to-[#7dd3fc]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>
    )
}

export default SummaryCard