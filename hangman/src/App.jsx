import { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [text, setText] = useState(["s", "k", "y"]);
  const [guess, setGuess] = useState(["-", "-", "-"]);
  const [count, setCount] = useState(12);
  const [userInput, setUserInput] = useState("");

  const hanldeGuess = () => {
    if (count > 0) {
      for (let index = 0; index < text.length; index++) {
        if (text[index] == userInput && guess[index] == "-") {
          let temp = [...guess];
          temp[index] = userInput;
          setGuess(temp);
          break;
        }
      }

      setCount(count - 1);
    }
  };

  return (
    <div>
      <h1>Guess</h1>
      <input
        value={userInput}
        onChange={(e) => setUserInput(e.currentTarget.value)}
        type="text"
        maxLength={1}
      />
      <button onClick={hanldeGuess}>Guess</button>
      <h2>{guess.join("")}</h2>

      <p>Try Left: {count}</p>

      {count == 0 ? <p>Game Over</p> : null}
    </div>
  );
}

export default App;
