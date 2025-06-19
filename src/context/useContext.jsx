import React, { createContext, useState, useContext, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";


const mockData = {
        "user": "Reference User ID",
        "course": "Btech",
        "topicsToFocus": "C++,python",
        "difficulty": "Medium",
        "isGiven": false,
        "timeLimit": 1800,
        "description": "mock test",
        "questions": [
            {
                "index": 1,
                "question": "A particle is moving in a uniform magnetic field. Which of the following is conserved?",
                "options": [
                    { "id": "A", "text": "Velocity" },
                    { "id": "B", "text": "Acceleration" },
                    { "id": "C", "text": "Kinetic Energy" },
                    { "id": "D", "text": "Displacement" }
                ],
                "correctAnswer": "C",
                "userAnswer": null,
                "explanation": "In a uniform magnetic field, the force on a moving charge is perpendicular to its velocity, so kinetic energy is conserved."
            },
            {
                "index": 2,
                "question": "What is the primary function of a capacitor in an electrical circuit?",
                "options": [
                    { "id": "A", "text": "Store energy" },
                    { "id": "B", "text": "Generate power" },
                    { "id": "C", "text": "Control current" },
                    { "id": "D", "text": "Increase voltage" }
                ],
                "correctAnswer": "A",
                "userAnswer": null,
                "explanation": "Capacitors store electrical energy in an electric field."
            },
            {
                "index": 3,
                "question": "Which of the following is a characteristic of a good conductor?",
                "options": [
                    { "id": "A", "text": "High resistivity" },
                    { "id": "B", "text": "Low conductivity" },
                    { "id": "C", "text": "High thermal conductivity" },
                    { "id": "D", "text": "High specific heat capacity" }
                ],
                "correctAnswer": "C",
                "userAnswer": null,
                "explanation": "Good conductors have high thermal conductivity, allowing them to transfer heat efficiently."
            }
            // ... more questions
        ]
    };


export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const [metaData, setMetaData] = useState(mockData);

    useEffect(() => {
        if (user) return;

        const accessToken = localStorage.getItem("token");
        if (!accessToken) {
            setLoading(false);
            return;
        }


        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response.data);
            } catch (err) {
                console.error("Error fetching user data:", err);
                clearUser();
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem("token", userData.token);
        setLoading(false);
    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("token");
    }



    return (
        <UserContext.Provider value={{ user, loading, updateUser, clearUser, metaData, setMetaData }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;