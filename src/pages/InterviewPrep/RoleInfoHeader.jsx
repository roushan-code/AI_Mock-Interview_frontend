
const RoleInfoHeader = ({
    role,
    topicsToFocus,
    experience,
    questions,
    description,
    lastUpdated,
}) => {
    return <div className="bg-[#14141442] text-white relative pt-16">
        <div className="container mx-auto px-10 md:px-0">
            <div className="h-[200px] flex flex-col justify-center relative z-1">
                <div className="flex items-start">
                    <div className="flex-grow">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-medium">{role}</h2>
                                <p className="text-sm text-medium text-white mt-1">
                                    {topicsToFocus}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3 mt-4">
                    <div className="text-[10px] font-semibold border border-[#626262] text-white bg-black px-3 py-3 rounded-full">
                        Experience: {experience} {experience == 1 ? "Year" : "Years"}
                    </div>
                    <div className="text-[10px] border border-[#626262] font-semibold text-white bg-black px-3 py-3 rounded-full">
                        {questions} Q&A
                    </div>
                    <div className="text-[10px] font-semibold border border-[#626262] text-white bg-black px-3 py-3 rounded-full">
                        Last Updated: {lastUpdated}
                    </div>
                </div>
            </div>
            <div className="w-[40vw] md:w-[30vw] h-[200px] flex items-center justify-center bg-transparent overflow-hidden absolute top-0 right-0 z-0">
                <div className="w-16 h-16 bg-gray-800 blur-[65px] animate-blob1" />
                <div className="w-16 -16 bg-teal-400 blur-[65px] animate-blob2" />
                <div className="w-16 h-16 bg-cyan-300 blur-[45px] animate-blob3" />
                <div className="w-16 h-16 bg-fuchsia-200 blur-[45px] animate-blobl" />
            </div>
        </div>
    </div>
};


export default RoleInfoHeader