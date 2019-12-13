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
        new Date("Fri Dec 13 2019 14:55:35"),
        {
          locale: pt
        }
      );
      const [day, word] = res.split(" ");
      const recive_load = 100 - day * 10;
      setLoad(recive_load);
      setValue(res);
    }
    loadDate();
  });

  return (
    <>
      <header>
        <h1>Tempo restante</h1>
        <p>para o Gabriel entrar de férias e voltar para Minas Gerais.</p>
        <div className="progress-bar">
          <div className="progress-value" style={{ width: `${load}%` }}></div>
        </div>
        <h2>{value}</h2>
      </header>
    </>
  );
}

export default App;
