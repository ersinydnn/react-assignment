import React from "react";
import { Card, List } from "antd";
import { useTranslation } from "react-i18next";

interface Company {
  name: string;
}

interface LatestAddedCompaniesProps {
  latestCompanies: Company[];
}

const LatestAddedCompanies: React.FC<LatestAddedCompaniesProps> = ({
  latestCompanies,
}) => {
  const { t } = useTranslation();

  return (
    <Card className="bg-white shadow-lg rounded-lg p-5 mb-5 w-full max-w-xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {t("latestAddedCompanies")}
      </h2>
      <List
        bordered
        dataSource={latestCompanies}
        renderItem={(company: Company) => (
          <List.Item className="p-4 bg-gray-200 border-b border-gray-300 hover:bg-teal-100 transition duration-300 ease-in-out">
            <div className="text-base font-medium text-gray-800">
              {company.name}
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default LatestAddedCompanies;
