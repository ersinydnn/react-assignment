import React from "react";
import { Form, Input, Button } from "antd";

interface Props {
  handleRegister: (values: any) => void;
  loading: boolean;
}

const RegisterForm: React.FC<Props> = ({ handleRegister, loading }) => (
  <Form onFinish={handleRegister} layout="vertical">
    <Form.Item
      name="username"
      label="Username"
      rules={[{ required: true, message: "Please enter your username!" }]}
    >
      <Input size="large" placeholder="Enter your username..." />
    </Form.Item>
    <Form.Item
      name="email"
      label="Email"
      rules={[{ required: true, message: "Please enter your email!" }]}
    >
      <Input size="large" placeholder="Enter your email..." />
    </Form.Item>
    <Form.Item
      name="password"
      label="Password"
      rules={[{ required: true, message: "Please enter your password!" }]}
    >
      <Input.Password size="large" placeholder="Enter your password..." />
    </Form.Item>
    <Button
      type="primary"
      size="large"
      htmlType="submit"
      block
      loading={loading}
      className="bg-green-500 hover:bg-green-600 text-white rounded-lg"
    >
      Register
    </Button>
  </Form>
);

export default RegisterForm;
