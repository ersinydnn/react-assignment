import React from "react";
import { Input, Button, Table, Modal, Form } from "antd";

interface ProductsFormModalProps {
  searchText: string;
  setSearchText: (text: string) => void;
  handleAdd: () => void;
  columns: any;
  filteredProducts: any[];
  isModalVisible: boolean;
  setIsModalVisible: (visible: boolean) => void;
  editingProduct: any;
  t: (key: string) => string;
  form: any;
  handleSubmit: (values: any) => void;
}

const ProductsFormModal: React.FC<ProductsFormModalProps> = ({
  searchText,
  setSearchText,
  handleAdd,
  columns,
  filteredProducts,
  isModalVisible,
  setIsModalVisible,
  editingProduct,
  t,
  form,
  handleSubmit,
}) => {
  return (
    <div>
      <Input
        placeholder={t("searchByProductName")}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        style={{ marginBottom: 20 }}
      />

      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 20 }}>
        {t("addNewProduct")}
      </Button>

      <Table
        columns={columns}
        dataSource={filteredProducts}
        pagination={{ pageSize: 5 }}
        rowKey="_id"
      />

      <Modal
        title={editingProduct ? t("editProduct") : t("addNewProduct")}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label={t("productName")}
            rules={[{ required: true, message: t("enterProductName") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label={t("category")}
            rules={[{ required: true, message: t("enterCategory") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="amount"
            label={t("amount")}
            rules={[{ required: true, message: t("enterAmount") }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="unit"
            label={t("unit")}
            rules={[{ required: true, message: t("enterUnit") }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="company"
            label={t("company")}
            rules={[{ required: true, message: t("enterCompany") }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductsFormModal;
