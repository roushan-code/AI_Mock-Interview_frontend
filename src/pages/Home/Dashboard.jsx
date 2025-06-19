import React, { useEffect, useState } from 'react'
import { LuPlus } from "react-icons/lu";
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

const   Dashboard = () => {
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
      console.log("Session deleted:", response.data);
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
      <div className="container mx-auto pt-4 h-screen pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
          {sessions?.map((data, index) => (
            <SummaryCard 
            key={data._id}
            colors={CARD_BG[index % CARD_BG.length]}
            role={data?.role || ""}
            topicsToFocus={data?.topicsToFocus || ""}
            experience={data?.experience || ""}
            questions={data?.questions?.length || ""}
            description={data?.description || ""}
            lastUpdated={data?.updatedAt ? moment(data.updatedAt).format("Do MMM YYYY") : ""}
            onSelect={() => {
              navigate(`/interview-prep/${data?._id}`)}}
            onDelete={() => {
              setOpenDeleteAlert({
                open: true,
                data: data,
              });
            }}
              />
          ))}
            
        </div>
        <button className="h-12 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20"
          onClick={() => setOpenCreateModal(true)}>
          <LuPlus className="text-2xl text-white" />
          Add New
        </button>
      </div>

      <Model
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideHeader
        >
          <div>
            <CreateSessionForm/>
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
    </DashboardLayout >
  )
}
export default Dashboard