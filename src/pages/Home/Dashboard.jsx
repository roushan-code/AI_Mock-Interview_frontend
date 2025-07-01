import React, { useEffect, useState } from 'react'
import { LuPlus, LuTrendingUp, LuBook, LuTarget } from "react-icons/lu";
import { CARD_BG } from "../../utils/data";
import toast from "react-hot-toast";
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import moment from 'moment';
import SummaryCard from '../../components/Cards/SummaryCard.jsx';
import Model from '../../components/Model.jsx';
import CreateSessionForm from './CreateSessionForm.jsx';
import DeleteAlertContent from '../../components/Loaders/DeleteAlertContent.jsx';

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllSessions = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      setSessions(response.data.sessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      toast.error("Failed to fetch sessions");
    }
    finally {
      setIsLoading(false);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      const response = await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData._id));
      // console.log("Session deleted:", response.data);
      if (response.status === 200) {
        toast.success("Session deleted successfully");
        fetchAllSessions();
      }
    } catch (error) {
      console.error("Error deleting session:", error);
      toast.error("Failed to delete session");
    }
   };

  useEffect(() => {
    fetchAllSessions();
  }, []);


  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[#12121e] relative">
        {/* Background blur elements matching LandingPage */}
        <div className="w-1/3 h-1/3 bg-[#00ffe0]/5 blur-[65px] absolute top-0 left-0 opacity-60" />
        <div className="w-1/4 h-1/4 bg-[#7dd3fc]/5 blur-[50px] absolute bottom-0 right-0 opacity-40" />
        
        <div className="container mx-auto pt-20 pb-8 px-4 relative ">

          {/* Sessions Grid */}
          <div className="mb-8">
            <h2 className="text-2xl text-white font-medium mb-6">Your Interview Sessions</h2>
            {sessions?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sessions?.map((data, index) => (
                  <SummaryCard 
                    key={data._id}
                    colors={CARD_BG[index % CARD_BG.length]}
                    role={data?.role || ""}
                    topicsToFocus={data?.topicsToFocus || ""}
                    experience={data?.experience || ""}
                    questions={data?.questions?.length || 0}
                    description={data?.description || ""}
                    lastUpdated={data?.updatedAt ? moment(data.updatedAt).format("Do MMM YYYY") : ""}
                    onSelect={() => {
                      navigate(`/interview-prep/${data?._id}`)
                    }}
                    onDelete={() => {
                      setOpenDeleteAlert({
                        open: true,
                        data: data,
                      });
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-[#1e1e28cc] border border-white/10 rounded-2xl p-12 backdrop-blur-md shadow-[0_6px_20px_rgba(0,255,255,0.04)] max-w-md mx-auto">
                  <div className="w-20 h-20 bg-[#00ffe0]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <LuBook className="text-[#00ffe0] text-3xl drop-shadow-[0_0_4px_#00ffe088]" />
                  </div>
                  <h3 className="text-white text-xl font-medium mb-3">No Interview Sessions Yet</h3>
                  <p className="text-slate-300 mb-6">Create your first interview session to get started with AI-powered preparation</p>
                  <button
                    onClick={() => setOpenCreateModal(true)}
                    className="bg-[#12121e] text-[#00ffe0] border-2 border-[#00ffe0] font-semibold px-6 py-3 rounded-full cursor-pointer shadow-[0_0_8px_rgba(0,255,224,0.25)] hover:bg-[#1e1e32] hover:text-white hover:shadow-[0_0_16px_rgba(0,255,224,0.5)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Create Session
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Floating Add Button matching LandingPage CTA style */}
          <button 
            className="fixed bottom-8 right-8 w-14 h-14 bg-[#12121e] text-[#00ffe0] border-2 border-[#00ffe0] rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(0,255,224,0.25)] hover:bg-[#1e1e32] hover:text-white hover:shadow-[0_0_16px_rgba(0,255,224,0.5)] hover:-translate-y-0.5 transition-all duration-300 z-50"
            onClick={() => setOpenCreateModal(true)}
          >
            <LuPlus className="text-xl" />
          </button>
        </div>

        {/* Modals */}
        <Model
          isOpen={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
          hideHeader
        >
          <div>
            <CreateSessionForm />
          </div>
        </Model>

        <Model
          isOpen={openDeleteAlert.open}
          onClose={() => setOpenDeleteAlert({ open: false, data: null })}
          title="Delete Alert"
        >
          <div className="w-[30vw]">
            <DeleteAlertContent
              content={`Are you sure you want to delete the session for ${openDeleteAlert?.data?.role} role?`}
              onDelete={() => {
                deleteSession(openDeleteAlert?.data);
                setOpenDeleteAlert({ open: false, data: null });
              }}
              loading={isLoading}
            />
          </div>
        </Model>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard