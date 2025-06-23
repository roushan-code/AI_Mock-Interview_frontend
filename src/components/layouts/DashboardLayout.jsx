import React, { useContext } from "react";
import Navbar from "./Navbar";
import { UserContext } from "../../context/useContext";

const DashboardLayout=({ children }) => {
    const { user } = useContext(UserContext);
    return (
    <div style={{ height: "fit-content", paddingBottom: "20px" }} >
        <Navbar/>
        {user && <div >{children}</div>}
    </div>
    );
};
export default DashboardLayout;