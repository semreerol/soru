import { Button } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginRegister.css"; // CSS dosyasını ekleyin

function LoginRegister() {
  const Temizlik = () => {
    localStorage.clear();
  };
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const BASE_API =
    "https://v1.nocodeapi.com/selmn_erol/google_sheets/EcCqJnqRLOltFRKw?tabId=login";

  const handleGetData = async () => {
    let logindolumu = localStorage.getItem("users"); // users dolu değilse apiden çek doluysa hiçbir şey yapma
    if (!logindolumu) {
      await axios
        .get(BASE_API)
        .then((res) => {
          setUsers(res.data.data);
          console.log(res.data.data);
          localStorage.setItem("users", JSON.stringify(res.data.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }

    let matdolumu = localStorage.getItem("mat");
    if (!matdolumu) {
      await axios
        .get(
          "https://v1.nocodeapi.com/selmn_erol/google_sheets/EcCqJnqRLOltFRKw?tabId=mat"
        )
        .then((res) => {
          setUsers(res.data.data);
          console.log(res.data.data);
          localStorage.setItem("mat", JSON.stringify(res.data.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }

    let sosdolumu = localStorage.getItem("sos");
    if (!sosdolumu) {
      await axios
        .get(
          "https://v1.nocodeapi.com/selmn_erol/google_sheets/EcCqJnqRLOltFRKw?tabId=sos"
        )
        .then((res) => {
          setUsers(res.data.data);
          console.log(res.data.data);
          localStorage.setItem("sos", JSON.stringify(res.data.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }

    let puandolumu = localStorage.getItem("puan");
    if (!puandolumu) {
      await axios
        .get(
          "https://v1.nocodeapi.com/selmn_erol/google_sheets/EcCqJnqRLOltFRKw?tabId=puan"
        )
        .then((res) => {
          setUsers(res.data.data);
          console.log(res.data.data);
          localStorage.setItem("puan", JSON.stringify(res.data.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    let ingdolumu = localStorage.getItem("ing");
    if (!ingdolumu) {
      await axios
        .get(
          "https://v1.nocodeapi.com/selmn_erol/google_sheets/EcCqJnqRLOltFRKw?tabId=ing"
        )
        .then((res) => {
          setUsers(res.data.data);
          console.log(res.data.data);
          localStorage.setItem("ing", JSON.stringify(res.data.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    //Runs only on the first render
    handleGetData();
  }, []);

  const handleNavLogin = () => {
    navigate("/login");
  };
  const handleNavRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container">
      <div className="header"> Soru Çözme Uygulmasına Hoş Geldiniz </div>{" "}
      <Button type="primary" className="button" onClick={handleNavLogin}>
        Login{" "}
      </Button>{" "}
      <Button type="primary" className="button" onClick={handleNavRegister}>
        Register{" "}
      </Button>{" "}
      <Button type="primary" className="clean-button" onClick={Temizlik}>
        Temizlik{" "}
      </Button>{" "}
    </div>
  );
}

export default LoginRegister;
