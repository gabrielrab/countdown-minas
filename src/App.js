import React, { useState, useEffect } from "react";
import { formatDistance } from "date-fns";
import pt from "date-fns/locale/pt";

import "./style.css";

function App() {
  const [value, setValue] = useState();
  const [load, setLoad] = useState();

  useEffect(() => {
    function loadDate() {
      const res = formatDistance(
        new Date(),
        new Date("Tue May 03 2022 18:00:00"),
        {
          locale: pt,
          includeSeconds: true,
        }
      );
      const [time] = res.split(" ");
      console.log("[res]", res.split(" "));
      const recive_load = 100 - (time / 60) * 100;
      console.log("[receive load]", recive_load);
      setLoad(recive_load);
      setValue(res);
    }

    setInterval(() => {
      loadDate();
    }, 1000);
  });

  return (
    <>
      <header>
        <h1>Tempo restante</h1>
        <p>
          para o Sara sair do trabalho, e segundo ela, ir sofrer na faculdade.
        </p>
        <div className="progress-bar">
          <div className="progress-value" style={{ width: `${100}%` }}></div>
        </div>
        <h2>Está na hora !</h2>
      </header>
    </>
  );
}

export default App;
