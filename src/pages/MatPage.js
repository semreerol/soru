import React, { useState, useEffect } from "react";
import Question from "../components/Question";
import { Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";

function MatPage() {
  const navigate = useNavigate();
  const [indexSoru, setIndexSoru] = useState(0);
  const Sorular = JSON.parse(localStorage.getItem("mat"));
  const [soru, setSoru] = useState(Sorular[0]);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [kayit, setKayit] = useState(
    JSON.parse(localStorage.getItem("puan")) || []
  );

  useEffect(() => {
    setSoru(Sorular[indexSoru]);
  }, [indexSoru]);

  const nextQuestion = () => {
    setIndexSoru((prevIndex) => prevIndex + 1);
  };

  const finishExam = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const newRowId = kayit.length ? kayit[kayit.length - 1].row_id + 1 : 1;
    const newRecord = {
      row_id: newRowId,
      derskodu: "mat",
      ograd: localStorage.getItem("username"),
      ogrnot: totalScore.toString(),
    };
    const updatedKayit = [...kayit, newRecord];
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

  const totalScore = correctCount * 1 - wrongCount * 0.25;

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
        visible={isModalVisible}
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

export default MatPage;
