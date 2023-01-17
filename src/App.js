import React, { useState, useEffect } from "react";
import { formatDistance } from "date-fns";
import pt from "date-fns/locale/pt";

import "./style.css";

const FINAL_DATE = new Date("2023-02-03");
FINAL_DATE.setHours("19");

const FINISHED = FINAL_DATE.getTime() > new Date().getTime();

function App() {
  const [value, setValue] = useState();
  const [load, setLoad] = useState();

  useEffect(() => {
    function loadDate() {
      if (FINISHED) {
        const res = formatDistance(new Date(), FINAL_DATE, {
          locale: pt,
          includeSeconds: true,
        });
        const [time] = res.split(" ");
        const recive_load = 100 - (time / 60) * 100;
        setLoad(recive_load);
        setValue(res);
      }
    }
    loadDate();

    setInterval(() => {
      loadDate();
    }, 1000);
  });

  return (
    <>
      <header>
        <h1>Tempo restante</h1>
        <p>para o eu encontrar a Olívia, a melhor namorada do mundo ❤️.</p>
        <div className="progress-bar">
          <div
            className="progress-value"
            style={{ width: `${load < 0 ? 100 : load}%` }}
          ></div>
        </div>
        <h2>{FINISHED ? value : "Está na hora !"}</h2>
      </header>
    </>
  );
}

export default App;
