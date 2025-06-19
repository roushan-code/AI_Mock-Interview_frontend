import React from 'react'
import { IoIosClose } from "react-icons/io";

const Model = ({
    children,
    isOpen,
    onClose,
    title,
    hideHeader
}) => {
    if (!isOpen) return null;

    return <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/40">
        {/* Modal Content */}
        <div
            className={`relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden`}>
            {/* Modal Header */}
            {!hideHeader && (
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h3 className="md:text-lg font-medium text-gray-900">{title}</h3>
                </div>
            )}
            <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-orange-100 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center absolute top-3.5 right-3.5 cursor-pointer text-[30px]"
                onClick={onClose}
                >
                    <IoIosClose />
        </button>
        {/* Modal Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
            {children}
        </div>
    </div >
</div >

}

export default Model