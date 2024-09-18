import React from "react";
import { Form, Input, Button } from "antd";

interface Props {
  handleLogin: (values: any) => void;
  loading: boolean;
}

const LoginForm: React.FC<Props> = ({ handleLogin, loading }) => (
  <Form onFinish={handleLogin} layout="vertical">
    <Form.Item
      name="username"
      label="Username"
      rules={[{ required: true, message: "Please enter your username!" }]}
    >
      <Input size="large" placeholder="Enter your username..." />
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
      Login
    </Button>
  </Form>
);

export default LoginForm;
