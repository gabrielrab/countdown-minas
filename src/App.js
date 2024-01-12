/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from "react";
import { differenceInDays, differenceInHours } from "date-fns";
import pt from "date-fns/locale/pt";
import { format } from "date-fns";

import "./style.css";

const START_DATE = new Date("2024-01-01");
const FINAL_DATE_TO_MEET = new Date("2024-02-02 23:00:00");
const FINAL_DATE_TO_TRAVEL = new Date("2024-02-28 09:00:00");

function calculateRemainingTime(finalDate) {
  const now = new Date();
  const daysRemaining = differenceInDays(finalDate, now);
  const hoursRemaining = differenceInHours(finalDate, now);
  const totalDays = differenceInDays(finalDate, START_DATE);
  const elapsedDays = differenceInDays(now, START_DATE);
  const loadPercentage = (elapsedDays / totalDays) * 100;

  let formattedTime;
  if (daysRemaining > 0) {
    formattedTime = `${daysRemaining} dias restantes`;
  } else if (hoursRemaining > 0) {
    formattedTime = format(finalDate, "'aproximadamente' H 'horas'", {
      locale: pt,
    });
  } else {
    formattedTime = "Está na hora!";
  }

  return {
    formattedTime: formattedTime,
    load: Math.min(Math.max(loadPercentage, 0), 100),
  };
}

function App() {
  const [timeToMeet, setTimeToMeet] = useState({ formattedTime: "", load: 0 });
  const [timeToTravel, setTimeToTravel] = useState({
    formattedTime: "",
    load: 0,
  });

  useEffect(() => {
    function updateTimes() {
      setTimeToMeet(calculateRemainingTime(FINAL_DATE_TO_MEET));
      setTimeToTravel(calculateRemainingTime(FINAL_DATE_TO_TRAVEL));
    }

    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <header>
        <h1>Tempo restante</h1>
        <p>para eu encontrar a Olívia, a melhor namorada do mundo ❤️.</p>
        <div className="progress-bar">
          <div
            className="progress-value"
            style={{ width: `${timeToMeet.load}%` }}
          ></div>
        </div>
        <h2>{timeToMeet.formattedTime}</h2>
      </header>
      <header>
        <h1>Tempo restante</h1>
        <p>para eu viajar com a melhor namorada do mundo 🌴.</p>
        <div className="progress-bar">
          <div
            className="progress-value"
            style={{ width: `${timeToTravel.load}%` }}
          ></div>
        </div>
        <h2>{timeToTravel.formattedTime}</h2>
      </header>
    </>
  );
}

export default App;
