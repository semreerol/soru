import { Button, Card } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Profil.css";

function Profil() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogOut = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  const notlar = JSON.parse(localStorage.getItem("puan") || "[]");

  const userMatScore = notlar.find(
    (not) => not.ograd === username && not.derskodu === "mat"
  );
  const userIngScore = notlar.find(
    (not) => not.ograd === username && not.derskodu === "ing"
  );
  const userSosScore = notlar.find(
    (not) => not.ograd === username && not.derskodu === "sos"
  );

  return (
    <div className="profil-container">
      <Header className="header-container">
        <h1 style={{ marginLeft: 30 }} className="header-title">
          {" "}
          Hoşgeldiniz {username}{" "}
        </h1>{" "}
        <Button
          style={{ marginRight: 30 }}
          type="primary"
          className="logout-button"
          onClick={handleLogOut}
        >
          Logout{" "}
        </Button>{" "}
      </Header>{" "}
      <Content className="content-container">
        {" "}
        {userMatScore ? (
          <Card className="card-container">
            <div className="card-title"> MAT101 Notu </div>{" "}
            <div className="card-content"> Not: {userMatScore.ogrnot} </div>{" "}
          </Card>
        ) : (
          //Notu varsa üstte , notu yoksa aşağıyı takip et
          <Card className="card-container">
            <div className="card-title">
              {" "}
              <Button
                onClick={() => {
                  navigate("/mat");
                }}
              >
                {" "}
                MAT101 Sınavı{" "}
              </Button>{" "}
            </div>{" "}
          </Card>
        )}{" "}
        {userIngScore ? (
          <Card className="card-container">
            <div className="card-title"> ING302 Notu </div>{" "}
            <div className="card-content"> Not: {userIngScore.ogrnot} </div>{" "}
          </Card>
        ) : (
          <Card className="card-container">
            <div className="card-title">
              {" "}
              <Button
                onClick={() => {
                  navigate("/ing");
                }}
              >
                {" "}
                ING302 Sınavı{" "}
              </Button>{" "}
            </div>{" "}
          </Card>
        )}{" "}
        {userSosScore ? (
          <Card className="card-container">
            <div className="card-title"> SOS433 Notu </div>{" "}
            <div className="card-content"> Not: {userSosScore.ogrnot} </div>{" "}
          </Card>
        ) : (
          <Card className="card-container">
            <div className="card-title">
              {" "}
              <Button
                onClick={() => {
                  navigate("/sos");
                }}
              >
                {" "}
                SOS433 Sınavı{" "}
              </Button>{" "}
            </div>{" "}
          </Card>
        )}{" "}
      </Content>{" "}
    </div>
  );
}

export default Profil;
