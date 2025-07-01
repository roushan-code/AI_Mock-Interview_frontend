import React from 'react'

const DeleteAlertContent = ({ content, onDelete, loading }) => {
    return (
        <div className="p-5">
            <p className="text-[14px] text-center ">{content}</p>
            <div className="flex justify-center mt-6">
                <button
                    type="button"
                    className={`bg-[#00ffe0] w-[100%] p-[10px] ${loading ? 'btn-disabled cursor-not-allowed' : 'bg-[#00ffe0] text-[#12121e] rounded-xl font-semibold transition-all duration-200 hover:bg-[#00e6cc] hover:shadow-[0_0_12px_rgba(0,255,224,0.4)]'} `}

                    onClick={onDelete}>
                    Delete
                </button>
            </div>
        </div >
    )
}

export default DeleteAlertContent