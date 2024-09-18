import React from "react";
import { Button, Space } from "antd";
import { useTranslation } from "react-i18next";

interface Company {
  _id?: string;
  name: string;
  legalNumber: string;
  country: string;
  website: string;
}

interface CompanyTableColumnsProps {
  handleEdit: (company: Company) => void;
  handleDelete: (id: string) => void;
  countryFilters: { text: string; value: string }[];
}

export const CompanyTableColumns = ({
  handleEdit,
  handleDelete,
  countryFilters,
}: CompanyTableColumnsProps) => {
  const { t } = useTranslation();

  return [
    {
      title: t("companyName"),
      dataIndex: "name",
      key: "name",
      sorter: (a: Company, b: Company) => a.name.localeCompare(b.name),
    },
    {
      title: t("companyLegalNumber"),
      dataIndex: "legalNumber",
      key: "legalNumber",
      sorter: (a: Company, b: Company) =>
        a.legalNumber.localeCompare(b.legalNumber),
    },
    {
      title: t("country"),
      dataIndex: "country",
      key: "country",
      filters: countryFilters,
      onFilter: (value: string, record: Company) => record.country === value,
    },
    {
      title: t("website"),
      dataIndex: "website",
      key: "website",
      render: (text: string) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: t("action"),
      key: "action",
      render: (_: any, record: Company) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record)}>
            {t("edit")}
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record._id!)}>
            {t("delete")}
          </Button>
        </Space>
      ),
    },
  ];
};
