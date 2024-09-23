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

const backendUrl = "http://localhost:3003";

const loginUser = async (values: FormValues) => {
  try {
    const response = await axios.post(`${backendUrl}/api/login`, values);

    if (response.status === 200) {
      const data = response.data;
      localStorage.setItem("token", data.token);
      return data.token;
    }
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      message.error("Invalid username or password.");
    } else if (error.response && error.response.status === 404) {
      message.error("User not found.");
    } else {
      console.error("Login Error:", error);
      message.error("An unexpected error occurred during login.");
    }
  }
};

const registerUser = async (values: FormValues) => {
  try {
    const response = await axios.post(`${backendUrl}/api/register`, values);
    console.log("Register Response:", response);

    if (response.status === 201) {
      message.success("Registration successful!"); // Başarı mesajı göster
    }
  } catch (error: any) {
    console.log("Register Error Response:", error.response);
    if (error.response && error.response.status === 400) {
      const errorMessage = error.response.data.message;
      if (errorMessage === "This username is already taken") {
        message.error("This username is already taken.");
      } else if (errorMessage === "This email is already in use") {
        message.error("This email is already in use.");
      } else {
        message.error(errorMessage);
      }
    } else {
      console.error("Registration Error:", error);
      message.error("An unexpected error occurred during registration.");
    }
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
