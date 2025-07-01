import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Toaster} from 'react-hot-toast';

// import Login from "./pages/Auth/Login";
// import SignUp from "./pages/Auth/SignUp";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Dashboard from "./pages/Home/Dashboard.jsx";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep.jsx";
import UserProvider from './context/useContext.jsx';
import Dashboard1 from './pages/Home/Dashboard1.jsx';
import MockTest from './pages/MockTest/MockTest.jsx';
import TestResult from './pages/MockTest/TestResult.jsx';

const App = () => {
  return (
    <UserProvider>
    <div className='bg-[#12121e]' >
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard/ai-learning" element={<Dashboard />} />
          <Route path="/dashboard/mock-test" element={<Dashboard1 />} />
          <Route path="/interview-prep/:sessionId" element={<InterviewPrep />} />
          <Route path="/mock-test/:sessionId" element={<MockTest />} />
          <Route path="/dashboard/results/:sessionId" element={<TestResult />} />
        </Routes>
      </Router>
        <Toaster toastOptions={{ 
          className: "",
            style: { fontSize: "13px"},
      }} />
    </div>
    </UserProvider>
  )
}

export default App