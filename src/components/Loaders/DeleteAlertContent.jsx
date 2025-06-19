import React from 'react'

const DeleteAlertContent = ({ content, onDelete, loading }) => {
    return (
        <div className="p-5">
            <p className="text-[14px] ">{content}</p>
            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className={`btn-small ${loading ? 'btn-disabled cursor-not-allowed' : 'btn-primary'} `}

                    onClick={onDelete}>
                    Delete
                </button>
            </div>
        </div >
    )
}

export default DeleteAlertContent