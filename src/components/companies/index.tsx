import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "antd";
import { useTranslation } from "react-i18next";
import CompaniesFormModal from "./companiesFormModal";
import { CompanyTableColumns } from "./companyTableColumns";

interface Company {
  _id?: string;
  name: string;
  legalNumber: string;
  country: string;
  website: string;
}

const Companies: React.FC = () => {
  const { t } = useTranslation();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/companies`
        );
        setCompanies(response.data);
      } catch (error) {
        console.error("Error while fetching company data:", error);
      }
    };

    fetchCompanies();
  }, []);

  const handleSubmit = async (values: Company) => {
    try {
      if (editingCompany) {
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/companies/${editingCompany._id}`,
          values
        );
        setCompanies((prevCompanies) =>
          prevCompanies.map((company) =>
            company._id === response.data._id ? response.data : company
          )
        );
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/companies`,
          values
        );
        setCompanies([...companies, response.data]);
      }
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error occurred during the process:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/companies/${id}`
      );
      setCompanies((prevCompanies) =>
        prevCompanies.filter((company) => company._id !== id)
      );
    } catch (error) {
      console.error("Error occurred while deleting company:", error);
    }
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    form.setFieldsValue(company);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingCompany(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const countryFilters = Array.from(
    new Set(companies.map((company) => company.country))
  ).map((country) => ({
    text: country,
    value: country,
  }));

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = CompanyTableColumns({
    handleEdit,
    handleDelete,
    countryFilters,
  });

  return (
    <CompaniesFormModal
      searchText={searchText}
      setSearchText={setSearchText}
      handleAdd={handleAdd}
      columns={columns}
      filteredCompanies={filteredCompanies}
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      editingCompany={editingCompany}
      t={t}
      form={form}
      handleSubmit={handleSubmit}
    />
  );
};

export default Companies;
