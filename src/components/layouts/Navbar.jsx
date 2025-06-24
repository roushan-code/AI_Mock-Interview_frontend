import React from 'react'
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";
import Logo from '../../logo';
const Navbar = () => {
    return (
        <div className="sticky top-0 w-full z-10 px-4 md:px-8 py-3 backdrop-blur-md">
            <div className="container mx-auto flex items-center justify-between gap-5">
                <Link to="/">
                    < h2 className="text-lg md:text-xl font-medium text-white leading-5" >
                        <Logo />
                    </h2 >
                </Link >
                <ProfileInfoCard />
            </div >
        </div >
    )
}
export default Navbar