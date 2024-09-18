import React from "react";
import { Button, Space } from "antd";
import { useTranslation } from "react-i18next";

interface Product {
  _id?: string;
  name: string;
  category: string;
  amount: number;
  unit: string;
  company: string;
}

interface ProductTableColumnsProps {
  handleEdit: (product: Product) => void;
  handleDelete: (id: string) => void;
}

export const ProductTableColumns = ({
  handleEdit,
  handleDelete,
}: ProductTableColumnsProps) => {
  const { t } = useTranslation();

  return [
    {
      title: t("productName"),
      dataIndex: "name",
      key: "name",
      sorter: (a: Product, b: Product) => a.name.localeCompare(b.name),
    },
    {
      title: t("category"),
      dataIndex: "category",
      key: "category",
    },
    {
      title: t("amount"),
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: t("unit"),
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: t("company"),
      dataIndex: "company",
      key: "company",
    },
    {
      title: t("action"),
      key: "action",
      render: (_: any, record: Product) => (
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
