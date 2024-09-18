import React from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaBuilding, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useTranslation } from "react-i18next";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  handleLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  toggleSidebar,
  handleLogout,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`relative bg-gray-900 text-white transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } w-64 p-6 flex flex-col justify-between`}
    >
      <div>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">{t("dashboard")}</h1>
          <button
            onClick={toggleSidebar}
            className="bg-gray-800 text-white p-2 rounded-md"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <ul className="space-y-6 mt-10">
          <li>
            <Link
              to="/home"
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <AiFillHome size={24} />
              <span className="ml-3 text-lg">{t("home")}</span>
            </Link>
          </li>
          <li>
            <Link
              to="/home/companies"
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <FaBuilding size={24} />
              <span className="ml-3 text-lg">{t("companies")}</span>
            </Link>
          </li>
          <li>
            <Link
              to="/home/products"
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <MdProductionQuantityLimits size={24} />
              <span className="ml-3 text-lg">{t("products")}</span>
            </Link>
          </li>

          <li className="mt-6">
            <button
              onClick={handleLogout}
              className="flex items-center p-2 hover:bg-gray-700 rounded w-full"
            >
              <FaSignOutAlt size={24} />
              <span className="ml-3 text-lg">{t("logout")}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
