import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import { FaBars } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import axios from "axios";

const Layout: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token not found");
          return;
        }

        const backendUrl =
          process.env.NODE_ENV === "development"
            ? "http://localhost:3003"
            : process.env.REACT_APP_BACKEND_URL;

        const response = await axios.get(`${backendUrl}/api/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setUsername(response.data.username);
        } else {
          console.error(
            "API request failed:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "tr" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handleLogout={handleLogout}
      />

      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 bg-gray-800 text-white p-2 rounded-md z-50"
        >
          <FaBars size={24} />
        </button>
      )}

      <div className="flex-grow p-5 flex flex-col">
        <Topbar username={username} toggleLanguage={toggleLanguage} />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
