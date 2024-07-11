import { Button, Card } from "antd";
import React, { useEffect, useState } from "react";
import "./Question.css"; // CSS dosyasını import edin

function Question({
  values,
  nextQuestion,
  sonMu,
  finishExam,
  incrementCorrect,
  incrementWrong,
}) {
  const [timeleft, setTimeLeft] = useState(0);

  const handleAnswer = (isCorrect) => {
    if (isCorrect !== null) {
      if (isCorrect) {
        incrementCorrect();
      } else {
        incrementWrong();
      }
    }

    if (sonMu) {
      finishExam();
    } else {
      nextQuestion();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(timeleft + 1);
      if (timeleft > 9) {
        setTimeLeft(0);
        if (sonMu) {
          finishExam();
        } else {
          nextQuestion();
        }
      }
    }, 1000); // 1 saniye
  }, [timeleft]);
  const deneme = (
    <Card style={{ marginLeft: 170, marginBottom: 20, width: 150 }}>
      {" "}
      {"Kalan Süre: " + (10 - timeleft) + " sn"}{" "}
    </Card>
  );
  return (
    <div>
      <div className="question-container">
        <Card title={deneme} className="card-container">
          <Card className="question-card">
            <p className="question-text"> {values.Soru} </p>{" "}
          </Card>{" "}
          <Button
            className="answer-button"
            onClick={() => handleAnswer(values.A == values.Cevap)}
          >
            {" "}
            {values.A}{" "}
          </Button>{" "}
          <Button
            className="answer-button"
            onClick={() => handleAnswer(values.B == values.Cevap)}
          >
            {" "}
            {values.B}{" "}
          </Button>{" "}
        </Card>{" "}
        <Button className="finish-button" onClick={() => handleAnswer(null)}>
          {" "}
          {sonMu ? "Sınavı Bitir" : "Sıradaki Soru"}{" "}
        </Button>{" "}
      </div>{" "}
    </div>
  );
}

export default Question;
