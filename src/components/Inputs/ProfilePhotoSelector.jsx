import React, { useRef, useState, useEffect } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Clean up previous preview URL to prevent memory leak
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
            
            // Update the image state
            setImage(file);
            // Generate preview URL from the file
            const newPreview = URL.createObjectURL(file);
            if (setPreview) {
                setPreview(newPreview);
            }
            setPreviewUrl(newPreview);
        }
    };
    
    const handleRemoveImage = () => {
        // Clean up preview URL to prevent memory leak
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        
        setImage(null);
        setPreviewUrl(null);

        if (setPreview) {
            setPreview(null);
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const onChooseFile = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }
    return (
        <div className="flex justify-center">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {!image ? (
                <div
                className="w-20 h-20 rounded-full bg-[#1e1e28] border border-white/10 backdrop-blur-md shadow-[0_0_12px_rgba(0,255,224,0.05)] flex items-center justify-center relative cursor-pointer hover:shadow-[0_0_20px_rgba(0,255,224,0.15)] transition-all"
                onClick={onChooseFile}
                >
                <LuUser className="text-3xl text-[#7dd3fc]" />
                <button
                    type="button"
                    className="w-7 h-7 flex items-center justify-center bg-[#00ffe0] text-black rounded-full absolute -bottom-1 -right-1 shadow-md hover:scale-105 transition"
                    onClick={(e) => {
                        e.stopPropagation();
                        onChooseFile();
                    }}
                >
                    <LuUpload className="w-4 h-4" />
                </button>
                </div>
            ) : (
                <div className="relative group">
                <img
                    src={preview || previewUrl}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover border border-white/10 shadow-[0_0_12px_rgba(0,255,224,0.1)] backdrop-blur-md"
                />
                <button
                    type="button"
                    className="w-7 h-7 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 shadow-md hover:scale-105 transition"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveImage();
                    }}
                >
                    <LuTrash className="w-4 h-4" />
                </button>
                </div>
            )}
            </div>

    )
};

export default ProfilePhotoSelector;