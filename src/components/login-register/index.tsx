import React, { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "antd/dist/reset.css";
import CardComponent from "./card";

interface FormValues {
  username: string;
  password: string;
  email?: string;
}

const loginUser = async (values: FormValues) => {
  try {
    const backendUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3003"
        : process.env.REACT_APP_BACKEND_URL;

    const response = await axios.post(`${backendUrl}/api/login`, values);

    if (response.status === 200) {
      const data = response.data;
      localStorage.setItem("token", data.token);
      return data.token;
    } else {
      if (response.data.message === "Invalid credentials") {
        message.error("Invalid username or password.");
      } else {
        message.error(response.data.message);
      }
    }
  } catch (error) {
    message.error("An error occurred during login.");
  }
};

const registerUser = async (values: FormValues) => {
  try {
    const backendUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3003"
        : process.env.REACT_APP_BACKEND_URL;

    const response = await axios.post(`${backendUrl}/api/register`, values);

    if (response.status === 200) {
      message.success("Registration successful!");
    } else {
      if (response.data.message === "Username already taken") {
        message.error("This username is already taken.");
      } else {
        message.error(response.data.message);
      }
    }
  } catch (error) {
    message.error("An error occurred during registration.");
  }
};

const LoginRegister: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values: FormValues) => {
    setLoading(true);
    const token = await loginUser(values);
    setLoading(false);

    if (token) {
      message.success("Login successful!");
      navigate("/home");
    }
  };

  const handleRegister = async (values: FormValues) => {
    setLoading(true);
    await registerUser(values);
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/assets/bg.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <CardComponent
        handleLogin={handleLogin}
        handleRegister={handleRegister}
        loading={loading}
      />
    </div>
  );
};

export default LoginRegister;
