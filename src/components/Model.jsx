import { IoIosClose } from "react-icons/io";

const Model = ({
    children,
    isOpen,
    onClose,
    title,
    hideHeader
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/40 backdrop-blur-sm">
            {/* Modal Content */}
            <div className="relative z-[1] max-w-xl w-full mx-auto bg-[#12121ecc] text-slate-200 rounded-[20px] px-6 md:px-10 py-10 backdrop-blur-[10px] border border-white/5 shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-all duration-300 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.03),transparent_70%)] before:z-[-1] before:pointer-events-none overflow-hidden">
                
                {/* Modal Header */}
                {!hideHeader && (
                <div className="mb-6">
                    <h3 className="text-2xl font-semibold text-white text-center">{title}</h3>
                </div>
                )}

                {/* Close Button */}
                <button
                type="button"
                className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl hover:scale-110 transition"
                onClick={onClose}
                >
                    <IoIosClose />
                </button>

                {/* Modal Body */}
                <div className="max-h-[80vh] overflow-y-auto px-1 custom-scrollbar">
                    {children}
                </div>

            </div>
        </div>
    );

}

export default Model