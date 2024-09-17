import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "antd";
import { useTranslation } from "react-i18next";
import ProductsFormModal from "./productsFormModal";
import { ProductTableColumns } from "./productsTableColumns";

interface Product {
  _id?: string;
  name: string;
  category: string;
  amount: number;
  unit: string;
  company: string;
}

const Products: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/products`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error while fetching product data:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (values: Product) => {
    try {
      if (editingProduct) {
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/api/products/${editingProduct._id}`,
          values
        );
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === response.data._id ? response.data : product
          )
        );
      } else {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/products`,
          values
        );
        setProducts([...products, response.data]);
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
        `${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`
      );
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );
    } catch (error) {
      console.error("Error occurred while deleting product:", error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = ProductTableColumns({
    handleEdit,
    handleDelete,
  });

  return (
    <ProductsFormModal
      searchText={searchText}
      setSearchText={setSearchText}
      handleAdd={handleAdd}
      columns={columns}
      filteredProducts={filteredProducts}
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      editingProduct={editingProduct}
      t={t}
      form={form}
      handleSubmit={handleSubmit}
    />
  );
};

export default Products;
