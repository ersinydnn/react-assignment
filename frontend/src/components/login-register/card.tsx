import React from "react";
import { Tabs } from "antd";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import CardHeader from "./cardHeader";

interface Props {
  handleLogin: (values: any) => void;
  handleRegister: (values: any) => void;
  loading: boolean;
}

const CardComponent: React.FC<Props> = ({
  handleLogin,
  handleRegister,
  loading,
}) => {
  return (
    <div className="relative z-10 bg-white bg-opacity-40 backdrop-filter backdrop-blur-md p-10 rounded-lg shadow-lg w-full max-w-lg">
      <CardHeader />
      <Tabs defaultActiveKey="1" centered>
        <Tabs.TabPane tab="Login" key="1">
          <LoginForm handleLogin={handleLogin} loading={loading} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Register" key="2">
          <RegisterForm handleRegister={handleRegister} loading={loading} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default CardComponent;
