import React, { useState, useEffect } from "react";
import Question from "../components/Question";
import { Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";


function IngPage() {
  const navigate = useNavigate();
  const [indexSoru, setIndexSoru] = useState(0);
  const Sorular = JSON.parse(localStorage.getItem("ing"));
  const [soru, setSoru] = useState(Sorular[0]);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [kayit, setKayit] = useState(
    JSON.parse(localStorage.getItem("puan")) || []
  );

  useEffect(() => {
    //soru her değiştiğinde yeniden çalışır ve indexi tutar.
    setSoru(Sorular[indexSoru]);
  }, [indexSoru]);

  const nextQuestion = () => {
    setIndexSoru((prevIndex) => prevIndex + 1); //parantez içinde olması şuanki değer anlamına gelir.
  };

  const finishExam = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const newRowId = kayit.length ? kayit[kayit.length - 1].row_id + 1 : 1;
    const newRecord = {
      row_id: newRowId,
      derskodu: "ing",
      ograd: localStorage.getItem("username"),
      ogrnot: totalScore.toString(),
    };
    const updatedKayit = [...kayit, newRecord]; //...kayıtını getirip üzerine newRecordu ekle demek
    setKayit(updatedKayit);
    localStorage.setItem("puan", JSON.stringify(updatedKayit));
    setIsModalVisible(false);
    navigate("/profil");
  };

  const incrementCorrect = () => {
    setCorrectCount((prevCount) => prevCount + 1);
  };

  const incrementWrong = () => {
    setWrongCount((prevCount) => prevCount + 1);
  };

  const totalScore = correctCount * 1 - wrongCount * 0.25; //4 yanlış 1 doğruyu götürme işlemi

  return (
    <div>
      <Question
        values={soru}
        finishExam={finishExam}
        nextQuestion={nextQuestion}
        sonMu={indexSoru >= Sorular.length - 1}
        incrementCorrect={incrementCorrect}
        incrementWrong={incrementWrong}
      />{" "}
      <Modal
        title="Sınav Sonucu"
        open={isModalVisible}
        onOk={handleOk}
        footer={[
          <Button key="ok" type="primary" onClick={handleOk}>
            Tamam{" "}
          </Button>,
        ]}
      >
        <p> Doğru Sayısı: {correctCount} </p>{" "}
        <p> Yanlış Sayısı: {wrongCount} </p> <p> Toplam Puan: {totalScore} </p>{" "}
      </Modal>{" "}
    </div>
  );
}

export default IngPage;
