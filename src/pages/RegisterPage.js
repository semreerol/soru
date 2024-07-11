import { Button, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css"; // CSS dosyasını ekleyin

function RegisterPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const handleGetData = () => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const handleFinish = (values) => {
    const newUser = {
      row_id: users.length ? users[users.length - 1].row_id + 1 : 1, //burayı sor
      username: values.username,
      password: values.password,
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    message.success("Kaydınız Başarıyla Oluşturuldu.");
    message.loading("Giriş Sayfasına Yönlendiriliyorsunuz.", 2);

    setTimeout(() => {
      localStorage.setItem("username", values.username);
      navigate("/"); // 2 saniye sonra giriş sayfasına yönlendirme
    }, 2000);
  };

  return (
    <div className="register-container">
      <div className="form-container">
        <div className="header"> Register </div>{" "}
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={handleFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            className="form-item"
            rules={[{ required: true, message: "Lütfen kullanıcı adı girin!" }]}
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
              Kayıt Ol{" "}
            </Button>{" "}
          </Form.Item>{" "}
        </Form>{" "}
      </div>{" "}
      <Button
        type="primary"
        className="back-button"
        onClick={() => navigate("/")}
      >
        Giriş Sayfasına Geri Dön{" "}
      </Button>{" "}
    </div>
  );
}

export default RegisterPage;
