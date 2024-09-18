import React, { useEffect, useState } from "react";
import { Card } from "antd";
import NumberOfCompanies from "./numberOfCompanies";
import LatestAddedCompanies from "./lastestAddedCompanies";
import ProductCategoryChart from "./productCategoryChart";
import { useTranslation } from "react-i18next";

interface Company {
  name: string;
}

interface ProductCategory {
  category: string;
  value: number;
}

const Homepage: React.FC = () => {
  const { t } = useTranslation();
  const [companyCount, setCompanyCount] = useState(0);
  const [latestCompanies, setLatestCompanies] = useState<Company[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(
    []
  );

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/companies/count`
        );
        const data = await response.json();
        if (response.ok && data.companyCount !== undefined) {
          setCompanyCount(data.companyCount);
        } else {
          console.error("Unexpected company count:", data);
        }
      } catch (error) {
        console.error("Error fetching company count:", error);
      }
    };

    const fetchLatestCompanies = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/companies/latest`
        );
        const data = await response.json();
        if (response.ok && data.latestCompanies) {
          setLatestCompanies(data.latestCompanies);
        } else {
          console.error("Unexpected latest companies:", data);
        }
      } catch (error) {
        console.error("Error fetching latest companies:", error);
      }
    };

    const fetchProductCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/products/categories`
        );
        const data = await response.json();
        if (data && Array.isArray(data)) {
          setProductCategories(
            data.map((item: any) => ({
              category: item.category,
              value: item.count,
            }))
          );
        } else {
          console.error("Unexpected product category data:", data);
        }
      } catch (error) {
        console.error("Error fetching product categories:", error);
      }
    };

    fetchCompanyData();
    fetchLatestCompanies();
    fetchProductCategories();
  }, []);

  return (
    <div className="flex flex-col items-center justify-start flex-grow bg-gray-100 p-5">
      <NumberOfCompanies companyCount={companyCount} />
      <LatestAddedCompanies latestCompanies={latestCompanies} />
      <Card className="bg-white shadow-lg rounded-lg p-5 w-full max-w-xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {t("productCategoryChart")}
        </h2>
        <ProductCategoryChart data={productCategories} />
      </Card>
    </div>
  );
};

export default Homepage;
