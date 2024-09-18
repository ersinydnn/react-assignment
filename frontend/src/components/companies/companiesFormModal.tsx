import React from "react";
import { Input, Button, Table, Modal, Form } from "antd";

interface CompaniesFormModalProps {
  searchText: string;
  setSearchText: (text: string) => void;
  handleAdd: () => void;
  columns: any;
  filteredCompanies: any[];
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  editingCompany: any;
  t: (key: string) => string;
  form: any;
  handleSubmit: (values: any) => void;
}

const CompaniesFormModal: React.FC<CompaniesFormModalProps> = ({
  searchText,
  setSearchText,
  handleAdd,
  columns,
  filteredCompanies,
  isModalVisible,
  setIsModalVisible,
  editingCompany,
  t,
  form,
  handleSubmit,
}) => {
  return (
    <div>
      <Input
        placeholder={t("searchByCompanyName")}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 20 }}
      />

      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 20 }}>
        {t("addNewCompany")}
      </Button>

      <Table
        columns={columns}
        dataSource={filteredCompanies}
        pagination={{ pageSize: 5 }}
        rowKey="_id"
      />

      <Modal
        title={editingCompany ? t("editCompany") : t("addNewCompany")}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label={t("companyName")}
            rules={[{ required: true, message: t("enterCompanyName") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="legalNumber"
            label={t("companyLegalNumber")}
            rules={[{ required: true, message: t("enterCompanyLegalNumber") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="country"
            label={t("country")}
            rules={[{ required: true, message: t("enterCountry") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="website"
            label={t("website")}
            rules={[{ required: true, message: t("enterWebsite") }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CompaniesFormModal;
