import React, { useState, useCallback } from "react";
import "./App.css";

const RegularComponent = React.memo(({ name }) => {
  console.log("RegularComponent перерисован");

  return <div>Привет, {name}!</div>;
});

const LogButton = React.memo(({ onClick }) => {
  console.log("LogButton перерисован");

  return <button onClick={onClick}>Добавить лог</button>;
});

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Иван");
  const [logs, setLogs] = useState([]);

  const handleAddLog = useCallback(() => {
    const newLog = `Лог создан в ${new Date().toLocaleTimeString()}`;
    setLogs(prev => [...prev, newLog]);
  }, []);

  return (
    <div style={{ padding: "30px" }}>

      <h2>Счетчик: {count}</h2>

      <button onClick={() => setCount(prev => prev + 1)}>
        Увеличить
      </button>

      <button onClick={() => setName(prev =>
        prev === "Иван" ? "Мария" : "Иван"
      )}>
        Сменить имя
      </button>

      <hr />

      <h3>React.memo</h3>
      <RegularComponent name={name} />

      <hr />

      <h3>useCallback</h3>
      <LogButton onClick={handleAddLog} />

      <h3>История логов:</h3>

      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
