export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register", // Signup
        LOGIN: "/api/auth/login", // Authenticate user & return JWT token
        GET_PROFILE: "/api/auth/profile", // Get logged-in user details
    },
    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image", // Upload profile picture
    },
    AI: {
        GENERATE_QUESTIONS: "/api/ai/generate-questions", // Generate interview questions and answers using Gemini
        GENERATE_EXPLANATION: "/api/ai/generate-explanation", // Generate concept explanation using Gemini
        GENERATE_MOCK_QUESTIONS: "/api/ai/generate-mcq-questions", // Generate mock interview questions and answers using Gemini
        // GENERATE_MOCK_EXPLANATION: "/api/ai/generate-mock-explanation", // Generate concept explanation for mock interviews using Gemini
    },
    SESSION: {
        CREATE: "/api/session/create", // Create a new interview session with questions
        GET_ALL: "/api/session/my-sessions", // Get all user sessions
        GET_ONE: (id) => `/api/session/${id}`, // Get session details with questions
        DELETE: (id) => `/api/session/${id}`, // Delete a session

        GET_MOCK_SESSIONS: "/api/mock/mock-sessions", // Get mock interview sessions
        CREATE_MOCK_SESSION: "/api/mock/create-mock-session", // Create a mock interview session
        GET_MOCK_SESSION: (id) => `/api/mock/mock-session/${id}`, // Get mock interview session details
        DELETE_MOCK_SESSION: (id) => `/api/mock/mock-session/${id}`, // Delete a mock interview session

    },
    QUESTION: {
        ADD_TO_SESSION: "/api/question/add-questions", // Add more questions to a session
        PIN: (id) => `/api/question/${id}/pin`, // Pin or Unpin a question
        UPDATE_NOTE: (id) => `/api/question/${id}/note`, // Update/Add a note to a question
    },
    ANSWER: {
        CREATE_ANSWER: "/api/mock-answer/create-mock-answer", // Create an answer for a question
        GET_ANSWER_BY_ID: (id) => `/api/mock-answer/${id}`, // Update an answer for a question
        DELETE_ANSWER: (id) => `/api/mock-answer/${id}`, // Delete an answer for a question
    },
};