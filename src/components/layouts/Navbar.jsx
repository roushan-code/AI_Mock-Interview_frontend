import React from 'react'
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <div className="h-16 bg-transparent backdrop-blur-[2px] py-2.5 px-4 md:px-0 sticky top-0 z-30">
            <div className="container mx-auto flex items-center justify-between gap-5">
                <Link to="/">
                    < h2 className="text-lg md:text-xl font-medium text-white leading-5" >
                        Interview Prep AI
                    </h2 >
                </Link >
                <ProfileInfoCard />
            </div >
        </div >
    )
}
export default Navbar