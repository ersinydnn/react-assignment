import React from "react";
import { Card, Statistic } from "antd";
import { useTranslation } from "react-i18next";

interface NumberOfCompaniesProps {
  companyCount: number;
}

const NumberOfCompanies: React.FC<NumberOfCompaniesProps> = ({
  companyCount,
}) => {
  const { t } = useTranslation();

  return (
    <Card className="bg-white shadow-lg rounded-lg p-5 mb-5 w-full max-w-xl">
      <Statistic
        title={
          <h2 className="text-xl font-semibold text-gray-800">
            {t("numberOfCompanies")}
          </h2>
        }
        value={companyCount}
        valueStyle={{ color: "#3f8600", fontWeight: "bold" }}
      />
    </Card>
  );
};

export default NumberOfCompanies;
