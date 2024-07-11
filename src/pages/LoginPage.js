import { Button, Form, Input, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const users = JSON.parse(localStorage.getItem("users"));

  const handleFinish = (value) => {
    let loginSuccess = false;
    for (let i in users) {
      if (value.username === users[i].username) {
        if (value.password === users[i].password) {
          loginSuccess = true;
          message.success("Login Successfully");
          localStorage.setItem("username", value.username);
          navigate("/profil");
          break;
        }
      }
    }
    if (!loginSuccess) {
      message.error("Kullanıcı adı veya şifre geçersiz!!");
    }
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <div className="header"> Login </div>{" "}
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={handleFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            className="form-item"
            rules={[
              {
                required: true,
                message: "Lütfen kullanıcı adı girin!",
              },
            ]}
          >
            <Input />
          </Form.Item>{" "}
          <Form.Item
            label="Password"
            name="password"
            className="form-item"
            rules={[{ required: true, message: "Lütfen şifre girin!" }]}
          >
            <Input.Password />
          </Form.Item>{" "}
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="submit-button">
              Giriş Yap{" "}
            </Button>{" "}
          </Form.Item>{" "}
        </Form>{" "}
      </div>{" "}
      <Button
        type="primary"
        className="back-button"
        onClick={() => navigate("/")}
      >
        Girişe Geri Dön{" "}
      </Button>{" "}
    </div>
  );
}

export default LoginPage;
