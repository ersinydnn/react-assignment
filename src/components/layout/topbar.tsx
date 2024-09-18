import React from "react";
import { MdLanguage } from "react-icons/md";
import { useTranslation } from "react-i18next";

interface TopbarProps {
  username: string | null;
  toggleLanguage: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ username, toggleLanguage }) => {
  const { i18n } = useTranslation();

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 mb-5 flex justify-between items-center shadow-lg rounded-lg">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleLanguage}
          className="flex items-center space-x-2"
        >
          <MdLanguage size={24} />
          <span>{i18n.language === "en" ? "EN" : "TR"}</span>
        </button>
      </div>
    </div>
  );
};

export default Topbar;
